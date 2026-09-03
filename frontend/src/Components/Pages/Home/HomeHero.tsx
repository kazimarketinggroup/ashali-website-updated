import React from "react";
import { motion } from "framer-motion"

// Ensure this path matches your folder structure
import bgImage from "../../../assets/home/homebg.png";

import { brandGradientTextStyle } from "../../../constants/brandGradient";

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative flex h-screen w-full items-center justify-end overflow-hidden bg-cover bg-left-center bg-no-repeat pr-[6%]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Optional Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[480px] text-center"
      >
        <p className="m-0 text-[clamp(1.05rem,2.2vw,1.5rem)] font-normal leading-[1.7] tracking-tight text-white">
          &quot;One of the biggest{" "}
          <span className="font-medium" style={brandGradientTextStyle}>
            {" "}
            &apos;hacks&apos;
          </span>{" "}
          or shortcuts to{" "}
          <span className="font-medium" style={brandGradientTextStyle}>
            personal growth
          </span>{" "}
          and{" "}
          <span className="font-medium" style={brandGradientTextStyle}>
            development
          </span>{" "}
          is via those we spend our time with.&quot;
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;