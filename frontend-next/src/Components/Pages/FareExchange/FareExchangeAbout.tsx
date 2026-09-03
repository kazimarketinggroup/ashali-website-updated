"use client";

import React from "react";
import { motion } from "framer-motion";

// Replace with your actual image path
import founderImg from "../../../assets/fareexchange/fare-exchange-founder.png";

const FareExchangeAbout: React.FC = () => {
  return (
    <section className="w-full bg-black text-white py-16 md:py-20 px-6 sm:px-10 lg:px-16 font-sans">
      <div className="max-w-fluid mx-auto">
        
        {/* Title: Positioned at the top left of the whole container */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-fluid-40 font-normal mb-14 tracking-tight"
        >
        Revolutionising the Travel Experience
        </motion.h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Image with specific rounding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
           <div className="rounded-[24px] overflow-hidden bg-[#1a1a1a]">
  <img
    src={founderImg.src}
    alt="Ash Ali - Co-founder of Washplus"
    className="w-full h-auto object-cover aspect-[5/3] md:aspect-[4/3] lg:aspect-[1.4/1]"
  />
</div>
          </motion.div>

          {/* Right Side: Text and Metadata */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col pt-2"
          >
            {/* Metadata with subtle grey */}
            <div className="mb-8 space-y-1">
              <p className="text-[15px] text-white/40 font-light tracking-wide">Founded 2012
</p>
              <p className="text-[15px] text-white/40 font-light tracking-wide">Exited 2016</p>
            </div>

            {/* Paragraph with precise leading and color */}
            <p className="text-[16px] sm:text-[17px] text-white/80 leading-[1.75] font-light mb-10 max-w-lg">
              Founded and launched a mobile performance based lead generation service for phone call tracking in the £9 billion taxi and private minicab sector. At the end of his journey, he successfully scaled the business and sold Fare Exchange for a seven-figure sum.
            </p>

            {/* Button: Sharp edges, small bold text */}
            <div>
              <a
                href="#"
                className="inline-block border border-white px-5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300"
              >
                Unlock Greatness
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default FareExchangeAbout;