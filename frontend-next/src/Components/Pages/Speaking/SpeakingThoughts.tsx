"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";

import { brandGradientTextStyle } from "../../../constants/brandGradient";

import angellaAvatar from "../../../assets/speaking/angella.png";
import cyrusAvatar from "../../../assets/speaking/husabi.png";
import freddieAvatar from "../../../assets/speaking/monk.png";
import eyLogo from "../../../assets/speaking/ey-logo.png";
import salesforceLogo from "../../../assets/speaking/salesforce.png";
import techItaliaLogo from "../../../assets/speaking/techitalia-logo.png";

type Thought = {
  quote: string;
  person: string;
  logoSrc: string;
  logoAlt: string;
  avatarSrc: string;
  avatarAlt: string;
};

const thoughts: Thought[] = [
  {
    quote:
      "Ash delivered an outstanding keynote at our Innova event, sharing valuable insights from Just Eat. Professional, insightful, and a pleasure to work with many thanks!",
    person: "Freddie Monk",
    logoSrc: eyLogo.src,
    logoAlt: "EY",
    avatarSrc: freddieAvatar.src,
    avatarAlt: "Freddie Monk",
  },
  {
    quote:
      "Ash Ali's talk at Salesforce Tower was exceptional, sharing his experience as an entrepreneur and marketing director at Just Eat. His insights on the Unfair Advantage made it one of our best events.",
    person: "Cyrus Hessabi",
    logoSrc: salesforceLogo.src,
    logoAlt: "Salesforce",
    avatarSrc: cyrusAvatar.src,
    avatarAlt: "Cyrus Hessabi",
  },
  {
    quote:
      "I've attended many entrepreneur events, but Ash's talk at TechItalia was by far one of the most authentic, inspiring, and engaging.",
    person: "Andrea Angella",
    logoSrc: techItaliaLogo.src,
    logoAlt: "TechItalia",
    avatarSrc: angellaAvatar.src,
    avatarAlt: "Andrea Angella",
  },
];

const SpeakingThoughts: React.FC = () => (
  <section className="border-t border-white/10 bg-black px-4 sm:px-6 md:px-10 lg:px-20 py-16 md:py-20">
    <div className="mx-auto max-w-fluid">
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="mb-4 text-xl font-bold leading-tight sm:text-2xl"
        style={brandGradientTextStyle}
      >
        Feedback...
      </motion.h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {thoughts.map((item, idx) => (
          <motion.article
            key={item.person}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: easeOut, delay: idx * 0.06 }}
            className="rounded-2xl border border-white/10 bg-[#0B0B0B] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
          >
            <p className="min-h-[100px] text-sm leading-relaxed text-white/90 sm:min-h-[110px] sm:text-[0.9375rem]">&quot;{item.quote}&quot;</p>
            <div className="mt-4 flex items-center gap-3">
              <img
                src={item.avatarSrc}
                alt={item.avatarAlt}
                className="h-12 w-12 rounded-full border border-white/20 object-cover object-center sm:h-14 sm:w-14"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-tight text-white sm:text-base">{item.person}</p>
                <img src={item.logoSrc} alt={item.logoAlt} className="mt-1 h-8 w-auto max-w-[110px] object-contain object-left" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default SpeakingThoughts;
