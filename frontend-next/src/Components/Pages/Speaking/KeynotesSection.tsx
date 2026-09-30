import React from 'react';
import { Users, BrainCircuit, BookOpen, UserCheck } from 'lucide-react';

interface KeynoteCardProps {
  icon: React.ReactNode;
  text: string;
}

// Reusable matte dark card component
const KeynoteCard: React.FC<KeynoteCardProps> = ({ icon, text }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-[8px] p-5 lg:p-4 flex flex-col items-center justify-center text-center aspect-[1.15/1] border border-white/[0.02] shadow-[0_4px_20px_rgba(0,0,0,0.3)] group select-none">
      {/* Icon Wrapper with a slight fade to match the subtle grey-white line-art style */}
      <div className="text-gray-300 mb-4 lg:mb-3">
        {icon}
      </div>

      {/* Card Content with precise line spacing */}
      <p className="text-white text-[13px] sm:text-[14px] lg:text-[12.5px] font-normal leading-[1.4] tracking-wide max-w-[180px] whitespace-pre-line">
        {text}
      </p>
    </div>
  );
};

export const KeynotesSection: React.FC = () => {
  const items = [
    {
      icon: <Users size={32} strokeWidth={1.2} />,
      text: "Corporate\nLeadership Teams"
    },
    {
      icon: <BrainCircuit size={32} strokeWidth={1.2} />,
      text: "AI & Future-Of-\nWork Events"
    },
    {
      icon: <BookOpen size={32} strokeWidth={1.2} />,
      text: "Universities &\nBusiness Schools"
    },
    {
      icon: <UserCheck size={32} strokeWidth={1.2} />,
      text: "Private Founder &\nCEO Sessions"
    }
  ];

  return (
    <section className="w-full bg-black py-16 md:py-20 px-6 sm:px-12 flex flex-col items-center justify-center select-text">
      <div className="w-full max-w-fluid mx-auto flex flex-col items-center">
        
        {/* Main Title Header with contrasting orange focus color */}
        <h2 className="text-white text-fluid-26 font-medium tracking-tight text-center mb-12 sm:mb-16">
          Who Ash <span className="text-[#d97736]">speaks to</span>
        </h2>

        {/* Dense Matte-Grid System */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-5 w-full max-w-4xl">
          {items.map((item, index) => (
            <KeynoteCard 
              key={index}
              icon={item.icon}
              text={item.text}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default KeynotesSection;