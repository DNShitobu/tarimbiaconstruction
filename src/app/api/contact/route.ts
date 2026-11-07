import { NextResponse } from "next/server";
import {
  sanitizeEmail,
  sanitizeInput,
  sanitizePhone,
  validateContactForm,
} from "@/lib/security";

// Sends contact form messages by email through Resend (https://resend.com).
// Required environment variables:
//   RESEND_API_KEY      API key from the Resend dashboard
//   CONTACT_TO_EMAIL    inbox that receives the messages
// Optional:
//   CONTACT_FROM_EMAIL  sender address on a domain verified in Resend,
//                       e.g. "Tarimbia Website <website@tarimbiaconstruction.com>"

const DEFAULT_FROM = "Tarimbia Website <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function field(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Hidden "website" field: people never see it, spam bots fill it in.
  // Pretend it worked so bots don't retry.
  if (field(body, "website")) {
    return NextResponse.json({ ok: true });
  }

  const data = {
    name: field(body, "name"),
    email: field(body, "email"),
    phone: field(body, "phone"),
    subject: field(body, "subject"),
    message: field(body, "message"),
  };

  const validation = validateContactForm(data);
  if (!validation.isValid) {
    return NextResponse.json({ error: validation.errors.join(" ") }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return NextResponse.json(
      { error: "The contact form is not available right now. Please email or call us instead." },
      { status: 503 }
    );
  }

  const name = sanitizeInput(data.name);
  const email = sanitizeEmail(data.email);
  const phone = sanitizePhone(data.phone);
  const subject = sanitizeInput(data.subject);
  const message = sanitizeInput(data.message);

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "-"}`,
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");

  const html = `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || "-")}</p>
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <hr />
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
        to: to.split(",").map((address) => address.trim()),
        reply_to: email,
        subject: `Website enquiry: ${subject}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      console.error("Contact form: Resend returned", res.status, await res.text());
      return NextResponse.json(
        { error: "Sorry, your message could not be sent. Please try again or contact us directly." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Contact form: request to Resend failed", err);
    return NextResponse.json(
      { error: "Sorry, your message could not be sent. Please try again or contact us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
