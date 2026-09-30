import { SITE_ORIGIN } from "./site";

/*
  JSON-LD builders (§5).

  Only claims already published on the site appear here. Nothing is asserted
  that isn't verifiable from existing page copy — in particular there is no
  VideoObject builder in use yet, because the showreel does not exist. Add one
  only when there is a real video with a real upload date; never fabricate
  view counts or dates.
*/

/** Person schema for Ash Ali — used on About and as sitewide identity. */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ash Ali",
  url: `${SITE_ORIGIN}/about`,
  jobTitle: "Keynote speaker, entrepreneur and investor",
  nationality: "British",
  description:
    "British tech entrepreneur, investor, author and international keynote speaker. Just Eat UK's first Marketing Director and co-author of The Unfair Advantage.",
  knowsAbout: [
    "Artificial intelligence and business advantage",
    "Entrepreneurship",
    "Sales transformation",
    "Leadership and human capability",
  ],
  sameAs: [
    "https://uk.linkedin.com/in/ashali",
    "https://x.com/Ash_Ali",
    "https://www.amazon.com/stores/Ash-Ali/author/B082V279X1",
  ],
};

/** Service / Speaker schema for speaking engagements. */
export const speakerServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Keynote Speaking by Ash Ali",
  serviceType: "Keynote Speaking, Executive Workshops, Leadership Presentations",
  provider: personSchema,
  areaServed: ["United Kingdom", "Southeast Asia", "Worldwide"],
  description:
    "Keynote speeches and executive sessions on unfair advantage, artificial intelligence, entrepreneurship and leadership.",
  url: `${SITE_ORIGIN}/speaking`,
};

/** Book schema for The Unfair Advantage. */
export const bookSchema = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "The Unfair Advantage",
  author: [
    { "@type": "Person", name: "Ash Ali" },
    { "@type": "Person", name: "Hasan Kubba" },
  ],
  isbn: "9781788167543",
  url: `${SITE_ORIGIN}/unfair-advantage`,
  description:
    "The award-winning framework for finding what gives you an edge. The MILES framework helps people and organisations see the assets, context and capabilities they already possess.",
  award: "Business Book of the Year 2021",
};

/** BreadcrumbList for a page's position in the site hierarchy. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: SITE_ORIGIN + item.path,
    })),
  };
}

/**
 * FAQPage schema. Must be built from the same array that renders the visible
 * accordion, so the markup can never drift from the page content.
 */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
