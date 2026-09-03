import type { Metadata } from "next";

import { SITE_ORIGIN } from "./site";

/*
  Per-page metadata helper (§2).

  Every indexable route builds its `metadata` export through `pageMetadata()`
  so that titles, canonicals and social tags cannot drift apart. Before this,
  all ~27 URLs shared one title and one description inherited from the root
  layout — the old <Head> component that was meant to override them set
  document.title in a useEffect, which runs after hydration and is therefore
  invisible to crawlers.

  OG IMAGE CONVENTION
  -------------------
  Each page may declare `ogImage: "/og/<page>.png"`. Where no branded image
  exists yet the shared card at /og/default.png is used, so no share is ever
  imageless. To upgrade a page later, drop the file into public/og/ and add the
  one `ogImage` line — no other change is needed.

  The default card is generated from an existing asset and is a placeholder;
  replacing it with branded artwork requires no code change at all.
*/

/** Sitewide fallback share card. 1200x630, the ratio Twitter/LinkedIn expect. */
export const DEFAULT_OG_IMAGE = "/og/default.png";

const SITE_NAME = "Ash Ali";

export type PageMetaInput = {
  /** Full <title>. Written per page; NOT suffixed automatically. */
  title: string;
  description: string;
  /** Root-relative path, e.g. "/about". Used for the canonical URL. */
  path: string;
  /** Root-relative OG image path. Defaults to the sitewide card. */
  ogImage?: string;
  /** Alt text for the OG image — describe the image, not the page. */
  ogImageAlt?: string;
  /** Set false for pages that must not be indexed. */
  index?: boolean;
  /** "article" for blog posts; everything else is a website. */
  type?: "website" | "article";
  publishedTime?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = "Ash Ali — entrepreneur, investor and keynote speaker",
  index = true,
  type = "website",
  publishedTime,
}: PageMetaInput): Metadata {
  /*
    Note on the homepage: passing "/" yields "https://www.ashali.com/", but
    Next normalises a bare-root canonical and renders it without the trailing
    slash. That is Next's own URL handling and cannot be overridden here, so
    app/sitemap.ts emits the homepage without a trailing slash to match. Google
    treats the two forms as one URL regardless; keeping them identical just
    avoids a pointless discrepancy in Search Console.
  */
  const url = `${SITE_ORIGIN}${path}`;

  return {
    title,
    description,
    /*
      Canonical is explicit on every page. metadataBase in the root layout
      resolves the relative path against the www origin — the apex 307-redirects
      to it, so a canonical pointing at the apex would be a redirect hop.
    */
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogImageAlt }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@Ash_Ali",
    },
  };
}

/*
  JSON-LD is injected with a plain <script> tag rather than next/script:
  structured data must be present in the server-rendered HTML, and next/script
  defers execution, which can hide it from crawlers that do not run JS.

  The JSON is serialised with the "<" escape that prevents a "</script>"
  sequence inside any string from terminating the tag early — the standard
  XSS guard for inline JSON-LD.
*/
export function jsonLdScript(schema: object | object[]) {
  const payload = Array.isArray(schema) ? schema : [schema];

  return payload.map((entry) => JSON.stringify(entry).replace(/</g, "\\u003c"));
}
