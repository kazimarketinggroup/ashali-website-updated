import nodemailer from "nodemailer";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// In-memory rate limiting map fallback (IP -> timestamps array)
const ipRateMap = new Map<string, number[]>();

// Upstash Redis instance (activated automatically when env vars are added on Vercel)
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const upstashRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(8, "1 h"),
      analytics: true,
      prefix: "ashali_ratelimit",
    })
  : null;

/**
 * Shared rate limiting across Vercel serverless functions.
 * Uses Upstash Redis when configured; falls back gracefully to in-memory window.
 */
export async function checkRateLimit(
  ip: string,
  maxRequests = 8,
  windowMs = 3600000
): Promise<boolean> {
  if (!ip || ip === "unknown") return true;

  if (upstashRatelimit) {
    try {
      const { success } = await upstashRatelimit.limit(ip);
      return success;
    } catch (err) {
      console.warn("Upstash ratelimit error, falling back to local memory:", err);
    }
  }

  // In-memory fallback
  const now = Date.now();
  const timestamps = ipRateMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return false;
  }

  validTimestamps.push(now);
  ipRateMap.set(ip, validTimestamps);
  return true;
}

/**
 * Cloudflare Turnstile verification.
 * Verifies the token against Cloudflare's production API.
 */
export async function verifyTurnstileToken(
  token: string | null | undefined,
  ip?: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // If secret is not yet configured in env, do not block users (graceful degradation)
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secret);
    formData.append("response", token);
    if (ip && ip !== "unknown") {
      formData.append("remoteip", ip);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await res.json();
    return Boolean(data.success);
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

const MAIL_USER = process.env.MAIL_USER || "";
const MAIL_PASS = process.env.MAIL_PASS || "";
const OWNER_EMAIL = process.env.CONTACT_OWNER_EMAIL || "ash@ashali.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export function getTransporter() {
  if (!MAIL_USER || !MAIL_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });
}

interface SendEmailParams {
  to?: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

/**
 * Send transactional email using Resend (preferred) with automatic fallback to SMTP.
 */
export async function sendTransactionalEmail({
  to = OWNER_EMAIL,
  subject,
  html,
  text,
  replyTo,
}: SendEmailParams): Promise<{ success: boolean; messageId?: string }> {
  // 1. Transactional provider: Resend
  if (resend) {
    try {
      const fromDomain = process.env.RESEND_FROM_EMAIL || "Ash Ali <enquiries@ashali.com>";
      const result = await resend.emails.send({
        from: fromDomain,
        to: [to],
        replyTo: replyTo ? [replyTo] : undefined,
        subject,
        html,
        text,
      });

      if (result.error) {
        console.error("Resend API error:", result.error);
        throw new Error(result.error.message);
      }

      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.warn("Resend email failed, attempting SMTP fallback if configured:", error);
    }
  }

  // 2. SMTP fallback
  const transporter = getTransporter();
  if (transporter) {
    const fromAddress = MAIL_USER ? `"ashali.com" <${MAIL_USER}>` : `"ashali.com" <${OWNER_EMAIL}>`;
    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      replyTo,
      subject,
      html,
      text,
    });
    return { success: true, messageId: info.messageId };
  }

  console.warn("No transactional email provider or SMTP configured.");
  return { success: true };
}

export { MAIL_USER, OWNER_EMAIL };
