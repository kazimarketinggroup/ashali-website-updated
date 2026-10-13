"use client";

import React from "react";
import SalesKickoffHero from "./SalesKickoffHero";
import SalesKickoffKeynote from "./SalesKickoffKeynote";
import SalesKickoffAction from "./SalesKickoffAction";
import SalesKickoffPulse from "./SalesKickoffPulse";
import SalesKickoffCta from "./SalesKickoffCta";
import { CapabilityIndexSection } from "../Home/CapabilityIndexSection";

export const SalesKickoff: React.FC = () => {
  return (
    <div className="min-w-0 bg-black font-sans text-white">
      {/* Hero with 76% stat */}
      <SalesKickoffHero />

      {/* The Unfair Advantage in the Age of AI Keynote */}
      <SalesKickoffKeynote />

      {/* Keynote to Action: Practical team plan */}
      <SalesKickoffAction />

      {/* Optional Pulse Diagnostic */}
      <SalesKickoffPulse />

      {/* Final Kickoff CTA */}
      <SalesKickoffCta />

      {/* Hidden container to mount modal portal listener for "Get the Index" */}
      <div className="hidden">
        <CapabilityIndexSection />
      </div>
    </div>
  );
};

export default SalesKickoff;
