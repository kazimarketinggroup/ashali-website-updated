import nodemailer from "nodemailer";

// In-memory rate limiting map (IP -> timestamps array)
const ipRateMap = new Map<string, number[]>();

export function checkRateLimit(ip: string, maxRequests = 10, windowMs = 3600000): boolean {
  if (!ip || ip === "unknown") return true;
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

const MAIL_USER = process.env.MAIL_USER || "";
const MAIL_PASS = process.env.MAIL_PASS || "";
const OWNER_EMAIL = process.env.CONTACT_OWNER_EMAIL || "ash@ashali.com";

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

export { MAIL_USER, OWNER_EMAIL };
