"use client";

import React from "react";
import { motion } from "framer-motion";

import bookImg from "../../../../assets/china/unfair-advantage-china-cover.png";
import awardsLogo from "../../../../assets/bookusa/business-book-awards-logo.png";
import icon1 from "../../../../assets/bookusa/icon1.png";
import icon2 from "../../../../assets/bookusa/icon2.png";
import icon3 from "../../../../assets/bookusa/icon3.png";

const awards = [
  { label: "2021 年商业书籍", icon: icon1.src },
  { label: "2021 年最佳初创/规模化图书奖", icon: icon2.src },
  { label: "2022 年度商业书籍决赛入围者", icon: icon3.src },
];

const ChinaBookDetails: React.FC = () => {
  return (
    <section className="w-full bg-[#0b0b0b] text-white py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* ───── TOP SECTION ───── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-6 md:gap-8 items-center"
        >
          {/* Book Image */}
          <div className="flex justify-center md:justify-start">
            <div className="bg-[#1a1a1a] p-3 rounded-2xl 
                            w-full max-w-[320px] h-[260px] sm:h-[300px] 
                            md:w-[360px] md:h-[320px] 
                            flex items-center justify-center">
              <img
                src={bookImg.src}
                alt="The Unfair Advantage Book"
                className="h-full object-contain"
              />
            </div>
          </div>

          {/* Book Text */}
          <div className="md:-ml-4">
            <h2 className="text-[18px] font-semibold mb-3">
             Book Details
            </h2>

            <p className="text-[14px] text-white/60 leading-[1.8] mb-3">
              作为 2021 年英国年度商业书籍奖的获得者，这本书突破性地揭露了初创企业成功背后的神话，并为利用真正重要的事物提供了蓝图。

            </p>

            <p className="text-[14px] text-white/60 leading-[1.8] mb-3">
              一家成功的初创公司与一家崩溃并烧毁的初创公司有什么区别？每个成功故事的背后都有不公平的优势。
            </p>

            <p className="text-[14px] text-white/60 leading-[1.8]">
              但不公平优势不仅仅与你父母的财富或你认识的人有关：任何人都可以拥有。不公平优势是让您在竞争中获得优势的因素。
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10 my-10" />

        {/* ───── BOTTOM SECTION ───── */}
       <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="grid md:grid-cols-2 gap-4 md:gap-6 items-center"
>
  {/* Awards Logo */}
  <div className="flex justify-center md:justify-start">
    <img
      src={awardsLogo.src}
      alt="The Business Book Awards"
      className="h-20 md:h-24 object-contain opacity-95"
    />
  </div>

  {/* Awards List */}
  <div className="flex items-stretch md:-ml-6">
    {/* Vertical Divider */}
    <div className="w-px self-stretch min-h-[120px] bg-white/20 mr-3 shrink-0" />

    <ul className="space-y-3">
      {awards.map((award, i) => (
        <li key={i} className="flex items-start sm:items-center gap-3">
          <img
            src={award.icon}
            alt=""
            className="w-[22px] h-[22px] shrink-0"
          />
          <span className="text-[14px] text-white/80">
            {award.label}
          </span>
        </li>
      ))}
    </ul>
  </div>
</motion.div>

      </div>
    </section>
  );
};

export default ChinaBookDetails;