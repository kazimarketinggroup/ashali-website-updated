import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Globe, GraduationCap, LayoutGrid } from 'lucide-react';

// Assets
import allCovers from "../../../assets/home/updatedImage.png";

const tags = [
  { icon: Award,         label: "Business Book of the Year" },
  { icon: Globe,         label: "Translated Worldwide" },
  { icon: GraduationCap, label: "Used in MBA & university courses" },
  { icon: LayoutGrid,    label: "The MILES framework" },
];

const BookShowcase: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      <div className="relative z-10 mx-auto flex max-w-fluid px-4 sm:px-6 lg:px-8 flex-col items-center gap-12 lg:flex-row lg:gap-16">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full lg:w-1/2"
        >
          {/* Eyebrow */}
          <div className="flex items-center mb-3 text-[11px] sm:text-[12px] font-medium tracking-[0.2em] text-gray-400 uppercase">
            <span>The Unfair Advantage</span>
          </div>

          {/* Headline */}
          <h2 className="text-fluid-34 font-semibold tracking-tight text-white leading-[1.25]">
            <span className="bg-gradient-to-r from-[#2dd4bf] to-[#0e9aa8] bg-clip-text text-transparent">
              The award-winning book
            </span>{" "}
            challenging the myth that success is only about hard work.
          </h2>

          {/* Body */}
          <p className="mt-6 max-w-[560px] text-[14px] sm:text-[15px] leading-[1.8] text-white/80">
            Success is shaped by context, timing, access, skills, mindset, networks and knowing how to
            use what you already have. The book has become core IP behind Ash's talks, frameworks and
            global work.
          </p>

          {/* Tags */}
          <div className="mt-8 flex flex-col items-start gap-2.5 max-w-[540px]">
            {tags.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-3 px-4 py-2.5 bg-white/[0.04] border border-white/10 text-white/90 text-[13px] sm:text-[13.5px] rounded-[3px] transition-colors hover:border-white/20"
              >
                <Icon size={16} strokeWidth={1.8} className="shrink-0 text-white/80" />
                {label}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/unfair-advantage"
              className="min-h-[46px] inline-flex items-center justify-center px-6 py-3 bg-white text-black font-semibold text-[13px] sm:text-[13.5px] rounded-[3px] transition-colors duration-150 hover:bg-gray-100 shadow-md text-center"
            >
              Explore the book
            </Link>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.theunfairacademy.com/"
              className="min-h-[46px] inline-flex items-center justify-center px-6 py-3 bg-transparent border border-white/25 text-white font-medium text-[13px] sm:text-[13.5px] rounded-[3px] transition-all duration-150 hover:border-white/60 hover:bg-white/5 text-center"
            >
              The Unfair Academy
            </a>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex w-full justify-center lg:w-1/2"
        >
          <div className="relative flex flex-col items-center">
            <img
              src={allCovers}
              alt="International editions of The Unfair Advantage"
              className="w-full max-w-[520px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:scale-[1.02]"
            />

            {/* Caption below the book covers */}
            <p className="mt-6 max-w-[460px] text-center text-[14px] sm:text-[15px] italic leading-snug text-white/80">
              The Unfair Advantage has now been translated into 8 languages worldwide
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BookShowcase;