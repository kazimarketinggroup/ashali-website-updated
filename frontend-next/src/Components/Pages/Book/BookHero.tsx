"use client";

import React from "react";
import Image from "next/image";

import heroImage from "../../../assets/book/heroImage.png";
import aliAvatar from "../../../assets/book/ali.png";
import derekAvatar from "../../../assets/book/derek.png";

const cardBase =
  "rounded-xl border border-white/10 bg-black/75 backdrop-blur-md shadow-[0_18px_40px_rgba(0,0,0,0.5)]";

const BookHero: React.FC = () => {
  return (
    <section className="relative w-full bg-black text-white">
      {/* Hero Image Container */}
      <div className="relative w-full h-[240px] sm:min-h-[min(90vh,780px)] overflow-hidden">
        <Image
          src={heroImage}
          alt="The Unfair Advantage book"
          priority
          fetchPriority="high"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-black/40" />
      </div>

      {/* Cards below image on mobile */}
      <div className="mx-auto flex max-w-[520px] flex-col gap-3 px-4 py-5 sm:hidden">
        {/* Card 1 */}
        <div className={`${cardBase} px-3 py-3`}>
          <p className="text-[11px] leading-relaxed text-white/90">
            &ldquo;A powerful way to think about success as an entrepreneur.&rdquo;
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <Image
              src={aliAvatar}
              alt="Ali Abdaal"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border border-white/20 object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-white leading-tight">Ali Abdaal</p>
              <p className="text-[9px] text-white/55 leading-snug mt-0.5">
                Productivity YouTuber, Podcaster &amp; Ex-Doctor
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className={`${cardBase} px-3 py-3`}>
          <p className="text-[11px] leading-relaxed text-white/90">
            &ldquo;Crucial business advice that you won&apos;t get anywhere else.&rdquo;
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <Image
              src={derekAvatar}
              alt="Derek Sivers"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border border-white/20 object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-white leading-tight">Derek Sivers</p>
              <p className="text-[9px] text-white/55 leading-snug mt-0.5">
                Entrepreneur &amp; Author of &apos;Anything You Want&apos;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookHero;
