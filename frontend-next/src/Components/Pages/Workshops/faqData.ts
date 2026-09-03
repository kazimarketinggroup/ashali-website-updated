/*
  Workshop FAQ content (§3 / §5).

  Kept in its own module so both the visible accordion (WorkshopFaq.tsx) and the
  FAQPage JSON-LD (Workshops.tsx) read from one source — the structured data can
  never describe an answer the page doesn't render.
*/
export const faqs = [
  {
    id: "tailored",
    question: "How tailored is the session?",
    answer:
      "Every workshop is adapted to the organisation, audience and decisions that need to be made. Preparation may include stakeholder interviews, a short pre-session questionnaire or an Uhubs capability diagnostic.",
  },
  {
    id: "virtual",
    question: "Can the workshop be delivered virtually?",
    answer:
      "Yes. Workshops can be delivered in person or virtually, although leadership labs involving complex decisions generally work best in person.",
  },
  {
    id: "combined",
    question: "Can a keynote and workshop be combined?",
    answer:
      "Yes. The Keynote-to-Action format gives a wider audience the big idea and then takes a smaller leadership group into facilitated application.",
  },
  {
    id: "fees",
    question: "How are fees determined?",
    answer:
      "Fees depend on the format, preparation, audience, location and level of follow-on support. Share your date, objectives and indicative budget and we will recommend the most suitable option.",
  },
];
