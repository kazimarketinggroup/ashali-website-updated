import React from "react";
import { motion } from "framer-motion";

// Speaking / event logos
import digitalDna from "../../../assets/speaking/digitaldna.png";
import eyLogo from "../../../assets/speaking/EY-logo 2.png";
import natwest from "../../../assets/speaking/Natwest_Secondary_Horizontal_RGB_NEG.png";
import salesforce from "../../../assets/speaking/salesforce.png";
import tedxRh from "../../../assets/speaking/theroyalholloway.png";
import in5Logo from "../../../assets/speaking/u5logo.png";
import weWork from "../../../assets/speaking/wework+logo+-+white 1.png";
import techLonon from "../../../assets/speaking/logo-negative-1024x437 1.png";
import kanguru from "../../../assets/speaking/41329447_656719284728022_3471088475799814144_n 1.png";
import triva from "../../../assets/speaking/triva-global-seeklogo 1.png";
import worq from "../../../assets/speaking/logo-footer 1.png";

// Educational institute logos
import imperialCollege from "../../../assets/speaking/logo-negative-1024x437 4.png";
import escpSchool from "../../../assets/speaking/logo-negative-1024x437 5.png";
import loughboroughUni from "../../../assets/speaking/wework+logo+-+white 3.png";
import uclLogo from "../../../assets/speaking/ucl-logo-1 1.png";
import royalHolloway from "../../../assets/speaking/royal-holloway-logo-579E793B40-seeklogo.com 2.png";
import warwickUni from "../../../assets/speaking/170821-Warwick-logo-White 2.png";

// import { brandGradientTextStyle } from "../../../constants/brandGradient";

type Logo = { src: string; alt: string; w: string };

// All logos merged into one continuous track.
const logos: Logo[] = [
  { src: tedxRh, alt: "TEDx Royal Holloway", w: "w-[130px] md:w-[145px]" },
  { src: salesforce, alt: "Salesforce", w: "w-[55px] md:w-[60px]" },
  { src: eyLogo, alt: "EY", w: "w-[40px] md:w-[42px]" },
  { src: in5Logo, alt: "in5", w: "w-[34px] md:w-[38px]" },
  { src: digitalDna, alt: "Digital DNA", w: "w-[85px] md:w-[95px]" },
  { src: weWork, alt: "WeWork", w: "w-[70px] md:w-[75px]" },
  { src: techLonon, alt: "Tech London", w: "w-[65px] md:w-[70px]" },
  { src: natwest, alt: "NatWest", w: "w-[85px] md:w-[90px]" },
  { src: kanguru, alt: "Kanguru", w: "w-[80px] md:w-[85px]" },
  { src: triva, alt: "Triva Global", w: "w-[70px] md:w-[75px]" },
  { src: worq, alt: "Worq", w: "w-[60px] md:w-[65px]" },
  { src: imperialCollege, alt: "Imperial College Business School", w: "w-[150px] md:w-[165px]" },
  { src: escpSchool, alt: "ESCP Business School", w: "w-[110px] md:w-[125px]" },
  { src: loughboroughUni, alt: "Loughborough University", w: "w-[135px] md:w-[150px]" },
  { src: uclLogo, alt: "UCL", w: "w-[85px] md:w-[95px]" },
  { src: royalHolloway, alt: "Royal Holloway University of London", w: "w-[85px] md:w-[95px]" },
  { src: warwickUni, alt: "The University of Warwick", w: "w-[95px] md:w-[105px]" },
];

const LogoItem: React.FC<{ logo: Logo }> = ({ logo }) => (
  <div className={`flex shrink-0 items-center justify-center ${logo.w}`}>
    <img
      src={logo.src}
      alt={logo.alt}
      className="h-auto w-full object-contain opacity-90"
      draggable="false"
      loading="lazy"
    />
  </div>
);

const KeynoteLogoMarquee: React.FC = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
    className="w-full select-none bg-black pb-14 pt-12"
  >
    <div className="mx-auto flex max-w-fluid flex-col items-center px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      {/* <h2 className="mb-10 text-center text-fluid-24 font-normal tracking-wide sm:mb-12">
        <span style={brandGradientTextStyle}>A Global Keynote Speaker</span>
      </h2> */}

      {/* Marquee viewport with edge fade masks */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="marquee-track">
          {/* First set */}
          <div className="flex items-center gap-x-12 pr-12 md:gap-x-16 md:pr-16">
            {logos.map((logo) => (
              <LogoItem key={`a-${logo.alt}`} logo={logo} />
            ))}
          </div>
          {/* Duplicate set for a seamless loop */}
          <div className="flex items-center gap-x-12 pr-12 md:gap-x-16 md:pr-16" aria-hidden="true">
            {logos.map((logo) => (
              <LogoItem key={`b-${logo.alt}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.section>
);

export default KeynoteLogoMarquee;
