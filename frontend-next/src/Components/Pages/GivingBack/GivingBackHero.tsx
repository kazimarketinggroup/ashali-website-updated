"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import impactHeroImg from "../../../assets/impact/impactHero.png";
import { brandGradientTextStyle } from "../../../constants/brandGradient";

export const GivingBackHero: React.FC = () => {
  return (
    <section className="bg-black text-white pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 select-text">
      <div className="mx-auto max-w-fluid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: Copy matching Image 2 */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase mb-4">
              GIVING BACK
            </span>

            <h1 className="text-white text-fluid-34 font-semibold tracking-tight leading-[1.2] mb-6">
              Unfair Access: talks for{" "}
              <span style={brandGradientTextStyle}>young people</span>{" "}
              who weren&apos;t handed an{" "}
              <span style={brandGradientTextStyle}>advantage.</span>
            </h1>

            <p className="text-gray-300 font-light leading-[1.75] tracking-wide text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] max-w-xl mb-8">
              Ash offers a limited number of talks each year for schools, education programmes and organisations supporting young people with fewer opportunities. Drawing on his own journey, he helps audiences recognise their strengths and take practical steps towards what comes next.
            </p>

            <Link
              href="/contact?type=giving-back"
              className="min-h-[44px] inline-flex items-center justify-center px-6 py-2.5 bg-white text-black font-semibold text-[13px] rounded-[2px] transition-colors duration-150 hover:bg-gray-100 shadow-md"
            >
              Enquire about Giving Back
            </Link>
          </div>

          {/* RIGHT: Image matching Image 2 */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="relative rounded-[12px] overflow-hidden border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] aspect-[4/3] w-full max-w-[460px]">
              <Image
                src={impactHeroImg}
                alt="Ash Ali speaking with young people and community audience"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 460px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GivingBackHero;
