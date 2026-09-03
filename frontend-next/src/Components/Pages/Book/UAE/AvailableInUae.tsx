"use client";

import React from "react";
import { motion } from "framer-motion";

import amazonLogo from "../../../../assets/bookusa/amazon-logo.png";
import noonLogo from "../../../../assets/uae/noon-logo.png";
import dubaiStoreLogo from "../../../../assets/uae/dubai-store-logo.png";

interface StoreLink {
  name: string;
  logo: string;
  url: string;
}

const stores: StoreLink[] = [
  { name: "Amazon", logo: amazonLogo.src, url: "https://amazon.ae" },
  { name: "Noon", logo: noonLogo.src, url: "https://noon.com" },
  { name: "Dubai Store", logo: dubaiStoreLogo.src, url: "https://dubaistore.com" },
];

const AvailableInUae: React.FC = () => {
  return (
    <section
      className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-white"
      style={{ backgroundColor: "#0d0d0d" }}
      dir="rtl"
    >
      <div className="mx-auto max-w-2xl">

        {/* Title — 2 lines centered */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-lg sm:text-xl md:text-2xl font-normal text-white/90 mb-8 sm:mb-10 leading-relaxed"
        >
          متوفر في دولة الإمارات العربية
          <br />
          المتحدة
        </motion.h1>

        {/*
          Logo row — 3 items centered.

          The tiles used to be a fixed 160px each in a non-wrapping row, which
          came to ~500px and was clipped on any phone. They now wrap two-up on
          small screens at 150px and return to the original 160px from `sm`.
        */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
          {stores.map((store, i) => (
            <motion.a
              key={store.name}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-[150px] sm:w-[160px] h-[64px] sm:h-[72px] items-center justify-center px-3 py-3 sm:px-5 sm:py-4 bg-[#1a1a1a] border border-white/[0.08] hover:border-white/20 transition duration-300 rounded-xl"
            >
              <img
                src={store.logo}
                alt={store.name}
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AvailableInUae;