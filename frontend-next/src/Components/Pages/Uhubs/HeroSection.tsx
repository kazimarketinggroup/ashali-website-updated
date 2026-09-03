"use client";

import React from "react";
import { motion } from "framer-motion";

import speakerImg from "../../../assets/uhubs/hero.png";
import logoImg from "../../../assets/uhubs/logo.png";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black">

      {/* Background Image (stable across devices) */}
      {/* Decorative: the Uhubs logo below carries this hero's accessible name. */}
      <img
        src={speakerImg.src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Center Logo */}
      <div className="relative z-10 flex min-h-[100svh] w-full items-center justify-center px-6">
        <motion.img
          src={logoImg.src}
          alt="Logo"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-[clamp(140px,40vw,300px)] object-contain"
        />
      </div>

    </section>
  );
};

export default HeroSection;
