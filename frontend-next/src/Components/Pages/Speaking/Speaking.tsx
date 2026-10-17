"use client";

import React from "react";
import KeynotesBanner from "../Home/KeynotesBanner";
import KeynoteLogoMarquee from "./KeynoteLogoMarquee";
import KeynotesSection from "./KeynotesSection";
import SpeakerBioSection from "./SpeakerBioSection";
import FlagshipKeynotes from "./FlagshipKeynotes";
import SalesKickoffAction from "../SalesKickoff/SalesKickoffAction";
import SalesKickoffPulse from "../SalesKickoff/SalesKickoffPulse";
import AdditionalFormats from "./AdditionalFormat";
import SupportingVideos from "./SupportingVideos";
import SpeakingThoughts from "./SpeakingThoughts";
import BookingKeynoteSection from "./BookingKeynoteSection";
import FinalCta from "../Home/FinalCta";

const Speaking: React.FC = () => {
  return (
    <div className="min-w-0 bg-black font-sans text-white">
      {/* 1. Hero Banner */}
      <KeynotesBanner />

      {/* 2. Client & Event Partner Logo Marquee */}
      <KeynoteLogoMarquee />

      {/* 3. Who Ash Speaks To (4 Targeted Commercial Audiences with Sales Kickoff link) */}
      <KeynotesSection />

      {/* 4. Speaker Bio & Verified Proof Video */}
      <SpeakerBioSection />

      {/* 5. Three Flagship Keynotes (with Education note on Keynote 03) */}
      <FlagshipKeynotes />

      {/* 6. Keynote to Action: Delivery Formats & Team Plan */}
      <SalesKickoffAction />

      {/* 7. Optional Pulse Diagnostic: Team Capability Picture */}
      <SalesKickoffPulse />

      {/* 8. Additional Formats & Other Ways Ash Works */}
      <AdditionalFormats />

      {/* 9. Supporting Videos: Podcasts, Panels & Talks */}
      <SupportingVideos />

      {/* 10. Verified Organiser Testimonials */}
      <SpeakingThoughts />

      {/* 11. Booking a Keynote Formats */}
      <BookingKeynoteSection />

      {/* 12. Final Action CTA */}
      <FinalCta
        heading="Planning a keynote, leadership offsite or executive workshop?"
        body="Share the audience, date and outcome you want to create. We'll recommend the most suitable format and confirm availability."
        ctaLabel="Enquire now"
      />
    </div>
  );
};

export default Speaking;
