"use client";

import React from "react";
import Link from "next/link";
import { brandGradientTextStyle } from "../../../constants/brandGradient";

export const GivingBackEligibility: React.FC = () => {
  return (
    <section className="bg-black text-white py-16 md:py-24 border-b border-white/10 select-text">
      <div className="mx-auto max-w-fluid px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: Copy matching Image 2 */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] text-gray-400 uppercase mb-4">
              HOW IT WORKS
            </span>

            <h2 className="text-white text-fluid-34 font-normal tracking-tight leading-[1.25] mb-5">
              A{" "}
              <span style={brandGradientTextStyle}>limited number of sessions</span>{" "}
              given carefully.
            </h2>

            <p className="text-gray-300 font-light leading-[1.75] tracking-wide text-[14px] sm:text-[15px] max-w-xl mb-8">
              Because Ash runs Uhubs and travels internationally, pro-bono sessions are strictly capped each year. Eligibility is assessed by audience need, not institution category.
            </p>

            <Link
              href="/contact?type=giving-back"
              className="min-h-[46px] inline-flex items-center justify-center px-6 py-3 bg-white text-black font-semibold text-[13.5px] rounded-[2px] transition-colors duration-150 hover:bg-gray-100 shadow-md"
            >
              Check eligibility &amp; enquire
            </Link>
          </div>

          {/* RIGHT: Box matching Image 2 */}
          <div className="lg:col-span-6 w-full">
            <div className="rounded-[8px] bg-[#121212] border border-[#14b8a6]/40 p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              <h3 className="text-white text-[16px] sm:text-[17px] font-semibold tracking-tight mb-2">
                Limited each year
              </h3>
              <p className="text-gray-400 text-[12.5px] sm:text-[13px] font-light mb-6">
                To ensure every session is high quality and impactful:
              </p>

              <div className="space-y-4">
                <div className="border-t border-white/[0.08] pt-4">
                  <p className="text-[#d97736] text-[13px] font-semibold mb-1">
                    Travel and logistics
                  </p>
                  <p className="text-gray-300 text-[12.5px] sm:text-[13px] font-light leading-relaxed">
                    Organisations cover travel and accommodation where travel is required.
                  </p>
                </div>

                <div className="border-t border-white/[0.08] pt-4">
                  <p className="text-[#d97736] text-[13px] font-semibold mb-1">
                    Clear audience &amp; safeguarding
                  </p>
                  <p className="text-gray-300 text-[12.5px] sm:text-[13px] font-light leading-relaxed">
                    Sessions are dedicated to young people and underrepresented groups.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GivingBackEligibility;
