"use client";

import React from "react";
import Link from "next/link";

export const SalesKickoffCta: React.FC = () => {
  return (
    <section className="bg-black text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-center select-text">
      <div className="mx-auto max-w-3xl flex flex-col items-center">
        <h2 className="text-white text-fluid-30 font-semibold tracking-tight leading-tight mb-5">
          Planning your next sales kickoff?
        </h2>

        <p className="text-gray-400 font-light text-[14px] sm:text-[15px] leading-relaxed max-w-xl mb-9">
          Tell us your date, audience and the change you want the team to make. We&apos;ll recommend a suitable keynote, workshop or diagnostic option.
        </p>

        <Link
          href="/contact?type=sales-kickoff"
          className="min-h-[44px] inline-flex items-center justify-center px-7 py-3 bg-transparent border border-white/30 text-white font-medium text-[13px] rounded-[2px] transition-all duration-150 hover:bg-white hover:text-black hover:border-white shadow-md"
        >
          Discuss your sales kickoff
        </Link>
      </div>
    </section>
  );
};

export default SalesKickoffCta;
