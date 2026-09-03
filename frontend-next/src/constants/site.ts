/**
 * Site origin used to build absolute canonical and Open Graph URLs.
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment; the fallback is the
 * production domain.
 */
// Was `import.meta.env.VITE_SITE_URL` under Vite. Read as a full static
// property access so Next inlines the literal at build time. The defensive
// optional-chaining the Vite version needed is unnecessary here: `process.env`
// always exists, and Next replaces this whole expression during the build.
const configured = process.env.NEXT_PUBLIC_SITE_URL;

/*
  Fallback is the WWW host, verified against production: https://ashali.com
  returns a 307 to https://www.ashali.com/, which serves the 200. Canonical
  URLs, OG URLs and the sitemap must all use the host that actually serves the
  page — pointing them at the redirecting apex would make every canonical a
  redirect hop and let Google pick the target itself.
*/
export const SITE_ORIGIN = configured?.replace(/\/$/, "") || "https://www.ashali.com";
