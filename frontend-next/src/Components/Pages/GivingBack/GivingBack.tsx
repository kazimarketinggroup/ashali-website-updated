"use client";

import React from "react";
import GivingBackHero from "./GivingBackHero";
import GivingBackMission from "./GivingBackMission";
import GivingBackAudience from "./GivingBackAudience";
import GivingBackThemes from "./GivingBackThemes";
import GivingBackEligibility from "./GivingBackEligibility";
import GivingBackCta from "./GivingBackCta";

export const GivingBack: React.FC = () => {
  return (
    <div className="min-w-0 bg-black font-sans text-white">
      {/* 1. Hero */}
      <GivingBackHero />

      {/* 2. Why this matters / Birmingham story */}
      <GivingBackMission />

      {/* 3. Who it's for */}
      <GivingBackAudience />

      {/* 4. Talk themes */}
      <GivingBackThemes />

      {/* 5. How it works / Eligibility */}
      <GivingBackEligibility />

      {/* 6. Propose engagement CTA */}
      <GivingBackCta />
    </div>
  );
};

export default GivingBack;
