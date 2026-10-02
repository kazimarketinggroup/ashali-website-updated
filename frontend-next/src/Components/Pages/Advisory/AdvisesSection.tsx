"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  Rocket, 
  BrainCircuit, 
  Mic, 
  TrendingUp, 
  LogOut 
} from 'lucide-react';

interface TargetCardProps {
  icon: React.ReactNode;
  text: string;
}

/*
  Reusable premium matte dark card component.

  Below `sm` the cards sit two-up in a grid, so `aspect-square` is dropped: at
  ~160px wide a square card is too short for four lines of copy and the text
  spills out of the frame. A min-height keeps the cards even instead.
*/
const TargetCard: React.FC<TargetCardProps> = ({ icon, text }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
      }}
      className="bg-[#1a1a1a] rounded-[6px] p-4 sm:p-8 flex flex-col items-center justify-center text-center min-h-[168px] sm:min-h-0 sm:aspect-square border border-white/[0.02] shadow-[0_4px_25px_rgba(0,0,0,0.35)] select-none w-full sm:max-w-[200px]"
    >
      {/* Icon Wrapper matching the subtle grey-white line-art profile */}
      <div className="text-gray-300 mb-4 sm:mb-5">
        {icon}
      </div>

      {/* Card Text Content with fluid multi-line balancing */}
      <p className="text-white text-[13px] sm:text-[14px] font-normal leading-[1.45] tracking-wide sm:max-w-[150px] whitespace-pre-line">
        {text}
      </p>
    </motion.div>
  );
};

export const AdvisesSection: React.FC = () => {
  // Split data into top (3 cards) and bottom (4 cards)
  const topRowTargets = [
    {
      icon: <Users size={32} strokeWidth={1.2} />,
      text: "Positioning and strategic narrative"
    },
    {
      icon: <UserCheck size={32} strokeWidth={1.2} />,
      text: "Growth and go-to-market choices"
    },
    {
      icon: <Rocket size={32} strokeWidth={1.2} />,
      text: "Founder and CEO judgement"
    }
  ];

  const bottomRowTargets = [
    {
      icon: <BrainCircuit size={32} strokeWidth={1.2} />,
      text: "AI era competitive advantage"
    },
    {
      icon: <Mic size={32} strokeWidth={1.2} />,
      text: "Strategic partnerships and commercial leverage"
    },
    {
      icon: <TrendingUp size={32} strokeWidth={1.2} />,
      text: "Sales transformation and human capability"
    },
    {
      icon: <LogOut size={32} strokeWidth={1.2} />,
      text: "Exit thinking and optionality"
    }
  ];

  return (
    <section className="w-full bg-black py-16 md:py-20 flex flex-col items-center justify-center select-text">
      <div className="w-full max-w-fluid mx-auto flex flex-col items-center px-4">
        
        {/* Main Section Header displaying exact orange accent typography alignment */}
        <h2 className="text-white text-fluid-24 font-normal tracking-tight text-center mb-12 sm:mb-16">
          Where Ash <span className="text-[#d97736]">advises.</span>
        </h2>

        {/* Outer Motion Wrapper for Stagger Effect */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
          className="flex flex-col items-center gap-4 lg:gap-5 w-full max-w-5xl"
        >
          {/* Top Row — 3 Cards Centered */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-4 lg:gap-5 w-full">
            {topRowTargets.map((target, index) => (
              <TargetCard 
                key={`top-${index}`}
                icon={target.icon}
                text={target.text}
              />
            ))}
          </div>

          {/* Bottom Row — 4 Cards Centered */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-4 lg:gap-5 w-full">
            {bottomRowTargets.map((target, index) => (
              <TargetCard 
                key={`bottom-${index}`}
                icon={target.icon}
                text={target.text}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AdvisesSection;