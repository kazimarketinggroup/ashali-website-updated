"use client";

import React from "react";
import Link from "next/link";

export const GivingBackCta: React.FC = () => {
  return (
    <section className="bg-black text-white py-16 md:py-24 text-center select-text">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-white text-fluid-34 font-normal tracking-tight leading-tight mb-5">
          Propose an impact, school or community engagement
        </h2>

        <p className="text-gray-300 font-light text-[14px] sm:text-[15px] leading-relaxed max-w-xl mb-9">
          Share your organisation, audience, age group and what you want to achieve. We&apos;ll confirm availability and whether it&apos;s a good fit.
        </p>

        <Link
          href="/contact?type=giving-back"
          className="min-h-[46px] inline-flex items-center justify-center px-7 py-3 bg-transparent border border-white/30 text-white font-medium text-[13.5px] rounded-[2px] transition-all duration-150 hover:bg-white hover:text-black hover:border-white shadow-md"
        >
          Start the conversation
        </Link>
      </div>
    </section>
  );
};

export default GivingBackCta;
