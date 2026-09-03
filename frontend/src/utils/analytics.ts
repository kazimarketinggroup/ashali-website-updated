/*
  Analytics events (§7).

  `track` is a thin, provider-agnostic shim: it pushes to `dataLayer` (GTM) and
  calls `gtag` if either is present, and is a no-op otherwise — so the site
  works with or without an analytics layer installed.

  Never pass free-text field contents (names, emails, message bodies) as
  payload. Event name plus page context is sufficient.
*/

export const ANALYTICS_EVENTS = {
  heroWatchReel: "hero_watch_reel",
  heroExploreKeynotesWorkshops: "hero_explore_keynotes_workshops",
  keynoteEnquiryClick: "keynote_enquiry_click",
  workshopEnquiryClick: "workshop_enquiry_click",
  speakerPackDownload: "speaker_pack_download",
  contactFormStart: "contact_form_start",
  contactFormSubmitSuccess: "contact_form_submit_success",
  bookPurchaseClick: "book_purchase_click",
  uhubsClick: "uhubs_click",
} as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

/** Only non-identifying, low-cardinality context is allowed. */
type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

export function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  const data = {
    ...payload,
    page_path: window.location.pathname,
  };

  w.dataLayer?.push({ event, ...data });
  w.gtag?.("event", event, data);
}
