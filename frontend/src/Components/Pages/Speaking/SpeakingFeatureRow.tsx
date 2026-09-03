import React from "react";
import { motion, easeOut } from "framer-motion";

import GradientBorderLink from "./GradientBorderLink";

export type SpeakingFeatureRowProps = {
  title: React.ReactNode;
  logoSrc: string;
  logoAlt: string;
  location: string;
  flag: string;
  body: string;
  mediaSrc?: string;
  videoUrl?: string;
  mediaAlt: string;
  mediaLeft?: boolean;
  videoPlaceholder?: boolean;
  delay?: number;
};

const SpeakingFeatureRow: React.FC<SpeakingFeatureRowProps> = ({
  title,
  logoSrc,
  logoAlt,
  location,
  flag,
  body,
  mediaSrc,
  videoUrl,
  mediaAlt,
  mediaLeft = false,
  videoPlaceholder = false,
  delay = 0,
}) => {
  const mediaBlock = (
    <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
      {videoUrl ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={videoUrl}
          title={mediaAlt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : videoPlaceholder ? (
        <div className="flex h-full min-h-[140px] items-center justify-center px-4 text-center text-sm font-medium text-white/50 sm:min-h-[160px] sm:text-base">
          Ash Ali Tedx Video
        </div>
      ) : mediaSrc ? (
        <img
          src={mediaSrc}
          alt={mediaAlt}
          className="absolute left-1/2 top-1/2 z-0 block min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
        />
      ) : null}
    </div>
  );

  const textBlock = (
    <div className="flex flex-col justify-center py-1 lg:py-3">
      <div className="mb-2">{title}</div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <img src={logoSrc} alt={logoAlt} className="h-6 w-auto max-w-[100px] object-contain object-left sm:h-7 sm:max-w-[120px]" />
        <span className="inline-flex items-center gap-2 text-sm text-white/85">
          <span className="text-lg leading-none" aria-hidden>
            {flag}
          </span>
          {location}
        </span>
      </div>
      <p className="text-base leading-relaxed text-white/90">{body}</p>
      <div className="mt-4">
        <GradientBorderLink to="/contact">Enquire</GradientBorderLink>
      </div>
    </div>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: easeOut, delay }}
      className="mx-auto max-w-fluid px-6 py-6 md:py-8 lg:py-9"
    >
      <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-2 lg:gap-8">
        {mediaLeft ? (
          <>
            {mediaBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {mediaBlock}
          </>
        )}
      </div>
    </motion.article>
  );
};

export default SpeakingFeatureRow;
