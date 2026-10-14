import React from 'react';
import { motion } from 'framer-motion';
import { brandGradientTextStyle } from '../../../constants/brandGradient';
import ashImage from '../../../assets/speaking/updatedSpeakingimage.png';
import { Link } from 'react-router-dom';

export const KeynotesBanner: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // const fadeUpVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.7, ease: 'easeOut' },
  //   },
  // };

  return (
   <section className="w-full min-h-[min(100vh,760px)] bg-[#0F0F0F] overflow-hidden select-none">
  <div className="max-w-fluid mx-auto min-h-[min(100vh,760px)] flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 gap-8 lg:gap-14">

    {/* IMAGE */}
    <div className="flex-shrink-0 flex items-end self-end justify-center w-full md:w-auto">
      <img
        src={ashImage}
        alt="Ash"
        className="h-[340px] sm:h-[420px] md:h-[min(85vh,680px)] w-auto object-contain object-bottom"
        draggable={false}
      />
    </div>

    {/* CONTENT */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col items-start justify-center flex-1 py-12 md:py-0"
    >
        <div className="flex items-center mb-3 text-[11px] sm:text-[12px] font-medium tracking-[0.2em] text-gray-400 uppercase">
              {/*
 */}
              <span>KEYNOTES FOR LEADERS, FOUNDERS AND ORGANISATIONS</span>
            </div>
      <motion.h2 className="text-white text-fluid-32 font-normal leading-[1.45] max-w-xl text-balance">
        Keynotes that shift how{" "}
        <span style={brandGradientTextStyle}>
          leaders think and
        </span>{" "}
        what they do next
      </motion.h2>
      {/* <h2 className=" mt-10 text-center text-fluid-24 font-normal tracking-wide sm:mb-12">
              <span style={brandGradientTextStyle}>A Global Keynote Speaker</span>
            </h2> */}

      <motion.div className="mt-8">
        <Link to="/contact">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 bg-white text-black font-semibold text-[13px] tracking-wide rounded-[2px] shadow-lg"
          >
            Enquire about a keynote
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>

  </div>
</section>
  );
};

export default KeynotesBanner;