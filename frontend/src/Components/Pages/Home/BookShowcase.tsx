import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Globe, GraduationCap, LayoutGrid } from 'lucide-react';

// Assets
import bgBooks from "../../../assets/home/books-bg.png";
import allCovers from "../../../assets/home/updatedImage.png";

const tags = [
  { icon: Award,         label: "Business Book of the Year" },
  { icon: Globe,         label: "Translated Wordwide" },
  { icon: GraduationCap, label: "Used in MBA & university courses" },
  { icon: LayoutGrid,    label: "The MILES framework" },
];

const BookShowcase: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center px-4 py-16 sm:px-6 md:py-20 md:px-24"
      style={{ backgroundImage: `url(${bgBooks})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/90" />

      <div className="relative z-10 mx-auto flex max-w-fluid flex-col items-center gap-12 lg:flex-row lg:gap-16">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full lg:w-1/2"
        >
          {/* Eyebrow */}
          <div className="flex items-center mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase">
            <span>The Unfair Advantage</span>
          </div>

          {/* Headline */}
          <h2 className="text-fluid-30 font-semibold tracking-tight text-white leading-[1.2]">
            <span className="bg-gradient-to-r from-[#2dd4bf] to-[#0e9aa8] bg-clip-text text-transparent">
              The award-winning book
            </span>{" "}
            challenging the myth that success is only about hard work.
          </h2>

          {/* Body */}
          <p className="mt-6 max-w-[560px] text-[13px] leading-[1.9] text-white/75 sm:text-sm">
            Success Is Shaped By Context, Timing, Access, Skills, Mindset, Networks And Knowing How To
            Use What You Already Have. The Book Has Become Core IP Behind Ash's Talks, Frameworks And
            Global Work.
          </p>

          {/* Tags */}
          <div className="mt-8 flex flex-col items-start gap-3 max-w-[540px]">
            {tags.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/[0.05] border border-white/10 text-white/85 text-[12px] rounded-[2px]"
              >
                <Icon size={15} strokeWidth={1.8} className="shrink-0 text-white/80" />
                {label}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/unfair-advantage"
              className="px-5 py-2.5 bg-white text-black font-semibold text-[12px] rounded-[2px] transition-colors duration-150 hover:bg-gray-100 shadow-md text-center"
            >
              Explore the book
            </Link>
            <a
            target="_blank"
              href="https://www.theunfairacademy.com/"
              className="px-5 py-2.5 bg-transparent border border-white/20 text-white font-medium text-[12px] rounded-[2px] transition-all duration-150 hover:border-white/60 hover:bg-white/5 text-center"
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
              className="w-full max-w-[500px] object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:scale-[1.02]"
            />

            {/* Caption below the book covers */}
            <p className="mt-6 max-w-[440px] text-center text-[15px] italic leading-snug text-white/85">
              The Unfair Advantage has now been translated
              <br className="hidden sm:block" />
              into 8 languages worldwide
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BookShowcase;