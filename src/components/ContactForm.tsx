"use client";

import { useState } from "react";
import { sanitizePhone, validateContactForm } from "@/lib/security";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // Honeypot: hidden from people, filled in by spam bots.
  const [website, setWebsite] = useState("");

  // Only light filtering while typing. Full sanitising and validation run on
  // submit and again on the server; running them per keystroke wiped
  // half-typed emails and removed spaces between words.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    let cleaned: string;
    if (name === "email") {
      cleaned = value.replace(/[<>'"\s]/g, "");
    } else if (name === "phone") {
      cleaned = sanitizePhone(value);
    } else {
      cleaned = value.replace(/[<>]/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: cleaned }));
    setErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);
    
    const validation = validateContactForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErrors([
          data?.error ||
            "Sorry, your message could not be sent. Please try again or contact us directly.",
        ]);
        return;
      }

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch {
      setErrors([
        "Could not reach the server. Please check your connection and try again.",
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <ul className="list-disc list-inside text-sm">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Thank you for your message!</p>
          <p className="text-sm">We&apos;ll get back to you soon.</p>
        </div>
      )}

      <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="Your full name"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          maxLength={254}
          autoComplete="email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="your.email@example.com"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          maxLength={20}
          autoComplete="tel"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="+233 XX XXX XXXX"
        />
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={200}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="How can we help you?"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          placeholder="Tell us about your project..."
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
      
      <p className="text-xs text-gray-500 text-center">
        Your information is secure and will not be shared with third parties.
      </p>
    </form>
  );
}
