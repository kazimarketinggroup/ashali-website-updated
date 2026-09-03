import React from "react";
import { motion } from "framer-motion";

import speakerImg from "../../../assets/justeat/IMG-20250128-WA0006 1.png";
import logoImg from "../../../assets/justeat/Layer 2.png";

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-cover bg-[position:34%_center] sm:bg-left"
      style={{ backgroundImage: `url(${speakerImg})` }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Center Logo */}
      <div className="relative z-10 flex min-h-[100svh] w-full items-center justify-center px-6">
        <motion.img
          src={logoImg}
          alt="Just Eat Logo"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-[clamp(150px,42vw,320px)] object-contain"
        />
      </div>
    </section>
  );
};

export default HeroSection;
