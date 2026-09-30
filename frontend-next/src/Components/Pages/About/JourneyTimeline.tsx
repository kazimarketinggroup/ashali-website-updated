"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { MapPin } from 'lucide-react';

// Import corporate logos matching your project assets path
import justEatLogo from '../../../assets/about/justeat.png';
import fareExchangeLogo from '../../../assets/about/fareexchange.png';
import washPlusLogo from '../../../assets/about/washplus.png';
import { brandGradientTextStyle } from '../../../constants/brandGradient';

interface TimelineEvent {
  year: string;
  title: string;
  location: string;
  description: string;
  logoSrc?: string;
  logoAlt?: string;
  logoStyles?: string;
}

export const JourneyTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse exact text strings and nodes from image_34ec45.png
  const timelineData: TimelineEvent[] = [
    {
      year: "1999–2000",
      title: "CHASING AMBITION WITH NOTHING BUT A DREAM",
      location: "Small Heath, Birmingham",
      description: "Packed his bags and moved to London with nothing, determined to break into the world of marketing and startups. Self-taught and relentless, he carved his own path without a university degree."
    },
    {
      year: "2001–2007",
      title: "VARIOUS MARKETING EXECUTIVE ROLES",
      location: "London",
      description: "Worked across various marketing roles, honing expertise in digital strategy, growth hacking, and brand positioning. Helped multiple companies scale their online presence."
    },
    {
      year: "2008–2011",
      title: "BECOMING JUST EAT'S FIRST MARKETING DIRECTOR",
      location: "London",
      description: "Joined Just Eat as the first marketing director, pioneering growth strategies that led to a £1.5 billion IPO, the UK's biggest tech IPO of the decade.",
      logoSrc: justEatLogo.src,
      logoAlt: "Just Eat Logo",
      logoStyles: "h-5 sm:h-6 w-auto object-contain"
    },
    {
      year: "2012–2016",
      title: "FOUNDED FARE EXCHANGE",
      location: "London",
      description: "Founded and launched a mobile performance based lead generation service for phone call tracking in the £9 billion taxi and private minicab sector. At the end of his journey, he successfully scaled the business and sold Fare Exchange for a seven-figure sum.",
      logoSrc: fareExchangeLogo.src,
      logoAlt: "Fare Exchange Logo",
      logoStyles: "h-6 sm:h-7 w-auto object-contain"
    },
    {
      year: "2015–2018",
      title: "BUILDING WASHPLUS",
      location: "London",
      description: "Co-founded Washplus, an on demand eco-friendly laundry and dry cleaning startup, bringing innovation to the industry with a tech-driven approach. At the end of his journey, he successfully scaled and exited the business in a multi-million acquisition.",
      logoSrc: washPlusLogo.src,
      logoAlt: "WashPlus Logo",
      logoStyles: "h-4 sm:h-5 w-auto object-contain"
    },
    {
      year: "2019–2020",
      title: "CO-AUTHOR OF THE BEST SELLING BOOK THE UNFAIR ADVANTAGE",
      location: "London",
      description: "Co-authored \"The Unfair Advantage\", a powerful book helping entrepreneurs discover and leverage their unique strengths."
    },
    {
      year: "2021",
      title: "AWARDED BUSINESS BOOK OF THE YEAR – 2021",
      location: "London",
      description: "'The Unfair Advantage' was picked from a shortlist of over 250 books and was chosen over the course of an intensive six month judging process and was awarded business book of the year 2021."
    },
    {
      year: "2019–Now",
      title: "CO-FOUNDED UHUBS",
      location: "London",
      description: "Uhubs helps revenue leaders assess and improve their sales team's performance with data-driven capability scores. Identify strengths, pinpoint skill gaps, and unlock growth potential with real-time insights."
    }
  ];

  // Tracking vertical scrolling progress to illuminate the timeline wire automatically
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 70%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="w-full bg-black py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-20 select-text text-white">
      <div className="w-full max-w-fluid mx-auto">

        {/* Three-Tone Color Code Header Track matching image_34ec45.png exactly */}
        <h2 className="text-left text-fluid-28 font-normal tracking-wide mb-10 sm:mb-16 sm:px-2">
          <span className="text-white">From practitioner to</span>{' '}
          <span style={brandGradientTextStyle}>thought leader</span>
        </h2>

        {/* Timeline Engine Container */}
        <div ref={containerRef} className="relative w-full flex flex-col gap-5">
          
          {/*
            Timeline wire. Its `left` must sit on the centre of the node column,
            which differs per breakpoint because the grid template does:
            mobile 34px col -> 16px; sm 145+60 -> 174px; md 185+60 -> 214px.
            Keep these in sync with the grid-cols values on each row below.
          */}
          <div className="absolute left-[16px] sm:left-[174px] md:left-[214px] top-4 bottom-4 w-[2px] bg-white/10 z-0 pointer-events-none" />

          {/* Dynamic Animated Scroll-Drawing Indicator Overlay Wire */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-[16px] sm:left-[174px] md:left-[214px] top-4 bottom-4 w-[2px] bg-[#d97736] z-0 origin-top pointer-events-none"
          />

          {/* Map and Layout Individual Content Blocks */}
          {timelineData.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
              className="relative grid grid-cols-[34px_1fr] sm:grid-cols-[145px_60px_1fr] md:grid-cols-[185px_60px_1fr] items-start sm:min-h-[140px] group z-10"
            >

              {/*
                Left Column: Metric Date Tracker.
                Below `sm` a 145px gutter would leave the card too narrow to read,
                so the year column is dropped from the grid entirely and the year
                is re-rendered inside the card instead (see below).
              */}
              <div className="hidden sm:block text-right pt-4 text-white text-[17px] md:text-[19px] font-bold tracking-tight pr-6 md:pr-10 select-none">
                {event.year}
              </div>

              {/* Middle Column: Visual Alignment Anchor Rings */}
              <div className="flex h-full items-start justify-center pt-[18px]">
                {/* Outward Ring Case */}
                <div className="w-[18px] h-[18px] rounded-full bg-black border-2 border-white/30 flex items-center justify-center transition-all duration-300 group-hover:border-[#d97736] group-hover:scale-110 shadow-md">
                  {/* Inner Solid Node Core */}
                  <div className="w-[8px] h-[8px] rounded-full bg-white transition-all duration-300 group-hover:bg-[#d97736]" />
                </div>
              </div>

              {/* Right Column: Narrative Corporate Information Blocks */}
              <div className="bg-[#141414] rounded-lg border border-white/[0.02] p-4 sm:p-6 md:p-8 flex flex-col relative overflow-hidden shadow-lg hover:bg-[#1a1a1a] transition-all duration-300">

                {/* Mobile-only year, standing in for the hidden year column. */}
                <span className="sm:hidden mb-1.5 text-[13px] font-bold tracking-tight text-white select-none">
                  {event.year}
                </span>

                {/* Flex title line allowing right-aligned inline company assets */}
                <div className="flex items-start justify-between gap-3 sm:gap-4 mb-2">
                  <h3 className="text-white text-[12px] sm:text-[13px] md:text-[14px] font-bold tracking-wider leading-snug uppercase max-w-full sm:max-w-[80%]">
                    {event.title}
                  </h3>
                  
                  {/* Dynamic Company Branding Image Block */}
                  {event.logoSrc && (
                    <div className="flex shrink-0 pt-0.5 max-w-[80px] sm:max-w-[100px]">
                      <img 
                        src={event.logoSrc} 
                        alt={event.logoAlt || "Brand asset image"} 
                        className={event.logoStyles}
                        draggable="false"
                      />
                    </div>
                  )}
                </div>

                {/* Pin Location Subheader Block */}
                <div className="flex items-center gap-1.5 text-gray-500 text-[11px] sm:text-[12px] tracking-wide mb-4 capitalize">
                  <MapPin size={12} className="text-gray-600 shrink-0" />
                  <span>{event.location}</span>
                </div>

                {/* Long Form Description Content block */}
                <p className="text-[#a1a1aa] font-light text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed tracking-wide antialiased">
                  {event.description}
                </p>

              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;