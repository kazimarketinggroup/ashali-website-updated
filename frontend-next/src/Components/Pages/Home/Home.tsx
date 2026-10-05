"use client";

import AshAliHero from "./AshAliHero";
import BookShowcase from "./BookShowcase";
import BuildingBridges from "./BuildingBridges";
import CapabilityIndexSection from "./CapabilityIndexSection";
import FinalCta from "./FinalCta";
import HelpingLeadersSection from "./HelpingLeaderSection";
import SignatureIdeas from "./SignatureIdeas";
import Testimonials from "./Testmonials";
import { useCMS } from "../../../context/CMSContext";

const Home = () => {
  const { cmsData } = useCMS();
  const cta = cmsData?.finalCta;

  return (
    <div className="min-w-0 overflow-x-clip bg-black">
      <AshAliHero />
      <HelpingLeadersSection />
      <SignatureIdeas />
      <BookShowcase />
      <CapabilityIndexSection />
      <BuildingBridges />
      <Testimonials />
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
