import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Rocket, BrainCircuit, Users } from 'lucide-react';

// Custom lightweight SVG component to match the specific 360-degree user icon profile
const AspiringUserIcon = ({ size = 32 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={1.2} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21c0-1.66-2-3-4.5-3S13 19.34 13 21" />
    <path d="M14 11a3 3 0 0 0 3-3" />
  </svg>
);

interface TargetCardProps {
  icon: React.ReactNode;
  text: string;
}

// Individual premium matte-dark target card subcomponent
const TargetCard: React.FC<TargetCardProps> = ({ icon, text }) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
      }}
      className="bg-[#1a1a1a] rounded-[6px] p-4 sm:p-8 flex flex-col items-center justify-center text-center min-h-[172px] sm:min-h-0 sm:aspect-square border border-white/[0.02] shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:bg-[#222222] transition-colors duration-200 group select-none"
    >
      {/* Structural icon wrap configured with fine line weight profile */}
      <div className="text-gray-300 group-hover:text-white transition-colors duration-200 mb-4 sm:mb-5">
        {icon}
      </div>

      {/* Dynamic line-break multi-line context balanced copy */}
      <p className="text-white text-[13px] sm:text-[14px] font-normal leading-[1.5] tracking-wide sm:max-w-[160px] whitespace-pre-line antialiased">
        {text}
      </p>
    </motion.div>
  );
};

export const WhoItsFor: React.FC = () => {
  // Accurate text strings segmented using newline hooks (\n) matching image_c4b75a.png exactly
  const cardsData = [
    {
      icon: <AspiringUserIcon size={32} />,
      text: "Founders And\nAspiring\nEntrepreneurs"
    },
    {
      icon: <GraduationCap size={32} strokeWidth={1.2} />,
      text: "Students And\nRecent\nGraduates"
    },
    {
      icon: <Rocket size={32} strokeWidth={1.2} />,
      text: "Professionals\nAnd Career\nChangers"
    },
    {
      icon: <BrainCircuit size={32} strokeWidth={1.2} />,
      text: "Underrepresented\nAnd Underserved\nTalent"
    },
    {
      icon: <Users size={32} strokeWidth={1.2} />,
      text: "Leaders Developing\nAnd Backing Their\nPeople"
    }
  ];

  return (
    <section className="w-full bg-black px-4 sm:px-6 md:px-12 py-16 md:py-20 flex flex-col items-center justify-center select-text">
      <div className="w-full max-w-fluid mx-auto flex flex-col items-center">
        
        {/* Section Header displaying exact brand-colored headline split tracking */}
        <h2 className="text-white text-fluid-24 font-normal tracking-tight text-center mb-12 sm:mb-16">
          <span className="text-[#d97736]">Who</span> it's for
        </h2>

        {/* 5-Column Responsive Grid Structure wrapper */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 w-full max-w-5xl"
        >
          {cardsData.map((card, index) => (
            <TargetCard 
              key={index}
              icon={card.icon}
              text={card.text}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default WhoItsFor;