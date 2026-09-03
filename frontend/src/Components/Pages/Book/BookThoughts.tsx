import React from "react";
import { motion, easeOut } from "framer-motion";

import byron from "../../../assets/book/byron.png";
import bianca from "../../../assets/book/bianca.png";
import daniyel from "../../../assets/book/daniyel.png";
import dion from "../../../assets/book/dion.png";
import rune from "../../../assets/book/rune.png";
import mark from "../../../assets/book/mark.png";

import { brandGradientTextStyle } from "../../../constants/brandGradient";
// import { Link } from "react-router-dom";
// const GRAD = "linear-gradient(90deg, #FF781D, #008080)";
type Thought = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const thoughts: Thought[] = [
  {
    quote:
      "What a masterful and thought-provoking book! a must for every entrepreneur regardless of the stage of your journey",
    name: "Byron Cole",
    role: "Entrepreneur, Author & Speaker",
    avatar: byron,
  },
  {
    quote:
      "A snappy, thought-provoking book that will help anyone make something of their own unfair advantages",
    name: "Bianca Miller-Cole",
    role: "Entrepreneur & Author of 'Self Made'",
    avatar: bianca,
  },
  {
    quote: "A fast-paced read with excellent insights from a remarkable entrepreneurial story.",
    name: "Daniel Priestley",
    role: "author of The Entrepreneur Revolution",
    avatar: daniyel,
  },
  {
    quote:
      "Breaks down how people from all walks of life and backgrounds can achieve unfair advantages... An indispensable handbook.",
    name: "Dion McKenzie",
    role: "Founder of Colorintech",
    avatar: dion,
  },
  {
    quote:
      "In a no-nonsense approach, this book shows you the truth that business and life aren't fair, and goes into the methods and practices to let you take full advantage of your unique skills and assets",
    name: "Rune Sovndahl",
    role: "Founder, Fantastic Services",
    avatar: rune,
  },
  {
    quote:
      "Inspirational... if you are looking to get into entrepreneurship this book provides the practical advice to get you started.",
    name: "Mark Martin MBE",
    role: "Founder, UK Black Tech",
    avatar: mark,
  },
];

const BookThoughts: React.FC = () => {
  return (
    <section className="bg-black px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-20 text-white">
      <div className="mx-auto max-w-fluid rounded-md border border-white/10 bg-[#0f0f0f] p-6 sm:p-8">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="text-xl font-bold sm:text-2xl"
          style={brandGradientTextStyle}
        >
          Thoughts...
        </motion.h2>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {thoughts.map((t, idx) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: easeOut, delay: idx * 0.04 }}
              className="rounded-2xl border border-white/10 bg-[#0B0B0B] p-5 shadow-[0_18px_38px_rgba(0,0,0,0.4)]"
            >
              <p className="min-h-[78px] text-sm leading-relaxed text-white/90">“{t.quote}”</p>
              <div className="mt-5 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full border border-white/15 object-cover" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/60">{t.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
       
      </div>
       
    </section>
  );
};

export default BookThoughts;
