import React from "react";

import image1 from "../../../assets/malaysia/ash-malaysia-stage.png";
import image2 from "../../../assets/malaysia/unfair-advantage-malaysia-cover.png";
import image3 from "../../../assets/malaysia/malaysia-event-photo.png";
import { brandGradientTextStyle } from "../../../constants/brandGradient";


interface PhotoItem {
  id: number;
  src: string;
  alt: string;
  aspectClass: string;
}

const photos: PhotoItem[] = [
  {
    id: 1,
    src: image1.src,
    alt: "Group photo at a Kuala Lumpur community event",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: 2,
    src: image2.src,
    alt: "Ash Ali with attendees holding a book",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 3,
    src: image3.src,
    alt: "Panel discussion on stage",
    aspectClass: "aspect-[4/3]",
  },
];

const OnTheGround: React.FC = () => {
  return (
    <section className="overflow-hidden bg-[#0d0d0d] py-16 md:py-24">
      <div className="mx-auto max-w-fluid px-4 sm:px-6 lg:px-8">

        {/* TOP META */}
        <div className="mb-6 flex items-center gap-2">
          <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            Regional proof
          </span>
        </div>

        {/* HEADER */}
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-fluid-34 font-normal leading-[1.22] tracking-tight text-white">
              On the ground <span style={brandGradientTextStyle}>across the region.</span>
            </h2>
          </div>

          <p className="max-w-xs text-[14px] sm:text-[15px] font-light leading-relaxed text-gray-300 lg:max-w-[280px] lg:pt-1">
            Kuala Lumpur and Malaysia events, university talks,
            community sessions and local partnerships.
          </p>
        </div>

        {/* PHOTOS */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 items-end">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="overflow-hidden rounded-xl bg-neutral-800"
            >
              <div >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OnTheGround;