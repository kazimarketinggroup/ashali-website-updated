import React from "react";
import { motion } from "framer-motion";

import onboardingCardImg from "../../../assets/uhubs/top.png";
import logosBarImg from "../../../assets/uhubs/bottom.png";

const contentData = [
  {
    title: "The Mission",
    desc: "To establish Uhubs Pulse score as a new global standard for revenue capabilities.",
  },
  {
    title: "Our Vision",
    desc: "Our vision is to enable 1 billion people to realise their potential by 2030.",
  },
  {
    title: "Our Focus",
    desc: "We focus on driving revenue outcomes And creating an environment where customers and employees can realise their own potential.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55 },
  },
};

const MissionVisionFocus: React.FC = () => {
  return (
    <section className="w-full bg-black text-white py-16 md:py-20 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-fluid mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT — Two stacked images */}
        <div className="flex flex-col gap-4 items-center lg:items-start w-full">

          {/* Top card image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[380px] rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src={onboardingCardImg}
              alt="SDR Onboarding Card"
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Bottom logos bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-[380px] rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={logosBarImg}
              alt="Trust logos"
              className="w-full h-auto object-contain"
            />
          </motion.div>

        </div>

        {/* RIGHT — Mission / Vision / Focus */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-8"
        >
          {contentData.map((item, index) => (
            <motion.div key={index} variants={fadeUpVariants}>
              {/* Title */}
              <h3 className="text-white text-[17px] sm:text-[19px] font-semibold mb-2">
                {item.title}
              </h3>
              {/* Divider line — subtle */}
              <div className="w-full h-px bg-white/10 mb-3" />
              {/* Description */}
              <p className="text-[15px] sm:text-[16px] text-white/65 leading-[1.75] font-normal">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default MissionVisionFocus;