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
    <section className="overflow-hidden bg-[#0d0d0d] px-6 py-16 md:py-20 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-fluid">

        {/* TOP META */}
        <div className="mb-6 flex items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
            Regional proof
          </span>
        </div>

        {/* HEADER */}
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-fluid-32 font-medium leading-[1.2] tracking-tight text-white">
              On the ground <span style={brandGradientTextStyle}>across the region.</span>
            </h2>
          </div>

          <p className="max-w-xs text-[13.5px] font-light leading-[1.65] text-gray-400 lg:max-w-[260px] lg:pt-1">
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