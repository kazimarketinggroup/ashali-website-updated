import type { MetadataRoute } from "next";

import { SITE_ORIGIN } from "@/src/constants/site";

/*
  Native Next.js robots file — served at /robots.txt.

  DELIBERATELY PERMISSIVE. This is a public marketing site: there is no admin
  area, no authenticated section, no API route handlers (`find app -name
  route.ts` returns nothing) and no user-generated content. Blocking paths that
  do not exist adds no protection and risks blocking something real later.

  In particular, /_next/ is NOT disallowed. It serves the CSS, JS and images
  Google needs to render the page; blocking it is a common copy-pasted mistake
  that makes pages fail mobile-friendly and layout checks.

  Thin pages are handled where they belong — at the page level, with a
  `robots: { index: false }` metadata export on each of the 10 placeholder
  routes. That is strictly better than a Disallow here: Disallow stops the
  crawl, which means Google never sees the noindex and can still list a bare
  URL it found via a link. Allowing the crawl and serving noindex removes them
  from the index properly.

  `host` and `sitemap` both use SITE_ORIGIN (the www host, since the apex
  307-redirects to it), so a preview deployment advertises its own sitemap
  rather than production's.
*/
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
