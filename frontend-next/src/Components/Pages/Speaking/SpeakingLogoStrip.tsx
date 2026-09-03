"use client";

import React from "react";
import { motion } from "framer-motion";

import digitalDna from "../../../assets/speaking/digitaldna.png";
import eyLogo from "../../../assets/speaking/ey-logo.png";
import natwest from "../../../assets/speaking/Natwest_Secondary_Horizontal_RGB_NEG.png";
import salesforce from "../../../assets/speaking/salesforce.png";
import tedxRh from "../../../assets/speaking/theroyalholloway.png";
import in5Logo from "../../../assets/speaking/u5logo.png";
import weWork from "../../../assets/speaking/wework-logo-white.png";
import techLonon from "../../../assets/speaking/imperial-college-logo.png";
import kanguru from "../../../assets/speaking/warwick-event-background.png";
import triva from "../../../assets/speaking/techitalia-logo.png";
import worq from "../../../assets/speaking/worq-logo.png";
import { brandGradientTextStyle } from "../../../constants/brandGradient";

const stripLogos = [
  { src: tedxRh.src, alt: "TEDx Royal Holloway", dimensions: "w-[120px] sm:w-[130px] md:w-[145px]" },
  { src: salesforce.src, alt: "Salesforce", dimensions: "w-[50px] sm:w-[55px] md:w-[60px]" },
  { src: eyLogo.src, alt: "EY", dimensions: "w-[35px] sm:w-[40px] md:w-[42px]" },
  { src: in5Logo.src, alt: "in5", dimensions: "w-[30px] sm:w-[35px] md:w-[38px]" },
  { src: digitalDna.src, alt: "Digital DNA", dimensions: "w-[75px] sm:w-[85px] md:w-[95px]" },
  { src: weWork.src, alt: "WeWork", dimensions: "w-[65px] sm:w-[70px] md:w-[75px]" },
  { src: techLonon.src, alt: "Tech London", dimensions: "w-[60px] sm:w-[65px] md:w-[70px]" },
  { src: natwest.src, alt: "NatWest", dimensions: "w-[75px] sm:w-[85px] md:w-[90px]" },
  { src: kanguru.src, alt: "Kanguru", dimensions: "w-[75px] sm:w-[80px] md:w-[85px]" },
  { src: triva.src, alt: "Triva Global", dimensions: "w-[65px] sm:w-[70px] md:w-[75px]" },
  { src: worq.src, alt: "Worq", dimensions: "w-[55px] sm:w-[60px] md:w-[65px]" }
];

const SpeakingLogoStrip: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
    className="bg-black pt-12 pb-14 w-full select-none"
  >
    <div className="mx-auto max-w-fluid px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      {/* 1. Header Added to match image_357f83.png */}
      <h2 className="text-center text-fluid-24 font-normal tracking-wide mb-10 sm:mb-12">
        <span style={brandGradientTextStyle}>A
        Keynote Speaker</span>
      </h2>

      {/* 2. Responsive Flex Row with Dynamic Sizing Layout */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-x-6 gap-y-6 w-full max-w-6xl">
        {stripLogos.map(({ src, alt, dimensions }) => (
          <div
            key={alt}
            className={`flex items-center justify-center shrink-0 ${dimensions}`}
          >
            <img
              src={src}
              alt={alt}
              className="
                h-auto
                w-full
                object-contain
                opacity-90
              "
              draggable="false"
            />
          </div>
        ))}
      </div>

    </div>
  </motion.div>
);

export default SpeakingLogoStrip;