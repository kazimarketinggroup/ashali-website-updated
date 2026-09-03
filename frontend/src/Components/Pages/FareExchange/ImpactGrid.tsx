import React from "react";
import { motion } from "framer-motion";

// Images
import uhubsImg from "../../../assets/impact/uhubImage.png";
import unfairImg from "../../../assets/impact/unfairImage.png";
// import fareImg from "../../../assets/impact/fareExchangeImage.png";
import justeatImg from "../../../assets/impact/justEatImage.png";
import washplusImg from "../../../assets/impact/washplusImage.png";

// Logos
import uhubLogo from "../../../assets/impact/uhubLogo.png";
import unfairLogo from "../../../assets/impact/unfairLogo.png";
// import fareLogo from "../../../assets/impact/fareExchaneLogo.png";
import justeatLogo from "../../../assets/impact/justEatLogo.png";
import washplusLogo from "../../../assets/impact/washlogo.png";

const cardData = [
  { img: uhubsImg, logo: uhubLogo, url: "https://uhubs.com" },
  { img: unfairImg, logo: unfairLogo, url: "https://lifeisunfair.com" },
//   { img: fareImg, logo: fareLogo, url: "https://fareexchange.com" },
  { img: justeatImg, logo: justeatLogo, url: "https://just-eat.co.uk" },
  { img: washplusImg, logo: washplusLogo, url: "https://washplus.com" }
];

const GridCard: React.FC<{
  img: string;
  logo: string;
  url: string;
  delay?: number;
}> = ({ img, logo, url, delay = 0 }) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ scale: 1.02 }}
    className="relative overflow-hidden group block w-full aspect-square flex items-center justify-center cursor-pointer border-r border-white/[0.06] last:border-r-0"
  >
    {/* Background (FULL IMAGE SHOWN, NO CROP) */}
    <img
      src={img}
      alt="Impact Project"
      className="absolute inset-0 w-full h-full object-contain bg-black/30 p-6 transition-transform duration-500 group-hover:scale-105"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

    {/* Logo */}
    <div className="relative z-10 w-1/2 max-w-[110px] lg:max-w-[130px]">
      <img src={logo} alt="Company logo" className="w-full h-auto object-contain" />
    </div>
  </motion.a>
);

const ImpactGrid: React.FC = () => {
  return (
    <section className="w-full bg-[#0d0d0d] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-white/[0.06]">
          {cardData.map((card, idx) => (
            <GridCard
              key={idx}
              img={card.img}
              logo={card.logo}
              url={card.url}
              delay={idx * 0.05}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ImpactGrid;