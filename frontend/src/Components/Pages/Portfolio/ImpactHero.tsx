import React from "react";
import { motion } from "framer-motion";
import impactBg from "../../../assets/impact/bright-satellite-explodes-majestic-sunset-heating-temperature-atmosphere-generated-by-ai 1.png"; // your shooting star image

const ImpactHero: React.FC = () => {
  return (
    <section
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${impactBg})` }}
    >
      {/* Subtle dark vignette overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <h1 className="text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Impact
        </h1>
      </motion.div>
    </section>
  );
};

export default ImpactHero;
