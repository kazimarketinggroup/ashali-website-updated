"use client";

import React from "react";
import Image from "next/image";
import ashPanelImg from "../../../assets/about/ash-conference-panel.png";
import { brandGradientTextStyle } from "../../../constants/brandGradient";

export const SalesKickoffPulse: React.FC = () => {
  return (
    <section className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 select-text">
      <div className="mx-auto max-w-fluid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: Image matching Image 1 */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-[8px] overflow-hidden border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] aspect-[4/3] w-full">
              <Image
                src={ashPanelImg}
                alt="Ash Ali speaking with panel and diagnostics"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 450px"
              />
            </div>
          </div>

          {/* RIGHT: Copy matching Image 1 */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#d97736] shrink-0" />
              <span className="text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase">
                Optional Pulse diagnostic
              </span>
            </div>

            <h2 className="text-white text-fluid-28 font-semibold tracking-tight leading-[1.25] mb-5">
              Start with your team&apos;s{" "}
              <span style={brandGradientTextStyle}>own capability picture.</span>
            </h2>

            <p className="text-gray-300 font-light leading-[1.75] tracking-wide text-[13.5px] sm:text-[14.5px] max-w-xl">
              An optional Uhubs Pulse diagnostic brings rep and manager perspectives into the preparation. Where timing and participation allow, Ash can use an aggregated readout to tailor the discussion to your team&apos;s priorities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesKickoffPulse;
