"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdvisoryTopic {
  id: string;
  title: string;
  description: string;
}

export const AdvisesOnSection: React.FC = () => {
  // Complete textual data parsed exactly from your reference assets image_293960.png and image_293922.png
  const advisoryData: AdvisoryTopic[] = [
    {
      id: 'topic-1',
      title: 'Positioning and narrative Sharpening',
      description: 'how you tell your story to customers, investors and your own team.'
    },
    {
      id: 'topic-2',
      title: 'Founder judgement',
      description: "A trusted sounding board for the hard, high-stakes calls that don't have easy answers."
    },
    {
      id: 'topic-3',
      title: 'Growth and go-to-market',
      description: 'Practical thinking on how to grow, sell and scale with focus.'
    },
    {
      id: 'topic-4',
      title: 'AI-era advantage',
      description: "Where AI genuinely changes the game for your business, and where it doesn't."
    },
    {
      id: 'topic-5',
      title: 'Strategic partnerships',
      description: 'Building the relationships and alliances that compound advantage over time.'
    },
    {
      id: 'topic-6',
      title: 'Exit thinking',
      description: "Clear-eyed perspective on direction, options and what you're really building toward."
    },
    {
      id: 'topic-7',
      title: 'Human potential and team performance',
      description: "Getting the best from people: the edge that technology can't replace."
    }
  ];

  // Track the active advisory category ID
  const [activeTab, setActiveTab] = useState<string>(advisoryData[0].id);
  const activeTopic = advisoryData.find((topic) => topic.id === activeTab) || advisoryData[0];

  return (
    <section className="w-full bg-black py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center justify-center select-none">
      <div className="w-full max-w-fluid mx-auto">
        
        {/* Section Header with exact deep teal accent coloration from image_293960.png */}
        <h2 className="text-white text-fluid-24 font-semibold tracking-tight mb-10 text-left">
          What Ash <span className="text-[#008080]">Advises</span> On
        </h2>

        {/* Interactive Double-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch w-full">
          
          {/* ================= LEFT SIDE: SELECTION TABS ================= */}
          <div className="md:col-span-6 flex flex-col gap-2.5 w-full">
            {advisoryData.map((topic) => {
              const isSelected = topic.id === activeTab;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveTab(topic.id)}
                  type="button"
                  className={`w-full text-left p-4 rounded-[4px] text-[13px] sm:text-[14px] font-medium tracking-wide transition-all duration-200 relative overflow-hidden ${
                    isSelected 
                      ? 'bg-[#008080] text-white shadow-md' 
                      : 'bg-[#222222] text-[#e2e8f0] hover:bg-[#2a2a2a] hover:text-white'
                  }`}
                >
                  {/* Subtle white indicator dot to mark focus cleanly */}
                  {isSelected && (
                    <motion.span 
                      layoutId="activeDot"
                      className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-2.5 mb-0.5"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className={isSelected ? 'font-semibold' : 'font-normal'}>
                    {topic.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ================= RIGHT SIDE: SMOOTH ACCENT VIEWER ================= */}
          <div className="md:col-span-6 w-full min-h-[240px] md:min-h-full">
            <div className="w-full h-full bg-[#1c1c1c] rounded-[4px] border border-white/[0.03] p-8 sm:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
              
              {/* AnimatePresence fields smooth out old content unmounting instantly */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTopic.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="flex flex-col items-center max-w-sm"
                >
                  {/* Preview Title */}
                  <h3 className="text-white text-[16px] sm:text-[18px] font-semibold leading-snug tracking-wide mb-6">
                    {activeTopic.title}
                  </h3>
                  
                  {/* Insight Narrative Copy */}
                  <p className="text-[#a1a1aa] font-light text-[13px] sm:text-[14px] leading-relaxed tracking-wide antialiased">
                    {activeTopic.description}
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

export default AdvisesOnSection;