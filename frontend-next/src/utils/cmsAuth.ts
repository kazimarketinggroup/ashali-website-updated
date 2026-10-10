import crypto from "crypto";
import { NextRequest } from "next/server";

export const CMS_COOKIE_NAME = "cms_admin_session";

// Defaults with strong, production-grade credentials (customizable via env)
export const CMS_ADMIN_USER = process.env.CMS_ADMIN_USER || "ashali_admin";
export const CMS_ADMIN_PASSWORD = process.env.CMS_ADMIN_PASSWORD || "AshAli#Secure2026!Key";
export const CMS_SESSION_SECRET =
  process.env.CMS_SESSION_SECRET ||
  "ashali_cms_secure_jwt_session_secret_2026_kmg_production_87df32a89bf";

// In-memory rate limiting tracker for brute force defense
interface RateLimitEntry {
  attempts: number;
  lockUntil: number;
  lastAttempt: number;
}
const loginAttempts = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

export function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry) return { allowed: true };

  if (entry.lockUntil > now) {
    const retryAfterSeconds = Math.ceil((entry.lockUntil - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  // If lockout expired or 30 minutes passed since last attempt, reset
  if (now - entry.lastAttempt > LOCKOUT_DURATION_MS * 2) {
    loginAttempts.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedLogin(ip: string): {
  locked: boolean;
  remainingAttempts: number;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  const entry = loginAttempts.get(ip) || { attempts: 0, lockUntil: 0, lastAttempt: now };
  entry.attempts += 1;
  entry.lastAttempt = now;

  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.lockUntil = now + LOCKOUT_DURATION_MS;
    loginAttempts.set(ip, entry);
    return {
      locked: true,
      remainingAttempts: 0,
      retryAfterSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000),
    };
  }

  loginAttempts.set(ip, entry);
  return {
    locked: false,
    remainingAttempts: Math.max(0, MAX_ATTEMPTS - entry.attempts),
  };
}

export function recordSuccessfulLogin(ip: string): void {
  loginAttempts.delete(ip);
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
export function safeCompare(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Perform dummy comparison on bufA to maintain consistent time
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Validate username and password using constant-time comparison
 */
export function validateAdminCredentials(username: string, password: string): boolean {
  const userMatch = safeCompare((username || "").trim(), CMS_ADMIN_USER.trim());
  const passMatch = safeCompare((password || "").trim(), CMS_ADMIN_PASSWORD.trim());
  return userMatch && passMatch;
}

/**
 * Sign session token with HMAC-SHA256
 */
export function createSessionToken(username: string): string {
  const payload = {
    u: username,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    nonce: crypto.randomBytes(16).toString("hex"),
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", CMS_SESSION_SECRET)
    .update(encodedPayload)
    .digest("base64url");
  return `${encodedPayload}.${signature}`;
}

/**
 * Verify session token signature and expiration
 */
export function verifySessionToken(token: string | undefined | null): {
  valid: boolean;
  user?: string;
} {
  if (!token || typeof token !== "string") return { valid: false };

  const parts = token.split(".");
  if (parts.length !== 2) return { valid: false };

  const [encodedPayload, signature] = parts;
  const expectedSig = crypto
    .createHmac("sha256", CMS_SESSION_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  if (!safeCompare(signature, expectedSig)) {
    return { valid: false };
  }

  try {
    const raw = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    const payload = JSON.parse(raw);
    if (!payload || typeof payload !== "object") return { valid: false };
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) {
      return { valid: false };
    }
    return { valid: true, user: payload.u || CMS_ADMIN_USER };
  } catch {
    return { valid: false };
  }
}

/**
 * Verify session from incoming NextRequest
 */
export function verifyAdminSession(req: NextRequest): { valid: boolean; user?: string } {
  const cookie = req.cookies.get(CMS_COOKIE_NAME);
  if (!cookie?.value) return { valid: false };
  return verifySessionToken(cookie.value);
}
