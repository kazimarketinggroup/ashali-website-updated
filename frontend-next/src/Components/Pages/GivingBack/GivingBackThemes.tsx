"use client";

import React from "react";
import Link from "next/link";
import { brandGradientTextStyle } from "../../../constants/brandGradient";

export const GivingBackThemes: React.FC = () => {
  const themes = [
    {
      title: "Finding your unfair advantage",
      description:
        "How to identify your unique strengths, background and perspective, even when you feel you have none.",
    },
    {
      title: "Entrepreneurship demystified",
      description:
        "From idea to execution: what building something actually looks like without money or pedigree.",
    },
    {
      title: "Using AI without losing your own thinking",
      description:
        "How young people can leverage AI tools to multiply their capability without losing their voice.",
    },
    {
      title: "Auditing your personal runway",
      description:
        "Understanding your MILES assets: Money, Intelligence, Location, Education, Status.",
    },
    {
      title: "Turning adversity into an edge",
      description:
        "Making obstacles and non-traditional backgrounds your greatest differentiator.",
    },
    {
      title: "Tailored to your group",
      description:
        "Sessions shaped around your group's specific age, context, challenges and aspirations.",
    },
  ];

  return (
    <section className="bg-black text-white py-16 md:py-24 border-b border-white/10 text-center select-text">
      <div className="mx-auto max-w-fluid px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] text-gray-400 uppercase mb-4 block">
          TALK THEMES
        </span>

        {/* Heading */}
        <h2 className="text-white text-fluid-34 font-normal tracking-tight leading-tight mb-12 max-w-2xl mx-auto">
          Concrete, hopeful and{" "}
          <span style={brandGradientTextStyle}>genuinely useful.</span>
        </h2>

        {/* 6 Cards Grid matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left mb-12">
          {themes.map((theme, i) => (
            <div
              key={i}
              className="rounded-[6px] bg-[#141414] border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between min-h-[170px] relative overflow-hidden transition-all duration-200 hover:border-white/20"
            >
              <div>
                <h3 className="text-white text-[16px] sm:text-[17px] font-semibold tracking-tight leading-snug mb-3">
                  {theme.title}
                </h3>
                <p className="text-gray-300 font-light text-[13.5px] sm:text-[14px] leading-relaxed">
                  {theme.description}
                </p>
              </div>

              {/* Bottom orange accent bar matching screenshot */}
              <div className="mt-5 h-[2px] w-full bg-gradient-to-r from-[#d97736] to-[#14b8a6]/40" />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/contact?type=giving-back"
            className="min-h-[44px] inline-flex items-center justify-center px-6 py-2.5 bg-white text-black font-semibold text-[13px] rounded-[2px] transition-colors duration-150 hover:bg-gray-100 shadow-md"
          >
            Enquire about Giving Back
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GivingBackThemes;
