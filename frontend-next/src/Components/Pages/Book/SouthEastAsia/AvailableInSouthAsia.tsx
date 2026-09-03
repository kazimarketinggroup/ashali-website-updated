"use client";

import React from "react";
import { motion } from "framer-motion";

import bookeisLogo from "../../../../assets/southeastasia/bookkess.png";
import litLogo from "../../../../assets/southeastasia/litbooks.png";
import kinkuniyaLogo from "../../../../assets/southeastasia/kinokuniya.png";
import daraazLogo from "../../../../assets/southeastasia/daraz.png";

interface StoreLink {
  name: string;
  logo: string;
  url: string;
}

const stores: StoreLink[] = [
  { name: "BookEis", logo: bookeisLogo.src, url: "https://bookkess.com" },
  { name: "LitBooks", logo: litLogo.src, url: "https://litbooks.com" },
  { name: "Kinokuniya", logo: kinkuniyaLogo.src, url: "https://kinokuniya.com" },
  { name: "Daraaz", logo: daraazLogo.src, url: "https://daraz.com" },
];

const AvailableInSouthAsia: React.FC = () => {
  return (
    <section className="w-full bg-[#0b0b0b] py-16 md:py-20 px-4 sm:px-6 text-white">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-lg md:text-xl font-medium tracking-wide text-white/90 mb-10"
        >
         Tersedia Di Malaysia, Indonesia dan Pakistan
        </motion.h1>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
          {stores.map((store, i) => (
            <motion.a
              key={store.name}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group flex items-center justify-center 
                         bg-[#151515] border border-white/[0.06] 
                         rounded-xl 
                         px-6 py-6
                         hover:border-white/20 
                         hover:bg-[#1b1b1b]
                         transition-all duration-300"
            >
              <img
                src={store.logo}
                alt={store.name}
                className="h-8 md:h-10 w-auto object-contain 
                           opacity-80 group-hover:opacity-100 
                           transition duration-300"
              />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AvailableInSouthAsia;