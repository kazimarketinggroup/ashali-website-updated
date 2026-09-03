"use client";

import React from "react";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";

import {
  BRAND_GRADIENT_LR,
  brandGradientTextStyle,
} from "../../../constants/brandGradient";

// Images
import uhubsImg from "../../../assets/impact/uhubImage.png";
import unfairImg from "../../../assets/impact/unfairImage.png";
import washplusImg from "../../../assets/impact/washplusImage.png";
import fareImg from "../../../assets/impact/fareExchangeImage.png";
import justeatImg from "../../../assets/impact/justEatImage.png";

// Logos
import uhubLogo from "../../../assets/impact/uhubLogo.png";
import unfairLogo from "../../../assets/impact/unfairLogo.png";
import washplusLogo from "../../../assets/impact/washlogo.png";
import fareLogo from "../../../assets/impact/fareExchaneLogo.png";
import justeatLogo from "../../../assets/impact/justEatLogo.png";

// Motion Link
const MotionLink = motion(Link);

/*
  Card Data

  `name` drives the alt text on both images in each cell. Without it every card
  rendered alt="Project" and alt="logo", which tells a screen reader — and a
  crawler — nothing about which venture the card links to.
*/
const cardData = [
  { name: "The Unfair Advantage", img: unfairImg.src, logo: unfairLogo.src, url: "/portfolio" },
  { name: "Fare Exchange", img: fareImg.src, logo: fareLogo.src, url: "/portfolio/fare-exchange" },
  { name: "Just Eat", img: justeatImg.src, logo: justeatLogo.src, url: "/portfolio/just-eat" },
  { name: "WashPlus", img: washplusImg.src, logo: washplusLogo.src, url: "/portfolio/wash-plus" },
];

// Animation
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const ImpactSection: React.FC = () => {
  return (
    <section className="w-full bg-[#0d0d0d] text-white">

      {/* ── BIO BLOCK ── */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="max-w-3xl mx-auto px-6 py-16 text-center"
      >
        <p className="text-base leading-relaxed text-gray-200 font-light md:text-lg">
          <span style={brandGradientTextStyle} className="font-semibold">
            Ash Ali
          </span>
          , Just Eat UK's First Marketing Director, Played A Key Role In Its
          $2.44B IPO. A Serial Entrepreneur And Investor, He Co-Founded Uhubs, A
          Fast Growing Startup Helping Revenue Leaders Identify Top Performers.
        </p>

        <div className="mt-8">
          <button className="border border-gray-500 text-white text-xs px-6 py-2 tracking-widest hover:border-white transition duration-300">
            Learn More
          </button>
        </div>
      </motion.div>

      {/* ── GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
{/* Extra Card (optional if you want 5 items visually) */}
        <GridCell
          name="Uhubs"
          img={uhubsImg.src}
          logo={uhubLogo.src}
          url="/portfolio/uhubs"
          delay={0.25}
        />
        {cardData.map((card, idx) => (
          <GridCell
            key={idx}
            name={card.name}
            img={card.img}
            logo={card.logo}
            url={card.url}
            delay={idx * 0.05}
          />
        ))}

        

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative bg-[#111] flex items-center justify-center h-[260px] sm:h-[280px] md:h-[300px] lg:h-[340px]"
        >
          <button className="border border-white/60 text-white text-xs px-6 py-2 tracking-widest hover:bg-white hover:text-black transition duration-300">
            Public Speaking
          </button>
        </motion.div>

      </div>

      {/* ── INSPIRE CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: easeOut }}
        className="relative bg-black pb-0"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-12 text-center md:py-16">
          <h2 className="text-base font-medium text-white sm:text-lg md:text-xl">
            Inspire your Audience
          </h2>

          <div className="mt-6 md:mt-7">
            <span
              className="inline-block p-px"
              style={{ background: BRAND_GRADIENT_LR }}
            >
              <Link
                href="/contact"
                className="block bg-black px-8 py-2.5 text-xs font-bold text-white hover:bg-neutral-950 transition"
              >
                Enquire Now
              </Link>
            </span>
          </div>
        </div>

        <div
          className="h-px w-full"
          style={{ background: BRAND_GRADIENT_LR }}
        />
      </motion.div>
    </section>
  );
};

export default ImpactSection;

// ── GRID CELL ──
const GridCell: React.FC<{
  name: string;
  img: string;
  logo: string;
  url: string;
  delay?: number;
}> = ({ name, img, logo, url, delay = 0 }) => (
  <MotionLink
    href={url}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="relative overflow-hidden group h-[260px] sm:h-[280px] md:h-[300px] lg:h-[340px] w-full flex items-center justify-center"
  >
    {/* Background Image */}
    {/*
      Decorative: the logo image below carries the accessible name for this
      card, so labelling the background photo too would make a screen reader
      announce the same venture twice.
    */}
    <img
      src={img}
      alt=""
      className="absolute inset-0 w-full h-full object-cover object-center transition duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/55 group-hover:bg-black/30 transition duration-300" />

    {/* Center Logo */}
    <div className="relative z-10 flex items-center justify-center w-full h-full">
      <img
        src={logo}
        alt={`${name} logo`}
        className="max-w-[70px] sm:max-w-[90px] md:max-w-[100px] w-full h-auto object-contain transition duration-300 group-hover:scale-105"
      />
    </div>
  </MotionLink>
);