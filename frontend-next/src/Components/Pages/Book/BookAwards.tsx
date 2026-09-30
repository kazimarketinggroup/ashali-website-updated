"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";

import awardsLogo from "../../../assets/book/businessbookAwardLogo.png";
// import bookImage from "../../../assets/book/bookimage.png";

export const BookAwards: React.FC = () => {
  // Common smooth easing preset
  const easeOutTransition = { duration: 0.65, ease: "easeOut" as const };

  const accolades = [
    { id: 1, text: "Business Book of the Year 2021, The Business Book Awards", icon: <Trophy className="text-[#d97736]" size={18} strokeWidth={1.5} /> },
    { id: 2, text: "Best Startup / Scaleup Book Award 2021", icon: <Award className="text-[#008080]" size={18} strokeWidth={1.5} /> },
  ];

  const talkTopics = [
    {
      title: "The Unfair Advantage in the age of AI",
      desc: "How the book's core ideas apply now that AI is rewriting the rules of advantage."
    },
    {
      title: "Using your story as an advantage",
      desc: "Turning your background, journey and identity into a genuine edge."
    },
    {
      title: "Social mobility, entrepreneurship and opportunity",
      desc: "Why talent is everywhere but access isn't and what to do about it."
    },
    {
      title: "Hidden forces behind success",
      desc: "The unseen factors that shape who wins, and how to use them deliberately."
    }
  ];

  return (
    <section className="bg-black px-6  text-white select-none">
      <div className="mx-auto max-w-5xl flex flex-col gap-16 md:gap-20">

        {/* ================= ── TOP AWARDS BANNER ── ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={easeOutTransition}
          className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12"
        >
          {/* Left Block: Award Logo */}
          <div className="flex-shrink-0 max-w-[280px] sm:max-w-[320px] w-full">
            <img
              src={awardsLogo.src}
              alt="The Business Book Awards in partnership with Pathway Group"
              className="w-full h-auto object-contain filter brightness-110"
              draggable="false"
            />
          </div>

          {/* Center Vertical Divider Line (Visible on Desktop Only) */}
          <div className="hidden md:block w-px h-20 bg-white/20 self-center" aria-hidden="true" />

          {/* Right Block: Elegant Icon-Based Accolade List */}
          <div className="flex-grow flex flex-col justify-center items-start gap-4 text-left w-full max-w-md select-text">
            {accolades.map((item) => (
              <div key={item.id} className="flex items-center gap-4 group">
                <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                  {item.icon}
                </div>
                <span className="text-[13.5px] sm:text-[14.5px] font-normal tracking-wide text-gray-200 group-hover:text-white transition-colors duration-150">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>


        {/* ================= ── BOTTOM TALKS & VIDEO VIEW MATRIX ── ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-stretch w-full">
          
          {/* Left Block: Structured Headline & Core Talk Focus Groups */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={easeOutTransition}
            className="md:col-span-6 flex flex-col items-start text-left select-text"
          >
            {/* Minimalist Header Accent Ribbon */}
            <div className="flex items-center mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-500 uppercase">
              <span>Talks based on the book</span>
            </div>

            {/* Micro-Tone Highlight Sub-Title */}
            <h2 className="text-fluid-32 font-bold tracking-tight text-white mb-8 leading-tight">
              Bring <span className="text-[#14b8a6]">the ideas</span> <span className="text-[#65735b]">to your stage.</span>
            </h2>

            {/* Generated Topics Hierarchy */}
            <div className="space-y-6 w-full max-w-lg">
              {talkTopics.map((topic, i) => (
                <div key={i} className="flex flex-col items-start group">
                  <h3 className="text-[14px] sm:text-[15px] font-bold tracking-wide text-gray-100 group-hover:text-[#14b8a6] transition-colors duration-150 mb-1 leading-snug">
                    {topic.title}
                  </h3>
                  <p className="text-gray-400 font-light text-[12.5px] sm:text-[13px] leading-relaxed tracking-wide antialiased">
                    {topic.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Block: Pure Video Display Window */}
         <motion.div
  initial={{ opacity: 0, x: 20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={easeOutTransition}
  whileHover={{ y: -4 }}
  className="md:col-span-6 w-full"
>
  <div className="relative overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] bg-black aspect-video">
    <iframe
      className="absolute inset-0 w-full h-full"
      src="https://www.youtube.com/embed/RGbCR_pq4_A?rel=0"
      title="Ash Ali Speaking"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  </div>
</motion.div>

        </div>

      </div>
    </section>
  );
};

export default BookAwards;