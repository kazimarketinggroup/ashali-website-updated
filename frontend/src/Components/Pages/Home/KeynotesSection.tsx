import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import brain from '../../../assets/home/brain.png';
import flower from '../../../assets/home/flower.png';
import book from '../../../assets/home/book-open.png';
import medel from '../../../assets/home/medal-one.png';
import world from '../../../assets/home/world.png';

const keynotes = [
  {
    title: "The Unfair Advantage",
    description: "Why Success Is Not A Level Playing Field",
    icon: book,
    isImage: true,
  },
  {
    title: "AI-Native Thinking",
    description: "How Leaders Can Adapt Before They Are Forced To",
    icon: brain,
    isImage: true,
  },
  {
    title: "From Potential To Performance",
    description: "Building High-Performing Teams That Execute",
    icon: medel,
    isImage: true,
  },
  {
    title: "Founders' Growth Mindset",
    description: "Resilience, Reframes And Real-World Entrepreneurship",
    icon: flower,
    isImage: true,
  },
  {
    title: "The Future Workforce",
    description: "Emerging Markets, Youth & The Future Of Work",
    icon: world,
    isImage: true,
  },
];

const KeynotesSection: React.FC = () => {
  return (
    <section className="overflow-hidden bg-black px-4 py-16 md:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-fluid">

        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-light tracking-tight text-white">
            <span className="text-[#d98324]">Keynotes</span> That Shift How People Think
          </h2>
        </div>

        {/* Cards */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {keynotes.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ y: -6 }}
              className="group flex min-h-[280px] flex-col items-center justify-center border border-white/5 bg-[#171717] p-5 text-center transition-all duration-300 hover:border-white/10 hover:bg-[#202020]"
            >

              {/* Icon */}
              <div className="mb-5 flex h-14 items-center justify-center text-gray-300 opacity-80 transition-transform duration-300 group-hover:scale-105">
                {typeof item.icon === "string" ? (
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-10 w-10 object-contain"
                  />
                ) : (
                  item.icon
                )}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-[15px] font-semibold leading-snug text-white">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[12px] leading-[1.7] text-gray-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link to="/speaking">
            <motion.button
              whileHover={{
                scale: 1.04,
                backgroundColor: "#ffffff",
                color: "#000000",
              }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex h-[42px] items-center justify-center border border-white/30 px-7 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300"
            >
              Learn More
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default KeynotesSection;
