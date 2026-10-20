"use client";

import React from "react";
import { motion } from "framer-motion";

import Image from "next/image";
import bridgesImg from "../../../assets/home/hAbout1.webp";
import Link from "next/link";
import { useCMS } from "../../../context/CMSContext";

const BuildingBridges: React.FC = () => {
  const { cmsData } = useCMS();
  const data = cmsData?.buildingBridges;

  const regionLabel = data?.regionLabel || "• Malaysia & Southeast Asia";
  const headlinePart1 =
    data?.headlinePart1 || "A global founder's perspective,\non the ground in";
  const headlineHighlight = data?.headlineHighlight || "Malaysia and SEA.";
  const paragraphs = data?.paragraphs || [
    "A region at an inflection point: young talent, fast AI adoption and rising regional ambition.",
    "Based between London and Kuala Lumpur, Ash brings a global founder/operator perspective to organisations and communities across the UK, Malaysia and Southeast Asia: speaking, advising and supporting the region's next generation of founders and leaders.",
  ];
  const primaryButtonLabel = data?.primaryButtonLabel || "Read More";
  const primaryButtonLink = data?.primaryButtonLink || "/malaysia-sea";
  const secondaryButtonLabel = data?.secondaryButtonLabel || "Work with Ash";
  const secondaryButtonLink = data?.secondaryButtonLink || "/contact";
  const imageAlt = data?.imageAlt || "Ash Ali speaking on stage in Southeast Asia";
  return (
    <section className="overflow-hidden bg-[#101010] py-16 md:py-24 text-white">
      <div className="mx-auto flex max-w-fluid px-4 sm:px-6 lg:px-8 flex-col items-center gap-12 lg:flex-row lg:gap-16">
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
            <Image
              src={bridgesImg}
              alt={imageAlt}
              width={470}
              height={336}
              sizes="(max-width: 768px) 100vw, 470px"
              loading="lazy"
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
    {regionLabel}
  </p>

  {/* Heading */}
  <h2
    className="
      text-fluid-30 font-medium leading-[1.25] max-w-[650px] tracking-tight text-white/95
    "
  >
    {headlinePart1}{" "}
    <span className="text-[#19b5a5]">
      {headlineHighlight}
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
    {paragraphs.map((p, idx) => (
      <p key={idx}>{p}</p>
    ))}
  </div>

  {/* Buttons */}
  <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:justify-start justify-center">
    <Link
      href={primaryButtonLink}
      className="min-h-[44px] inline-flex items-center justify-center rounded-[2px] border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/10"
    >
      {primaryButtonLabel}
    </Link>

    <Link
      href={secondaryButtonLink}
      className="min-h-[44px] inline-flex items-center justify-center rounded-[2px] border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/10"
    >
      {secondaryButtonLabel}
    </Link>
  </div>
</motion.div>
      </div>
    </section>
  );
};

export default BuildingBridges;
