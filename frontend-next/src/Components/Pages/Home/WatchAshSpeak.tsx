"use client";

import React from "react";
import { YouTubeFacade } from "../../Shared/YouTubeFacade";
import { useCMS } from "../../../context/CMSContext";

export const WatchAshSpeak: React.FC = () => {
  const { cmsData } = useCMS();
  const data = cmsData?.watchAshSpeak;
  const title = data?.title || "Watch Ash speak";
  const url = data?.youtubeUrl || "https://www.youtube.com/watch?v=rMB2lFUMXpY";
  const videoTitle =
    data?.videoTitle ||
    "What is your unfair advantage? | Ash Ali | TEDxRoyalHolloway";

  return (
    <section className="bg-black text-white py-16 md:py-24 border-t border-white/[0.06]">
      <div className="mx-auto max-w-fluid px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Title matching Image 3 */}
        <h2 className="text-white text-fluid-34 font-semibold tracking-tight text-center mb-8 sm:mb-12">
          {title}
        </h2>

        {/* Video Player */}
        <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-white/10">
          <YouTubeFacade
            url={url}
            title={videoTitle}
            aspectRatio="16/9"
          />
        </div>
      </div>
    </section>
  );
};

export default WatchAshSpeak;
