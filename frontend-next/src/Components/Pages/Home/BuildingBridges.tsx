"use client";

import React from "react";
import { motion } from "framer-motion";

import bridgesImg from "../../../assets/home/hAbout1.png";
import Link from "next/link";

const BuildingBridges: React.FC = () => {
  return (
    <section className="overflow-hidden bg-[#101010] px-5 py-16 md:py-20 text-white md:px-10">
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          items-center
          gap-12
          lg:flex-row
          lg:gap-16
        "
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-[520px] lg:w-[48%] lg:max-w-none"
        >
          <div
            className="
              relative
              mx-auto
              w-full
              max-w-[470px]
              pt-4
              pr-4
            "
          >
            <span className="absolute right-0 top-0 h-[calc(100%-22px)] w-[calc(100%-22px)] bg-[#ff7417]" />
            <img
              src={bridgesImg.src}
              alt="Ash Ali speaking on stage in Southeast Asia"
              className="
                relative
                z-10
                aspect-[1.4/1]
                w-full
                object-cover
              "
            />
          </div>
        </motion.div>

        <motion.div
  initial={{ opacity: 0, x: 30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="
    flex
    w-full
    max-w-[560px]
    flex-col
    justify-center
    py-2
    text-center
    lg:w-[52%]
    lg:text-left
  "
>
  {/* Region Label */}
  <p className="mb-6 text-[12px] text-white/70">
    • Malaysia & Southeast Asia
  </p>

  {/* Heading */}
  <h2
    className="
      text-fluid-30 font-medium leading-[1.25] max-w-[650px] tracking-tight text-white/95
    "
  >
    A Global Founder&apos;s Perspective,
    <br />
    On The Ground In{" "}
    <span className="text-[#19b5a5]">
      Malaysia & SEA.
    </span>
  </h2>

  {/* Description */}
  <div
    className="
      mt-8
      space-y-6
      text-[14px]
      leading-[1.8]
      text-white/80
      md:text-[15px]
    "
  >
    <p>
      A region at an inflection point: young talent,
      fast AI adoption and rising regional ambition.
    </p>

    <p>
      Based between London and Kuala Lumpur, Ash
      brings a global founder/operator perspective to
      organisations and communities across the UK,
      Malaysia and Southeast Asia speaking, advising
      and supporting the region&apos;s next generation
      of founders and leaders.
    </p>
  </div>

  {/* Buttons */}
  <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:justify-start justify-center">
   <Link href="/malaysia-sea" className="border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/10">
      Read More
    </Link>

    <Link href="/contact" className="border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/10">
      Work with Ash
    </Link>
  </div>
</motion.div>
      </div>
    </section>
  );
};

export default BuildingBridges;
