import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ProjectsGallery from "@/components/ProjectsGallery";
import ClientsSection from "@/components/ClientsSection";
import { CONTACT_INFO } from "@/lib/constants";

export default function ContactPage() {
  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-accent text-xl">Quality, Speed and Professionalism</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title">Information Form</h2>
              <p className="text-gray-600 mb-6">
                Upgrade your home with our professional construction services. Book a consultation now and get a <strong>FREE QUOTATION</strong>
              </p>
              <ContactForm />
            </div>

            <div>
              <h2 className="section-title">Quick Contact</h2>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-accent mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary">Location</h3>
                    <p className="text-gray-600">{CONTACT_INFO.address}</p>
                    <p className="text-gray-500 text-sm">Digital Address: {CONTACT_INFO.digitalAddress}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-accent mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary">Phone</h3>
                    <p className="text-gray-600">{CONTACT_INFO.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-accent mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary">Email</h3>
                    <p className="text-gray-600">{CONTACT_INFO.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-accent mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary">Working Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-primary mb-4">Map</h3>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map Placeholder - Accra, Ghana</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectsGallery />
      <ClientsSection />
    </>
  );
}
