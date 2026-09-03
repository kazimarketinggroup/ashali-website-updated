"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Replace these with your actual image paths
import imgBeach from "../../../assets/home/sunrise.png";
import imgWinter from "../../../assets/home/winter.png";
import imgDinner from "../../../assets/home/dinner.png";
import imgPickleball from "../../../assets/home/sports.png";
import imgCity from "../../../assets/home/dubai.png";
import Link from "next/link";

const BeyondBusiness: React.FC = () => {
  return (
    <section className="bg-black py-16 md:py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight">
            <span className="text-[#d98324]">Beyond</span>{" "}
            <span className="text-[#4a6b4a]">Business</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-normal tracking-wide">
            Ash's interests include travel, world cuisine, pickleball, youth entrepreneurship, emerging markets and projects that help people unlock opportunity.
          </p>
        </motion.div>

        {/* Masonry-style Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          
          {/* Column 1: Beach (Full Height) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="h-[450px] lg:h-[500px]"
          >
            <img src={imgBeach.src} alt="Beach" className="w-full h-full object-cover rounded-sm" />
          </motion.div>

          {/* Column 2: Winter & Dinner (Stacked) */}
          <div className="flex flex-col gap-4 h-[450px] lg:h-[500px]">
            <motion.div whileHover={{ scale: 1.02 }} className="h-1/2">
              <img src={imgWinter.src} alt="Winter" className="w-full h-full object-cover rounded-sm" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="h-1/2">
              <img src={imgDinner.src} alt="Dinner" className="w-full h-full object-cover rounded-sm" />
            </motion.div>
          </div>

          {/* Column 3: Pickleball (Full Height) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="h-[450px] lg:h-[500px]"
          >
            <img src={imgPickleball.src} alt="Pickleball" className="w-full h-full object-cover rounded-sm" />
          </motion.div>

          {/* Column 4: City/Towers (Full Height) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="h-[450px] lg:h-[500px]"
          >
            <img src={imgCity.src} alt="City" className="w-full h-full object-cover rounded-sm" />
          </motion.div>

        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link href="/contact"><motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6", color: "#000" }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-12 py-3.5 rounded-sm text-sm font-normal tracking-widest transition-all duration-300 shadow-lg"
          >
            Book Ash to Speak
          </motion.button></Link>
        </div>

      </div>
    </section>
  );
};

export default BeyondBusiness;
