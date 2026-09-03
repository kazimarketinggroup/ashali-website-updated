"use client";

import React from "react";
import { motion } from "framer-motion";

import bookImg from "../../../../assets/uae/unfair-advantage-uae-cover.png";
import awardsLogo from "../../../../assets/bookusa/business-book-awards-logo.png";
import icon1 from "../../../../assets/bookusa/icon1.png";
import icon2 from "../../../../assets/bookusa/icon2.png";
import icon3 from "../../../../assets/bookusa/icon3.png";

const awards = [
  { label: "كتاب الأعمال لعام 2021", icon: icon1.src },
  { label: "جائزة أفضل كتاب للشركات الناشئة/التوسع لعام 2021", icon: icon2.src },
  { label: "كتاب الأعمال لعام 2022 النهائي", icon: icon3.src },
];

const UaeBookDetails: React.FC = () => {
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
              تفاصيل الكتاب
            </h2>

            <p className="text-[14px] text-white/60 leading-[1.8] mb-3">
              يعد هذا الكتاب، الحائز على جائزة أفضل كتاب أعمال في المملكة المتحدة لعام 2021، كشفًا رائدًا للأساطير الكامنة وراء نجاح الشركات الناشئة ومخططًا لتسخير الأشياء المهمة حقًا.

            </p>

            <p className="text-[14px] text-white/60 leading-[1.8] mb-3">
           ما الفرق بين الشركة الناشئة التي تصنع النجاح وتلك التي تتعطل وتحترق؟ وراء كل قصة نجاح ميزة غير عادلة.
            </p>

            <p className="text-[14px] text-white/60 leading-[1.8]">
             لكن الميزة غير العادلة لا تتعلق فقط بثروة والديك أو من تعرفهم: يمكن لأي شخص أن يحصل عليها. الميزة غير العادلة هي العنصر الذي يمنحك ميزة على منافسيك.
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

export default UaeBookDetails;