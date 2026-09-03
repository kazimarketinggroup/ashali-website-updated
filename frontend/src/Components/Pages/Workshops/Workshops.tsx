import React from "react";

import Head from "../../Shared/Head";
import { breadcrumbSchema, faqSchema } from "../../../constants/structuredData";


import EngagementLadder from "./EngagementLadder";
import WorkshopDifferentiator from "./WorkshopDifferentiator";
import WorkshopFaq from "./WorkshopFaq";
import { faqs } from "./faqData";
import { ANALYTICS_EVENTS } from "../../../utils/analytics";
import WorkshopLabs from "./WorkshopLabs";
import WorkshopsHero from "./WorkshopsHero";
import FinalCta from "../Home/FinalCta";

const Workshops: React.FC = () => {
  return (
    <div className="min-w-0 bg-black font-sans text-white">
      <Head
        title="Executive Workshops & Leadership Labs — Ash Ali"
        description="Executive workshops that turn the AI conversation into decisions: the AI Advantage Lab, the Human Advantage Leadership Lab and the AI-Era Sales Transformation Lab."
      path="/workshops"
      image="/og/workshops.png"
      imageAlt="Executive workshop session"
      jsonLd={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Workshops", path: "/workshops" },
          ]),
          faqSchema(faqs),
        ]}
      />

      <WorkshopsHero />
      <WorkshopDifferentiator />
      <WorkshopLabs />
      <EngagementLadder />
      <WorkshopFaq />
      <FinalCta
        heading="Ready to turn the AI conversation into decisions?"
        body="Tell us about the leadership team, the decision you need to make and the timeframe. We'll recommend the right format and confirm availability."
        ctaLabel="Discuss an executive workshop"
        ctaTo="/contact"
        event={ANALYTICS_EVENTS.workshopEnquiryClick}
      />
    </div>
  );
};

export default Workshops;
