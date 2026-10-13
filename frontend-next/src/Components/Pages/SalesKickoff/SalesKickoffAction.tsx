"use client";

import React from "react";
import { Check } from "lucide-react";
import { brandGradientTextStyle } from "../../../constants/brandGradient";

export const SalesKickoffAction: React.FC = () => {
  const deliverables = [
    "Capability priorities",
    "Human and AI workflow decisions",
    "Owners",
    "Review dates",
  ];

  return (
    <section className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 select-text">
      <div className="mx-auto max-w-fluid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: Copy matching Image 1 */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#d97736] shrink-0" />
              <span className="text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase">
                Keynote to Action
              </span>
            </div>

            <h2 className="text-white text-fluid-28 font-semibold tracking-tight leading-[1.25] mb-5">
              Turn the keynote into a{" "}
              <span style={brandGradientTextStyle}>practical team plan.</span>
            </h2>

            <p className="text-gray-300 font-light leading-[1.75] tracking-wide text-[13.5px] sm:text-[14.5px] max-w-xl mb-8">
              Follow the keynote with a facilitated session drawn from The AI-Era Sales Transformation Lab. Leaders work through their context, select capability priorities and agree a focused set of actions for the next 90 days.
            </p>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#14b8a6]/20 text-[#14b8a6]">
                  <Check size={12} strokeWidth={2.5} />
                </span>
                <span className="text-[13.5px] text-gray-200 font-normal">
                  60–90 minute follow-on
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#14b8a6]/20 text-[#14b8a6]">
                  <Check size={12} strokeWidth={2.5} />
                </span>
                <span className="text-[13.5px] text-gray-200 font-normal">
                  Deeper half-day or full-day lab
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Deliverables Box matching Image 1 */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-[8px] bg-[#141414] border border-white/[0.08] p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.3)]">
              <div className="space-y-4">
                {deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 border-b border-white/[0.06] pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-white/20 bg-white/5 text-[#14b8a6]">
                      <Check size={12} strokeWidth={2.5} />
                    </div>
                    <span className="text-[13.5px] font-medium text-gray-200 tracking-wide">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesKickoffAction;
