"use client";

import React from "react";
import { motion } from "framer-motion";

import dashboardGridImg from "../../../assets/uhubs/dashboardgrid.png";

const HowItWorks: React.FC = () => {
  return (
    <section className="w-full bg-black text-white py-16 md:py-20 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-fluid mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col space-y-6"
        >
          <div className="space-y-3">
            <h3 className="text-gray-400 text-sm md:text-base font-light tracking-wide">
              How It Works
            </h3>

            <p className="text-sm md:text-base lg:text-lg font-normal leading-relaxed text-white/75">
              The Complete Skill Development Partner For Modern Revenue Teams.  
              Establish Your Competency Baseline Using Science To Discover  
              Which Attributes Your A-Players Have And Your New-Joiners  
              Need With The Pulse.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button className="border border-white/60 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300">
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="rounded-xl overflow-hidden shadow-xl bg-[#0f0f0f] p-1.5">
            <img
              src={dashboardGridImg.src}
              alt="Dashboard Analytics Grid"
              className="w-full h-auto object-contain max-w-[520px] lg:max-w-[580px]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;