import React from "react";
import Link from "next/link";

import { brandGradientTextStyle } from "../../../constants/brandGradient";

const UnfairAdvantageSection: React.FC = () => {
  return (
    <section className="bg-[#101010] text-white">
      <div className="mx-auto grid max-w-[1160px] grid-cols-1 gap-8 px-5 py-14 sm:px-6 md:grid-cols-[0.8fr_auto_1.25fr] md:items-center md:gap-12 lg:px-8 lg:py-24">
        <h2 className="text-3xl font-normal leading-[1.32] tracking-normal text-white/92">
          The <span style={brandGradientTextStyle}>World Is Changing.</span>
          <br />
          Advantage Belongs To The
          <br />
          People Who See Differently.
        </h2>

        <div className="hidden h-full min-h-[220px] w-px bg-white/80 md:block" />

        <div className="max-w-[650px] space-y-6 text-[12px] leading-[1.8] text-white/86 sm:text-[13px]">
          <p>
            Ash&apos;s Work Focuses On One Powerful Idea: Success Is Not Just About Working Harder. It Is About Understanding Your Unfair
            Advantages, Spotting Shifts Early, And Using Them With Intention.
          </p>

          <p>
            From Startups And Sales Teams To AI Transformation And Emerging Markets, Ash Helps People And Organisations Find The Leverage
            Others Miss.
          </p>

          <Link
            href="/about"
            className="inline-flex border border-white/45 px-6 py-2 text-[11px] font-normal text-white transition-colors hover:bg-white hover:text-black"
          >
            Ash&apos;s Journey
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UnfairAdvantageSection;
