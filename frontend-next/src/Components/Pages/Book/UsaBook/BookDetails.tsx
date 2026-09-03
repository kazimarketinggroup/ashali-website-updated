"use client";

import React from "react";
import { motion } from "framer-motion";

import bookImg from "../../../../assets/bookusa/unfair-advantage-us-cover.png";
import awardsLogo from "../../../../assets/bookusa/business-book-awards-logo.png";
import icon1 from "../../../../assets/bookusa/icon1.png";
import icon2 from "../../../../assets/bookusa/icon2.png";
import icon3 from "../../../../assets/bookusa/icon3.png";

const awards = [
  { label: "Business Book Of The Year 2021", icon: icon1.src },
  { label: "Best Startup/Scaleup Book Award 2021", icon: icon2.src },
  { label: "Business Book Of The Year 2022 Finalist", icon: icon3.src },
];

const BookDetails: React.FC = () => {
  return (
    <section className="w-full bg-[#0b0b0b] text-white py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* ───── TOP SECTION ───── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-6 md:gap-8 items-center"
        >
          {/* Book Image */}
          <div className="flex justify-center md:justify-start">
            <div className="bg-[#1a1a1a] p-3 rounded-2xl 
                            w-full max-w-[320px] h-[260px] sm:h-[300px] 
                            md:w-[360px] md:h-[320px] 
                            flex items-center justify-center">
              <img
                src={bookImg.src}
                alt="The Unfair Advantage Book"
                className="h-full object-contain"
              />
            </div>
          </div>

          {/* Book Text */}
          <div className="md:-ml-4">
            <h2 className="text-[18px] font-semibold mb-3">
              Book Details
            </h2>

            <p className="text-[14px] text-white/60 leading-[1.8] mb-3">
              The winner of the UK's Business Book of the Year Award for 2021,
              this is a groundbreaking exposé of the myths behind startup success
              and a blueprint for harnessing the things that really matter.
            </p>

            <p className="text-[14px] text-white/60 leading-[1.8] mb-3">
              What is the difference between a startup that makes it, and one
              that crashes and burns? Behind every story of success is an unfair
              advantage.
            </p>

            <p className="text-[14px] text-white/60 leading-[1.8]">
              But an Unfair Advantage is not just about your parents' wealth or
              who you know: anyone can have one. An Unfair Advantage is the
              element that gives you an edge over your competition.
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10 my-10" />

        {/* ───── BOTTOM SECTION ───── */}
       <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="grid md:grid-cols-2 gap-4 md:gap-6 items-center"
>
  {/* Awards Logo */}
  <div className="flex justify-center md:justify-start">
    <img
      src={awardsLogo.src}
      alt="The Business Book Awards"
      className="h-20 md:h-24 object-contain opacity-95"
    />
  </div>

  {/* Awards List */}
  <div className="flex items-stretch md:-ml-6">
    {/* Vertical Divider */}
    <div className="w-px self-stretch min-h-[120px] bg-white/20 mr-3 shrink-0" />

    <ul className="space-y-3">
      {awards.map((award, i) => (
        <li key={i} className="flex items-start sm:items-center gap-3">
          <img
            src={award.icon}
            alt=""
            className="w-[22px] h-[22px] shrink-0"
          />
          <span className="text-[14px] text-white/80">
            {award.label}
          </span>
        </li>
      ))}
    </ul>
  </div>
</motion.div>

      </div>
    </section>
  );
};

export default BookDetails;