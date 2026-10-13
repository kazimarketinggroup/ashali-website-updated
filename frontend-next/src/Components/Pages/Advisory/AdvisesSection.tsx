"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  UserCheck, 
  BrainCircuit, 
  Building2, 
  BarChart3, 
  ShieldCheck 
} from 'lucide-react';

interface TargetCardProps {
  icon: React.ReactNode;
  text: string;
}

/*
  Reusable premium matte dark card component.
*/
const TargetCard: React.FC<TargetCardProps> = ({ icon, text }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
      }}
      className="bg-[#1a1a1a] rounded-[6px] p-4 sm:p-7 flex flex-col items-center justify-center text-center min-h-[160px] sm:min-h-0 sm:aspect-square border border-white/[0.04] shadow-[0_4px_25px_rgba(0,0,0,0.35)] select-none w-full sm:max-w-[200px] hover:border-white/10 transition-colors"
    >
      {/* Icon Wrapper matching the subtle grey-white line-art profile */}
      <div className="text-gray-300 mb-4 sm:mb-5">
        {icon}
      </div>

      {/* Card Text Content with fluid multi-line balancing */}
      <p className="text-white text-[13px] sm:text-[13.5px] font-normal leading-[1.45] tracking-wide sm:max-w-[150px] whitespace-pre-line">
        {text}
      </p>
    </motion.div>
  );
};

export const AdvisesSection: React.FC = () => {
  // Split data into top (3 cards) and bottom (4 cards)
  const topRowTargets = [
    {
      icon: <Users size={30} strokeWidth={1.2} />,
      text: "Positioning and strategic narrative"
    },
    {
      icon: <TrendingUp size={30} strokeWidth={1.2} />,
      text: "Go-to-market and commercial execution"
    },
    {
      icon: <UserCheck size={30} strokeWidth={1.2} />,
      text: "Founder-to-CEO transitions"
    }
  ];

  const bottomRowTargets = [
    {
      icon: <BrainCircuit size={30} strokeWidth={1.2} />,
      text: "AI and commercial technology"
    },
    {
      icon: <Building2 size={30} strokeWidth={1.2} />,
      text: "Scaling organisations and team capability"
    },
    {
      icon: <BarChart3 size={30} strokeWidth={1.2} />,
      text: "Value creation and commercial capability"
    },
    {
      icon: <ShieldCheck size={30} strokeWidth={1.2} />,
      text: "Preserving unfair advantages"
    }
  ];

  return (
    <section className="w-full bg-black py-16 md:py-20 flex flex-col items-center justify-center select-text">
      <div className="w-full max-w-fluid mx-auto flex flex-col items-center px-4">
        
        {/* Main Section Header */}
        <h2 className="text-white text-fluid-26 font-medium tracking-tight text-center mb-12 sm:mb-16">
          Where Ash advises
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