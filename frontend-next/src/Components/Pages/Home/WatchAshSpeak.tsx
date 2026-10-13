"use client";

import React from "react";
import { YouTubeFacade } from "../../Shared/YouTubeFacade";

export const WatchAshSpeak: React.FC = () => {
  return (
    <section className="bg-black text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
      <div className="mx-auto max-w-5xl flex flex-col items-center">
        {/* Title matching Image 3 */}
        <h2 className="text-white text-fluid-28 font-semibold tracking-tight text-center mb-8 sm:mb-12">
          Watch Ash speak
        </h2>

        {/* Video Player */}
        <div className="w-full rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-white/10">
          <YouTubeFacade
            url="https://www.youtube.com/watch?v=rMB2lFUMXpY"
            title="What is your unfair advantage? | Ash Ali | TEDxRoyalHolloway"
            aspectRatio="16/9"
          />
        </div>
      </div>
    </section>
  );
};

export default WatchAshSpeak;
