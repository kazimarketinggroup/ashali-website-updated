"use client";

import React from "react";
import { brandGradientTextStyle } from "../../../constants/brandGradient";

export const GivingBackMission: React.FC = () => {
  return (
    <section className="bg-black text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 text-center select-text">
      <div className="mx-auto max-w-4xl flex flex-col items-center">
        {/* Eyebrow */}
        <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase mb-4">
          WHY THIS MATTERS
        </span>

        {/* Heading matching Image 2 */}
        <h2 className="text-white text-fluid-26 sm:text-fluid-28 font-medium leading-[1.3] tracking-tight max-w-3xl mb-6">
          <span style={brandGradientTextStyle}>
            From inner-city Birmingham to startups,
          </span>
          <br className="hidden sm:block" />
          {" "}technology, authorship and global work: talent is everywhere, but access, confidence and context are not.
        </h2>

        {/* Paragraph */}
        <p className="text-gray-400 font-light text-[13.5px] sm:text-[14.5px] leading-[1.8] tracking-wide max-w-2xl antialiased">
          Ash grew up in inner-city Birmingham without advantages, pedigree or capital. He built his first business at nineteen and learned by doing. These talks are about giving young people the tools, mindset and self-belief to carve their own path.
        </p>
      </div>
    </section>
  );
};

export default GivingBackMission;
