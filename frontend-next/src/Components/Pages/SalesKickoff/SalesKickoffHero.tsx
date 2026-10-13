"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { brandGradientTextStyle } from "../../../constants/brandGradient";

export const SalesKickoffHero: React.FC = () => {
  const handleOpenIndexModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-index-modal"));
    }
  };

  return (
    <section className="bg-black text-white pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 select-text">
      <div className="mx-auto max-w-fluid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: Copy matching Image 1 */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase mb-4">
              SALES KICKOFF KEYNOTES AND WORKSHOPS
            </span>

            <h1 className="text-white text-fluid-34 font-semibold tracking-tight leading-[1.2] mb-6">
              Give your sales kickoff a{" "}
              <span style={brandGradientTextStyle}>clear direction</span>{" "}
              for better execution.
            </h1>

            <p className="text-gray-300 font-light leading-[1.75] tracking-wide text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] max-w-xl mb-8">
              Ash Ali brings founder experience and findings from the Global Sales Capability Index to help your team examine its blindspots, understand where AI can support the work and agree what to improve next.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact?type=sales-kickoff"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-black font-semibold text-[13px] rounded-[2px] transition-colors duration-150 hover:bg-gray-100 shadow-md"
              >
                <span>Discuss your sales kickoff</span>
                <ArrowUpRight size={16} strokeWidth={2.2} />
              </Link>

              <button
                type="button"
                onClick={handleOpenIndexModal}
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-transparent border border-white/20 text-white font-medium text-[13px] rounded-[2px] transition-all duration-150 hover:border-white/60 hover:bg-white/5 cursor-pointer"
              >
                <span>Get the Index</span>
                <ArrowRight size={15} strokeWidth={1.8} />
              </button>
            </div>
          </div>

          {/* RIGHT: Stat Box matching Image 1 */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-[8px] bg-[#141414] border border-white/[0.08] p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 bg-[#14b8a6] shrink-0" />
                <span className="text-[12.5px] font-medium text-gray-300 tracking-wide">
                  Global Sales Capability Index
                </span>
              </div>

              <div
                className="text-6xl sm:text-7xl font-bold tracking-tight mb-4 select-none"
                style={brandGradientTextStyle}
              >
                76%
              </div>

              <p className="text-[14px] sm:text-[15px] text-white font-normal leading-relaxed">
                of sales professionals in the Index dataset rated their capability higher than their manager did.
              </p>

              <div className="my-5 border-t border-white/[0.08]" />

              <div className="text-[11px] sm:text-[12px] text-gray-400 font-light tracking-wide leading-relaxed">
                <p>Uhubs Global Sales Capability Index 2026</p>
                <p className="text-gray-500">first edition • April 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesKickoffHero;
