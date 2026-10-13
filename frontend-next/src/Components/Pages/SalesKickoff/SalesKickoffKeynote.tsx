"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export const SalesKickoffKeynote: React.FC = () => {
  const takeaways = [
    { number: "01", text: "Recognise assessment gaps" },
    { number: "02", text: "Discuss AI support for sales work" },
    { number: "03", text: "Identify capability priorities to investigate" },
  ];

  return (
    <section className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 select-text">
      <div className="mx-auto max-w-fluid">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-[#d97736] shrink-0" />
          <span className="text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase">
            Keynote
          </span>
        </div>

        {/* Title */}
        <h2 className="text-white text-fluid-28 font-semibold tracking-tight leading-[1.25] mb-5 max-w-2xl">
          The Unfair Advantage in the Age of AI
        </h2>

        {/* Description */}
        <p className="text-gray-300 font-light leading-[1.75] tracking-wide text-[13.5px] sm:text-[14.5px] max-w-3xl mb-12">
          A keynote for revenue teams asking where their advantage comes from as AI changes selling. Ash connects the MILES framework with sales capability research to help teams question assumptions, identify strengths and focus on the work that matters.
        </p>

        {/* 3 Takeaway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {takeaways.map((item) => (
            <div
              key={item.number}
              className="rounded-[8px] bg-[#141414] border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between min-h-[160px] transition-all duration-200 hover:border-white/20"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-[#d97736] font-semibold text-[13px] tracking-wider">
                  {item.number}
                </span>
                <ArrowUpRight size={16} className="text-gray-500" />
              </div>
              <p className="text-[14px] sm:text-[15px] font-medium text-white leading-snug">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalesKickoffKeynote;
