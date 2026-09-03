"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import { BRAND_GRADIENT_LR, brandGradientTextStyle } from "../../../constants/brandGradient";

import aiStrategyImg from "../../../assets/home/card1.jpg";
import founderImg from "../../../assets/home/card2.jpg";
import diagnosticsImg from "../../../assets/home/card3.jpg";
import leadershipImg from "../../../assets/home/card4.jpg";
import adoptionImg from "../../../assets/home/card5.jpg";
import marketImg from "../../../assets/home/card6.jpg";

type CardItem = {
  title: React.ReactNode;
  img: string;
  url: string;
  position?: string;
};

const cards: CardItem[] = [
  { title: <>AI Strategy<br />Workshops</>, img: aiStrategyImg.src, url: "/contact" },
  { title: <>Founder Growth<br />Advisory</>, img: founderImg.src, url: "/contact" },
  { title: <>Sales performance<br />diagnostics</>, img: diagnosticsImg.src, url: "/contact" },
  { title: <>Leadership<br />offsites</>, img: leadershipImg.src, url: "/contact" },
  { title: <>AI adoption and<br />team enablement</>, img: adoptionImg.src, url: "/contact" },
  { title: <>Market entry and<br />ecosystem building</>, img: marketImg.src, url: "/contact" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Section: React.FC = () => {
  return (
    <section className="bg-black px-4 py-16 md:py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1040px]">

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center max-w-[760px] mx-auto"
        >
          <h2 className="text-[clamp(1.65rem,3.6vw,2.35rem)] font-normal">
            <span style={brandGradientTextStyle}>Helping Leaders</span> Build For The AI Era
          </h2>

          <p className="mt-7 text-[13px] leading-[1.85] text-white/80 sm:text-sm">
            Ash works with founders, leadership teams and organisations exploring how AI changes strategy, sales,
            operations, capability and competitive advantage. His focus is practical: where AI creates leverage, where it
            creates noise, and how teams can use it to perform better.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Link
                href={card.url}
                className="group block p-[2px]"
                style={{ background: BRAND_GRADIENT_LR }}
              >
                <div className="relative aspect-square overflow-hidden bg-[#111]">

                  {/* Image */}
                  <img
                    src={card.img}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/45 transition-colors duration-300 group-hover:bg-black/60" />

                  {/* Content Wrapper */}
                  <div className="absolute inset-0 flex flex-col px-5 text-center">
                    <div className="flex flex-1 items-end justify-center pb-8 transition-all duration-500 ease-out group-hover:items-center group-hover:pb-0">
                      <h3 className="text-[1.05rem] font-normal leading-snug text-white transition-transform duration-500 ease-out group-hover:-translate-y-4">
                        {card.title}
                      </h3>
                    </div>

                    <div className="flex translate-y-4 justify-center pb-7 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="border border-white/30 bg-white px-5 py-2 text-[11px] font-normal uppercase tracking-[0.15em] text-black">
                        Book Ash to Speak
                      </span>
                    </div>

                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Section;
