import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BrainCircuit, TrendingUp, UserCheck } from 'lucide-react';

interface KeynoteCardProps {
  icon: React.ReactNode;
  text: string;
  href?: string;
}

// Reusable matte dark card component
const KeynoteCard: React.FC<KeynoteCardProps> = ({ icon, text, href }) => {
  const cardBody = (
    <div className={`bg-[#1a1a1a] rounded-[8px] p-5 lg:p-4 flex flex-col items-center justify-center text-center aspect-[1.15/1] border border-white/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.3)] group select-none transition-all duration-200 h-full ${
      href ? "hover:border-[#FF781D]/40 hover:bg-[#202020] cursor-pointer" : ""
    }`}>
      {/* Icon Wrapper with a slight fade to match the subtle grey-white line-art style */}
      <div className="text-gray-300 mb-3 group-hover:text-white transition-colors">
        {icon}
      </div>

      {/* Card Content with precise line spacing */}
      <p className="text-white text-[13px] sm:text-[14px] lg:text-[12.5px] font-normal leading-[1.4] tracking-wide max-w-[180px] whitespace-pre-line">
        {text}
      </p>

      {href && (
        <span className="mt-2 text-[11px] text-[#FF781D] font-medium opacity-80 group-hover:opacity-100 transition-opacity">
          Sales Kickoff →
        </span>
      )}
    </div>
  );

  return href ? <Link to={href} className="block h-full">{cardBody}</Link> : cardBody;
};

export const KeynotesSection: React.FC = () => {
  const items = [
    {
      icon: <Users size={32} strokeWidth={1.2} />,
      text: "Corporate\nleadership teams"
    },
    {
      icon: <BrainCircuit size={32} strokeWidth={1.2} />,
      text: "AI & future-of-\nwork events"
    },
    {
      icon: <TrendingUp size={32} strokeWidth={1.2} />,
      text: "Sales and revenue\nleadership",
      href: "/sales-kickoff"
    },
    {
      icon: <UserCheck size={32} strokeWidth={1.2} />,
      text: "Private founder &\nCEO sessions"
    }
  ];

  return (
    <section className="w-full bg-black py-16 md:py-24 flex flex-col items-center justify-center select-text">
      <div className="w-full max-w-fluid mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Main Title Header with contrasting orange focus color */}
        <h2 className="text-white text-fluid-34 font-semibold tracking-tight text-center mb-12 sm:mb-16">
          Who Ash <span className="text-[#d97736]">speaks to</span>
        </h2>

        {/* Dense Matte-Grid System */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 w-full">
          {items.map((item, index) => (
            <KeynoteCard 
              key={index}
              icon={item.icon}
              text={item.text}
              href={item.href}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default KeynotesSection;