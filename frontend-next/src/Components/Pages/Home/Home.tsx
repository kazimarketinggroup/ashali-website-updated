"use client";

import AshAliHero from "./AshAliHero";
import WatchAshSpeak from "./WatchAshSpeak";
import HelpingLeadersSection from "./HelpingLeaderSection";
import SignatureIdeas from "./SignatureIdeas";
import BookShowcase from "./BookShowcase";
import CapabilityIndexSection from "./CapabilityIndexSection";
import SalesKickoffSection from "./SalesKickoffSection";
import BuildingBridges from "./BuildingBridges";
import Testimonials from "./Testmonials";
import FinalCta from "./FinalCta";
import { useCMS } from "../../../context/CMSContext";

const Home = () => {
  const { cmsData } = useCMS();
  const cta = cmsData?.finalCta;

  return (
    <div className="min-w-0 overflow-x-clip bg-black">
      {/* 1. Hero with 76% stat & credibility strip (Image 2) */}
      <AshAliHero />

      {/* 2. Watch Ash speak video section (Image 3) */}
      <WatchAshSpeak />

      {/* 3. Helping leaders section (as it is) */}
      <HelpingLeadersSection />

      {/* 4. Signature ideas */}
      <SignatureIdeas />

      {/* 5. Book showcase */}
      <BookShowcase />

      {/* 6. Capability Index download section */}
      <CapabilityIndexSection />

      {/* 7. Sales Kickoff section (Image 4) */}
      <SalesKickoffSection />

      {/* 8. Malaysia & Southeast Asia */}
      <BuildingBridges />

      {/* 9. Verified Testimonials (Image 1) */}
      <Testimonials />

      {/* 10. Final CTA */}
      <FinalCta
        heading={
          cta?.heading ||
          "Planning a keynote, leadership offsite or executive workshop?"
        }
        body={
          cta?.body ||
          "Share the audience, date and outcome you want to create. We'll recommend the most suitable format and confirm availability."
        }
        ctaLabel={cta?.ctaLabel || "Enquire now"}
        ctaTo={cta?.ctaTo || "/contact"}
      />
    </div>
  );
};

export default Home;
