"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Trophy, TrendingUp } from "lucide-react";

import ashAliImg from "../../../assets/home/updatedHeroImage.png";
import { brandGradientTextStyle } from "../../../constants/brandGradient";
import { useCMS } from "../../../context/CMSContext";

export const AshAliHero: React.FC = () => {
  const { cmsData } = useCMS();
  const hero = cmsData?.hero;

  const eyebrow =
    hero?.eyebrow || "INTERNATIONAL KEYNOTE SPEAKER • FOUNDER • OPERATOR • AUTHOR";
  const line1Prefix = hero?.headlineLine1Prefix ?? "I co-wrote the book on ";
  const line1Highlight = hero?.headlineLine1Highlight ?? "unfair advantage.";
  const line2Prefix = hero?.headlineLine2Prefix ?? "Now I'm using ";
  const line2Highlight1 = hero?.headlineLine2Highlight1 ?? "sales capability data";
  const line2Middle = hero?.headlineLine2Middle ?? " to explore ";
  const line2Highlight2 = hero?.headlineLine2Highlight2 ?? "what AI changes.";

  const bio =
    hero?.bio ||
    "Ash Ali co-authored the award-winning The Unfair Advantage, was Just Eat UK's first Marketing Director and is co-founder of Uhubs.ai. He brings founder experience and sales capability research to keynotes, workshops and advisory on advantage in an AI-shaped world.";
  const location =
    hero?.location ||
    "Based between London and Kuala Lumpur. Available globally for keynotes, leadership offsites and executive workshops.";
  const ctaText = hero?.ctaText || "Work with Ash";
  const ctaLink = hero?.ctaLink || "/contact";
  const ctaSecondaryText = hero?.ctaSecondaryText || "Get the Index";

  const statCard = hero?.statCard || {
    stat: "76%",
    text: "of sales professionals in the Index dataset rated their capability higher than their manager did.",
    source: "Uhubs Global Sales Capability Index 2026 • first edition • April 2026",
  };

  const credibilityCards =
    hero?.credibilityCards && hero.credibilityCards.length > 0
      ? hero.credibilityCards
      : [
          { label: "Co-author of", title: "The Unfair Advantage" },
          { label: "Winner, 2021", title: "Business Book of the Year" },
          { label: "First Marketing Director at", title: "Just Eat" },
        ];

  const heroImageSrc = hero?.heroImage || ashAliImg;
  const isCustomImage = Boolean(hero?.heroImage);

  const handleOpenIndexModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-index-modal"));
    }
  };

  return (
    <section className="overflow-hidden bg-[#101010] text-white select-none">
      <div className="mx-auto w-full max-w-fluid px-4 sm:px-6 lg:px-8">
        {/* Top: Image + Copy */}
        <div className="grid grid-cols-1 pt-4 pb-8 lg:pb-12 lg:pt-8 lg:grid-cols-12 lg:gap-10 xl:gap-12 items-center">
          {/* IMAGE — left */}
          <div
            className="
              flex items-end justify-center overflow-hidden
              h-[55vw] min-h-[260px] max-h-[440px]
              lg:h-[540px] lg:max-h-none lg:min-h-0
              xl:h-[580px]
              lg:col-span-5
            "
          >
            <div className="relative h-full w-auto max-w-[76%] sm:max-w-[62%] lg:max-w-full flex items-end justify-center">
              <Image
                src={heroImageSrc}
                alt="Ash Ali presenting keynote on unfair advantage and AI"
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 76vw, (max-width: 1024px) 50vw, 460px"
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
              py-8
              lg:col-span-7 lg:py-0 lg:pl-4 lg:self-center
            "
          >
            {/* Eyebrow */}
            <div className="flex items-center mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase">
              <span>{eyebrow}</span>
            </div>

            {/* Headline matching Image 2 */}
            <h1 className="font-semibold leading-[1.2] tracking-tight text-white mb-5 text-fluid-32">
              {line1Prefix}
              <span style={brandGradientTextStyle}>{line1Highlight}</span>
              <br />
              {line2Prefix}
              <span style={brandGradientTextStyle}>{line2Highlight1}</span>
              {line2Middle}
              <span style={brandGradientTextStyle}>{line2Highlight2}</span>
            </h1>

            {/* Subline / Bio */}
            <p className="text-gray-300 font-light leading-[1.7] tracking-wide antialiased mb-7 text-[13px] sm:text-[14px] lg:text-[15px] max-w-[580px]">
              {bio}
            </p>

            {/* Buttons: Work with Ash & Get the Index */}
            <div className="flex flex-wrap items-center gap-3 w-full">
              <Link
                href={ctaLink}
                className="min-h-[44px] inline-flex items-center justify-center px-6 py-2.5 bg-white text-black font-semibold text-[13px] rounded-[2px] transition-colors duration-150 hover:bg-gray-100 shadow-md"
              >
                {ctaText}
              </Link>

              <button
                type="button"
                onClick={handleOpenIndexModal}
                className="min-h-[44px] inline-flex items-center justify-center px-6 py-2.5 bg-transparent border border-white/20 text-white font-medium text-[13px] rounded-[2px] transition-all duration-150 hover:border-white/60 hover:bg-white/5 cursor-pointer"
              >
                {ctaSecondaryText}
              </button>
            </div>

            {/* Location Line */}
            <p className="text-xs mt-4 text-gray-400 tracking-wide font-light">
              {location}
            </p>
          </div>
        </div>

        {/* Stat Card matching Image 2 */}
        <div className="w-full mb-5">
          <div className="w-full rounded-[6px] border border-white/[0.08] bg-[#141414] p-5 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div
                className="text-5xl sm:text-6xl font-bold tracking-tight shrink-0 select-none"
                style={brandGradientTextStyle}
              >
                {statCard.stat}
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[14px] sm:text-[15px] md:text-[16px] text-white font-normal leading-snug">
                  {statCard.text}
                </p>
                <p className="mt-2 text-[11px] sm:text-[12px] text-gray-400 font-light tracking-wide">
                  {statCard.source}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Credibility Strip: 3 Cards matching Image 2 */}
        <div className="w-full pb-12 sm:pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {credibilityCards.map((card, idx) => (
              <div
                key={card.id || idx}
                className="rounded-[6px] border border-white/[0.08] bg-[#141414] p-4 sm:p-5 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              >
                <div className="h-10 w-10 shrink-0 rounded-[6px] bg-[#22160d] border border-[#d97736]/30 flex items-center justify-center text-[#d97736]">
                  {idx === 0 ? (
                    <BookOpen size={20} strokeWidth={1.8} />
                  ) : idx === 1 ? (
                    <Trophy size={20} strokeWidth={1.8} />
                  ) : (
                    <TrendingUp size={20} strokeWidth={1.8} />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-gray-400">{card.label}</p>
                  <p className="text-[13px] sm:text-[14px] font-semibold text-white truncate">
                    {card.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AshAliHero;
