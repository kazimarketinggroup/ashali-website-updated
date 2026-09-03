"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import unlockBg from "../../../assets/home/unlock.png";

const UnlockNewsletterSection: React.FC = () => {
  

  return (
    <>
      {/* Dare to think bigger — photo + fade to black */}
      <section
        className="relative flex min-h-[260px] w-full items-center justify-center bg-black bg-cover bg-center bg-no-repeat px-4 sm:min-h-[310px] lg:min-h-[360px]"
        style={{ backgroundImage: `url(${unlockBg.src})` }}
      >
        <div className="absolute inset-0 bg-black/68" />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.38), rgba(0,0,0,0.56), rgba(0,0,0,0.72))",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center gap-4 py-12 text-center sm:py-16"
        >
          <h2 className="text-[clamp(1.55rem,4vw,2rem)] font-normal leading-tight tracking-normal text-white">
            Request a talk for your <br /> young people.
          </h2>
          <Link
            href="/contact"
            className="rounded-sm border border-white/75 bg-transparent px-5 py-2 text-[11px] font-normal text-white transition-colors hover:bg-white hover:text-black"
          >
            Work With Ash
          </Link>
        </motion.div>
      </section>

  
     
    </>
  );
};

export default UnlockNewsletterSection;
