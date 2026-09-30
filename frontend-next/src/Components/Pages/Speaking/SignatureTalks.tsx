"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { brandGradientTextStyle } from '../../../constants/brandGradient';

interface TalkItem {
  id: string;
  title: string;
  subTitle?: string;
  description: string;
}

export const SignatureTalks: React.FC = () => {
  // Complete text parsed exactly from your reference assets image_364a39.png and image_3649ff.png
  const talksData: TalkItem[] = [
    {
      id: 'talk-1',
      title: 'The Unfair Advantage in the Age of AI',
      subTitle: 'How leaders identify the advantages they already possess, and use AI to amplify rather than erase them.',
      description: 'How leaders identify the advantages they already possess and use AI to amplify rather than erase them.'
    },
    {
      id: 'talk-2',
      title: 'The Human Advantage: Leading When AI Changes the Work',
      subTitle: 'What must stay human when machines become faster, cheaper and more capable.',
      description: 'AI can increase output while quietly weakening judgement, curiosity and ownership. Ash explores the capabilities leaders must protect and strengthen and how to build teams that use AI confidently without outsourcing their thinking.'
    },
    {
      id: 'talk-3',
      title: 'From Outsider to Operator: Building Advantage Without the Usual Access',
      subTitle: 'A candid founder story about background, reinvention, judgement and creating opportunity before anyone gives permission.',
      description: 'Raised in inner-city Birmingham, Ash left college twice, taught himself digital skills and went on to help build one of the UK\'s defining technology growth stories. This is not an overnight-success tale. It is a practical account of curiosity, constraint, access, mistakes and learning how to turn difference into momentum.'
    },
    {
      id: 'talk-4',
      title: 'From Inner-City Birmingham to Global Entrepreneurship',
      subTitle: '',
      description: "A founder's story of access, reinvention and opportunity: inspiring without losing its commercial edge."
    },
    {
      id: 'talk-5',
      title: 'Building Advantage in Uncertain Times',
      subTitle:'',
      description: 'How founders and leaders create durable advantage when the ground keeps shifting.'
    }
  ];

  // State keeping track of which talk index is currently selected
  const [activeTab, setActiveTab] = useState<string>(talksData[0].id);
  const activeTalk = talksData.find((talk) => talk.id === activeTab) || talksData[0];

  return (
    <section className="w-full bg-black py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center justify-center select-none">
      <div className="w-full max-w-fluid mx-auto">
        
        {/* Header containing exact brand focus accent coloration */}
        <h2 className="text-white text-fluid-26 font-medium tracking-tight mb-10 text-left">
          <span style={brandGradientTextStyle}>Signature</span> talks
        </h2>

        {/* Dynamic Split Content Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch w-full">
          
          {/* ================= LEFT SIDE: SELECTION TABS ================= */}
          <div className="md:col-span-6 flex flex-col gap-3 w-full">
            {talksData.map((talk) => {
              const isSelected = talk.id === activeTab;
              return (
                <button
                  key={talk.id}
                  onClick={() => setActiveTab(talk.id)}
                  type="button"
                  className={`w-full text-left p-4 rounded-[4px] border transition-all duration-200 text-[13px] sm:text-[14px] font-medium tracking-wide relative overflow-hidden ${
                    isSelected 
                      ? 'bg-[#222222] border-white/20 text-white shadow-md' 
                      : 'bg-[#141414] border-white/[0.02] text-[#94a3b8] hover:bg-[#1a1a1a] hover:text-white'
                  }`}
                >
                  {/* Subtle vertical indicator bar if active tab is chosen */}
                  {isSelected && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#d97736]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={isSelected ? 'pl-2' : 'pl-0 transition-all'}>
                    {talk.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ================= RIGHT SIDE: ANIMATED INTERACTIVE VIEWER ================= */}
          <div className="md:col-span-6 w-full min-h-[260px] md:min-h-full">
            <div className="w-full h-full bg-[#1c1c1c] rounded-[4px] border border-white/[0.03] p-8 sm:p-10 flex flex-col justify-center relative overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.4)]">
              
              {/* AnimatePresence orchestrates the smooth unmounting and mounting cross-fade sequence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTalk.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="flex flex-col text-left"
                >
                  {/* Active Header Preview Title */}
                  <h3 className="text-white text-[15px] sm:text-[16px] font-semibold leading-snug tracking-wide mb-5">
                    {activeTalk.subTitle }
                  </h3>
                  
                  {/* Active Paragraph Detail Text */}
                  <p className="text-[#a1a1aa] font-light text-[13px] sm:text-[14px] leading-[1.7] tracking-wide antialiased">
                    {activeTalk.description}
                  </p>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SignatureTalks;