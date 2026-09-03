/**
 * Site origin used to build absolute canonical and Open Graph URLs.
 * Set VITE_SITE_URL in the deployment environment; the fallback is the
 * production domain.
 */
// `import.meta.env` is injected by Vite and is undefined when these modules are
// loaded outside a Vite pipeline (test runners, scripts, any prerender step), so
// it is read defensively rather than accessed directly.
const configured = (import.meta.env as Record<string, string | undefined> | undefined)
  ?.VITE_SITE_URL;

export const SITE_ORIGIN = configured?.replace(/\/$/, "") || "https://ashali.com";
