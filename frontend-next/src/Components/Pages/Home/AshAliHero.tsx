"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import ashAliImg from "../../../assets/home/updatedHeroImage.png";
import { brandGradientTextStyle } from "../../../constants/brandGradient";
import { useCMS } from "../../../context/CMSContext";

const AshAliHero: React.FC = () => {
  const { cmsData } = useCMS();
  const hero = cmsData?.hero;

  const eyebrow = hero?.eyebrow || "International keynote speaker • Founder • Operator • Author";
  const headline = hero?.headline || "Find Your";
  const highlightWord = hero?.highlightWord || "Unfair Advantage";
  const headlinePart2 = hero?.headlinePart2 || "In An AI Shaped World.";
  const bio = hero?.bio || "Ash Ali helps leaders and organisations turn AI disruption into sharper strategy, stronger human capability and practical competitive advantage. He brings 25+ years of experience building technology businesses, including serving as Just Eat UK's first Marketing Director, co-authoring The Unfair Advantage and co-founding Uhubs.ai.";
  const location = hero?.location || "Based between London and Kuala Lumpur. Available globally for keynotes, leadership offsites and executive workshops.";
  const ctaText = hero?.ctaText || "Work with Ash";
  const ctaLink = hero?.ctaLink || "/contact";
  const secondaryButtons = hero?.secondaryButtons || [
    { to: "/speaking", label: "Keynotes" },
    { to: "/advisory", label: "Advisory" },
    { to: "/workshops", label: "Workshops" },
  ];

  const heroImageSrc = hero?.heroImage || ashAliImg;
  const isCustomImage = Boolean(hero?.heroImage);

  return (
    <section className="overflow-hidden bg-[#101010] text-white select-none">
      <div className="mx-auto w-full max-w-fluid px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 pt-4 pb-10 lg:pb-16 lg:pt-10 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          {/* IMAGE — left */}
          <div
            className="
              flex items-end justify-center overflow-hidden
              h-[55vw] min-h-[240px] max-h-[420px]
              lg:h-[520px] lg:max-h-none lg:min-h-0
              xl:h-[560px]
              lg:col-span-5
            "
          >
            <div className="relative h-full w-auto max-w-[72%] sm:max-w-[60%] lg:max-w-full flex items-end justify-center">
              <Image
                src={heroImageSrc}
                alt="Ash Ali pointing up and presenting"
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 72vw, (max-width: 1024px) 50vw, 450px"
                width={isCustomImage ? 500 : undefined}
                height={isCustomImage ? 600 : undefined}
                unoptimized={isCustomImage}
                className="
                  object-contain object-bottom filter brightness-105
                  h-full w-auto
                "
                draggable={false}
              />
            </div>
          </div>

          {/* COPY — right */}
          <div
            className="
              flex flex-col justify-center items-start text-left
              py-10
              lg:col-span-7 lg:py-0 lg:pl-4 lg:self-center
            "
          >
            {/* Eyebrow */}
            <div className="flex items-center mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase">
              <span>{eyebrow}</span>
            </div>

            {/* Headline */}
            <h1 className="
              font-semibold leading-[1.2] tracking-tight text-white mb-5
              text-fluid-34
            ">
              {headline} <span style={brandGradientTextStyle}>{highlightWord}</span>
              <br />
              {headlinePart2}
            </h1>

            {/* Body */}
            <p className="
              text-gray-400 font-light leading-[1.65] tracking-wide antialiased mb-8
              text-[13px] sm:text-[14px] lg:text-[15px] max-w-[540px]
            ">
              {bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 w-full">
              <Link
                href={ctaLink}
                className="min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 bg-white text-black font-semibold text-[12px] rounded-[2px] transition-colors duration-150 hover:bg-gray-100 shadow-md"
              >
                {ctaText}
              </Link>

              {secondaryButtons.map((btn) => (
                <Link
                  key={btn.label}
                  href={btn.to}
                  className="min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 bg-transparent border border-white/20 text-white font-medium text-[12px] rounded-[2px] transition-all duration-150 hover:border-white/60 hover:bg-white/5"
                >
                  {btn.label}
                </Link>
              ))}
            </div>
            <p className="text-xs mt-4 text-gray-400">{location}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AshAliHero;
