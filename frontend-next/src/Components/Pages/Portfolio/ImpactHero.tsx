"use client";

import React from "react";
import { motion } from "framer-motion";
import impactBg from "../../../assets/impact/impact-hero-background.png"; // your shooting star image

/*
  Note on `impactBg.src` below: Next's image loader returns a StaticImageData
  object, not a URL string like Vite did. Interpolating the object straight
  into a template literal produces `url([object Object])` and the hero renders
  with no background at all. Every CSS background built from an imported image
  needs the `.src` property.
*/
const ImpactHero: React.FC = () => {
  return (
    <section
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${impactBg.src})` }}
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
