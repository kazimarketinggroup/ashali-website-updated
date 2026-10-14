"use client";

import React from "react";

export const GivingBackAudience: React.FC = () => {
  const row1 = [
    "State schools & sixth forms",
    "Youth programmes",
    "Underrepresented founders programmes",
  ];
  const row2 = [
    "Charities & community organisations",
    "Universities & education programmes",
    "Entrepreneurship programmes",
  ];
  const row3 = [
    "Social mobility organisations",
  ];

  return (
    <section className="bg-black text-white py-16 md:py-24 border-b border-white/10 text-center select-text">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Eyebrow */}
        <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] text-gray-400 uppercase mb-4">
          WHO IT&apos;S FOR
        </span>

        {/* Heading */}
        <h2 className="text-white text-fluid-34 font-normal tracking-tight leading-tight mb-10">
          Communities and organisations Ash supports
        </h2>

        {/* Tags matching Image 2 */}
        <div className="flex flex-col items-center gap-3 w-full max-w-3xl">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {row1.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2.5 rounded-[2px] border border-white/20 bg-white/[0.03] text-gray-200 text-[13px] sm:text-[13.5px] font-normal tracking-wide shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {row2.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-[2px] border border-white/20 bg-white/[0.03] text-gray-200 text-[12.5px] sm:text-[13px] font-normal tracking-wide shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {row3.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-[2px] border border-white/20 bg-white/[0.03] text-gray-200 text-[12.5px] sm:text-[13px] font-normal tracking-wide shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GivingBackAudience;
