import crypto from "crypto";

const SECRET = process.env.REPORT_DOWNLOAD_SECRET || "ashali-report-secure-key-2026";

/**
 * Generate a time-limited signed token for report download (valid for 1 hour).
 */
export function generateReportToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto.createHmac("sha256", SECRET).update(timestamp).digest("hex");
  return `${timestamp}.${signature}`;
}

/**
 * Validate the report download token.
 */
export function verifyReportToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Check expiration: valid for 1 hour (3,600,000 ms)
  const ONE_HOUR = 3600000;
  if (Date.now() - timestamp > ONE_HOUR || timestamp > Date.now() + 60000) {
    return false;
  }

  const expectedSignature = crypto.createHmac("sha256", SECRET).update(timestampStr).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}
