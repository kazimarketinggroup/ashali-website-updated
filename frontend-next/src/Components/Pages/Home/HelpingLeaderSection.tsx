"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { BRAND_GRADIENT_LR } from "../../../constants/brandGradient";
import { useCMS } from "../../../context/CMSContext";

import speakingBg from "../../../assets/home/speaking.webp";
import advisoryBg from "../../../assets/home/advisory.webp";
import mediaBg from "../../../assets/home/media.webp";

const defaultCards = [
  {
    id: "hl-1",
    title: "KEYNOTES",
    description:
      "Shift how people see advantage, leadership and opportunity in an AI shaped world. Story led, practical and tailored to the room.",
    buttonLabel: "Explore Keynotes",
    bgImage: "",
    to: "/speaking",
  },
  {
    id: "hl-2",
    title: "EXECUTIVE WORKSHOPS",
    description:
      "Turn the ideas into decisions, priorities and a practical 90 day direction for your leadership team.",
    buttonLabel: "Explore Workshops",
    bgImage: "",
    to: "/workshops",
  },
  {
    id: "hl-3",
    title: "ADVISORY",
    description:
      "Direct strategic advisory for founders, boards and executive leadership teams navigating the AI shift.",
    buttonLabel: "Explore Advisory",
    bgImage: "",
    to: "/advisory",
  },
];

const fallbackStaticImgs: StaticImageData[] = [speakingBg, advisoryBg, mediaBg];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export const HelpingLeadersSection: React.FC = () => {
  const { cmsData } = useCMS();
  const hl = cmsData?.helpingLeaders;

  const eyebrow = hl?.eyebrow || "What Ash Helps With";
  const highlightWord = hl?.highlightWord || "Helping leaders";
  const titlePart2 = hl?.titlePart2 || "build for the AI era";
  const description =
    hl?.description ||
    "Technology is becoming more accessible. Judgement, context, capability, relationships and execution are not. Ash helps leaders understand what AI changes, what remains deeply human and where their organisation can build an advantage that competitors cannot simply copy.";

  const cards = hl?.cards && hl.cards.length > 0 ? hl.cards : defaultCards;

  return (
    <section className="w-full bg-black py-16 md:py-20 px-6 sm:px-10 font-sans select-none">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
        {/* Eyebrow + Headline Block */}
        <div className="text-center flex flex-col items-center gap-5 select-text">
          <div className="flex items-center -mb-2 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-500 uppercase">
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-white text-fluid-32 font-semibold leading-tight tracking-tight">
            <span className="text-[#d97736]">{highlightWord}</span> {titlePart2}
          </h2>
          <p className="text-gray-400 text-[13px] sm:text-[14px] leading-[1.85] tracking-wide max-w-2xl text-center font-light antialiased">
            {description}
          </p>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {cards.map((card, idx) => (
            <ServiceCard
              key={card.id || card.title || idx}
              card={card}
              fallbackImg={fallbackStaticImgs[idx % fallbackStaticImgs.length]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  card: {
    title: string;
    description: string;
    buttonLabel: string;
    bgImage: string | StaticImageData;
    to: string;
  };
  fallbackImg: StaticImageData;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ card, fallbackImg }) => {
  const imgSrc = card.bgImage || fallbackImg;
  const isCustomString = typeof imgSrc === "string";

  return (
    <motion.div
      className="group relative rounded-lg p-[1px] transition-transform duration-300 hover:scale-[1.015] w-full aspect-square flex flex-col overflow-hidden"
      style={{ background: BRAND_GRADIENT_LR }}
    >
      <div className="w-full h-full bg-[#080808] rounded-[7px] overflow-hidden relative flex flex-col items-center p-4 sm:p-6 flex-grow">
        {/* Background Image Asset Track */}
        <Image
          src={imgSrc}
          alt=""
          fill
          unoptimized={isCustomString}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          className="object-cover object-center transition-all duration-700 opacity-40 group-hover:opacity-15 group-hover:scale-105 pointer-events-none"
        />

        {/* Centered Matte Masking Dark Layer */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] group-hover:bg-black/70 transition-colors duration-300" />

        {/* Card Elements Core Container */}
        <div className="relative z-10 flex flex-col items-center justify-between h-full w-full flex-grow text-center">
          {/* Section 1: Title Header */}
          <h3 className="text-white text-[16px] sm:text-[18px] font-bold tracking-tight transform transition-all duration-500 ease-[0.25,1,0.5,1] translate-y-[95px] sm:translate-y-[105px] md:translate-y-[110px] lg:translate-y-[90px] xl:translate-y-[105px] group-hover:translate-y-0 uppercase">
            {card.title}
          </h3>

          {/* Section 2: Sliding Reveal Panel */}
          <div className="flex flex-col items-center justify-end w-full h-full pt-8 transform opacity-0 scale-95 translate-y-6 transition-all duration-500 ease-[0.25,1,0.5,1] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0">
            <p className="text-gray-300 text-[11.5px] sm:text-[12px] md:text-[12.5px] lg:text-[11px] xl:text-[12.5px] leading-relaxed font-light max-w-[210px] mb-4 sm:mb-5 select-text antialiased">
              {card.description}
            </p>

            <div className="w-full pb-1">
              <Link
                href={card.to || "/contact"}
                className="w-full max-w-[170px] mx-auto py-2 bg-white text-black font-semibold text-[11px] rounded-[2px] transition-all duration-200 hover:bg-neutral-100 active:scale-[0.98] shadow-md block text-center uppercase tracking-wide"
              >
                {card.buttonLabel || "Learn More"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HelpingLeadersSection;