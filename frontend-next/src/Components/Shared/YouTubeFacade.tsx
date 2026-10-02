"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Play } from "lucide-react";

interface YouTubeFacadeProps {
  videoId?: string;
  url?: string;
  title?: string;
  posterImage?: string | StaticImageData;
  className?: string;
  aspectRatio?: string;
}

export function extractYouTubeId(urlOrId?: string): string {
  if (!urlOrId) return "";
  const match = urlOrId.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/|youtube-nocookie\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  if (match && match[1]) {
    return match[1];
  }
  // If it's already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
    return urlOrId;
  }
  return urlOrId;
}

export const YouTubeFacade: React.FC<YouTubeFacadeProps> = ({
  videoId,
  url,
  title = "Play Video",
  posterImage,
  className = "",
  aspectRatio = "16/9",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const id = extractYouTubeId(videoId || url);
  const fallbackThumbnail = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";

  if (!id) {
    return null;
  }

  if (isPlaying) {
    return (
      <div
        className={`relative w-full overflow-hidden bg-black ${className}`}
        style={{ aspectRatio }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      className={`group relative w-full cursor-pointer overflow-hidden bg-neutral-900 ${className}`}
      style={{ aspectRatio }}
      onClick={() => setIsPlaying(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsPlaying(true);
        }
      }}
      aria-label={`Play ${title}`}
    >
      {/* Thumbnail poster */}
      {posterImage ? (
        typeof posterImage === "string" ? (
          <img
            src={posterImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <Image
            src={posterImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )
      ) : fallbackThumbnail ? (
        <img
          src={fallbackThumbnail}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : null}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/25" />

      {/* Play button icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-black/80 text-white shadow-2xl backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FF781D]">
          <Play size={24} className="ml-1 fill-white text-white" />
        </div>
      </div>
    </div>
  );
};

export default YouTubeFacade;
