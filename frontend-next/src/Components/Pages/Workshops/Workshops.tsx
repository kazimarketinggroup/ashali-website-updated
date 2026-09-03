import React from "react";

import EngagementLadder from "./EngagementLadder";
import WorkshopDifferentiator from "./WorkshopDifferentiator";
import WorkshopFaq from "./WorkshopFaq";
import { ANALYTICS_EVENTS } from "../../../utils/analytics";
import WorkshopLabs from "./WorkshopLabs";
import WorkshopsHero from "./WorkshopsHero";
import FinalCta from "../Home/FinalCta";

/*
  Metadata and JSON-LD for this page now live in app/workshops/page.tsx.

  This component previously rendered <Head> from Shared/Head.tsx, which set
  document.title inside a useEffect — that runs only after hydration, so the
  server HTML crawlers read still carried the generic sitewide title, and the
  `jsonLd` prop it accepted was never rendered at all. Both are handled
  properly by the App Router `metadata` export and the <JsonLd> server
  component, so Shared/Head.tsx has been deleted.
*/
const Workshops: React.FC = () => {
  return (
    <div className="min-w-0 bg-black font-sans text-white">
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
