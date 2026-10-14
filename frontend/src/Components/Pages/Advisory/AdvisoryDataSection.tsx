import React from 'react';
import { motion } from 'framer-motion';

interface DataCard {
  stat: string;
  headline: string;
  insight: string;
}

const dataCards: DataCard[] = [
  {
    stat: "76%",
    headline: "of tech & enabled B2B firms benchmarked their capability higher than their revenue growth rate.",
    insight: "Focusing on execution and alignment rather than tooling alone is where the inflection point sits."
  },
  {
    stat: "4.6×",
    headline: "execution and alignment predict outcomes far more than tech stack, market tailwinds or team pedigree.",
    insight: "Commercial capability is the single strongest predictor of revenue outcomes."
  },
  {
    stat: "1.6×",
    headline: "velocity of go-to-market process vs benchmark leaders. Focus on commercial capability accelerates outcomes.",
    insight: "Closing the execution gap is where commercial acceleration happens."
  }
];

export const AdvisoryDataSection: React.FC = () => {
  return (
    <section className="w-full bg-black py-16 md:py-24 select-text">
      <div className="w-full max-w-fluid mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14">
          <h2 className="text-white text-fluid-34 font-normal tracking-tight">
            What the data is telling leaders right now
          </h2>
          <p className="mt-2.5 text-[11px] sm:text-[12px] font-semibold tracking-[0.22em] text-gray-400 uppercase">
            Data from the Global Sales Capability Index 2026
          </p>
        </div>

        {/* 3 Stat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {dataCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#121212] border border-white/[0.04] rounded-lg p-6 sm:p-7 flex flex-col justify-between shadow-xl text-left hover:border-white/10 transition-colors duration-200"
            >
              <div>
                <span className="block text-[#FF781D] text-3xl sm:text-4xl md:text-[42px] font-bold leading-none mb-4 tracking-tight">
                  {card.stat}
                </span>
                <p className="text-white text-[14px] sm:text-[15px] font-semibold leading-snug mb-5 tracking-wide">
                  {card.headline}
                </p>
              </div>

              <p className="text-gray-300 text-[13px] sm:text-[13.5px] font-light leading-relaxed border-t border-white/[0.06] pt-4">
                {card.insight}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AdvisoryDataSection;
