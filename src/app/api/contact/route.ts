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

// Largest request body accepted. The form's own limits add up to well under this.
const MAX_BODY_BYTES = 16 * 1024;

// A person needs at least a few seconds to fill in the form; bots submit instantly.
const MIN_FILL_MS = 3000;

// Best-effort per-IP limit. Serverless instances don't share memory, so this
// slows down floods rather than stopping a distributed attack. Resend's own
// daily cap is the hard backstop.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

const ALLOWED_HOSTS = new Set([
  "www.tarimbiaconstruction.com",
  "tarimbiaconstruction.com",
  "tarimbiaconstruction.netlify.app",
  "localhost",
  "127.0.0.1",
]);

const NO_STORE = { "Cache-Control": "no-store" };

function reply(body: object, status = 200) {
  return NextResponse.json(body, { status, headers: NO_STORE });
}

const SEND_FAILED =
  "Sorry, your message could not be sent. Please try again or contact us directly.";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Single-line fields end up in email headers (subject, reply-to), so remove
// line breaks and other control characters to block header injection.
function singleLine(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001f\u007f\u2028\u2029]+/g, " ").trim();
}

// Multi-line text keeps line breaks but loses other control characters.
function multiLine(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
}

function field(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value : "";
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown"
  );
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    // Stop the map growing without bound under a flood of distinct IPs.
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function sameSite(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return ALLOWED_HOSTS.has(new URL(origin).hostname);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  // Only accept submissions from this site's own pages.
  if (!sameSite(request)) {
    return reply({ error: "Forbidden." }, 403);
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return reply({ error: "Unsupported content type." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return reply({ error: "Message is too large." }, 413);
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return reply({ error: "Invalid request." }, 400);
  }
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    return reply({ error: "Message is too large." }, 413);
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return reply({ error: "Invalid request." }, 400);
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return reply({ error: "Invalid request." }, 400);
  }

  // Hidden "website" field and a too-fast submission both mean a bot.
  // Pretend it worked so bots don't retry.
  const elapsed = Number(body.elapsedMs);
  if (field(body, "website") || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return reply({ ok: true });
  }

  if (rateLimited(clientIp(request))) {
    return reply(
      { error: "Too many messages from your connection. Please try again later." },
      429
    );
  }

  const data = {
    name: singleLine(field(body, "name")),
    email: singleLine(field(body, "email")),
    phone: singleLine(field(body, "phone")),
    subject: singleLine(field(body, "subject")),
    message: multiLine(field(body, "message")),
  };

  const validation = validateContactForm(data);
  if (!validation.isValid) {
    return reply({ error: validation.errors.join(" ") }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return reply(
      { error: "The contact form is not available right now. Please email or call us instead." },
      503
    );
  }

  const name = sanitizeInput(data.name);
  const email = sanitizeEmail(data.email);
  const phone = sanitizePhone(data.phone);
  const subject = sanitizeInput(data.subject);
  const message = sanitizeInput(data.message);

  if (!email) {
    return reply({ error: "Please enter a valid email address" }, 400);
  }

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
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      // Log the status only; the response body can echo submitted data.
      console.error("Contact form: Resend returned status", res.status);
      return reply({ error: SEND_FAILED }, 502);
    }
  } catch {
    console.error("Contact form: request to Resend failed or timed out");
    return reply({ error: SEND_FAILED }, 502);
  }

  return reply({ ok: true });
}
