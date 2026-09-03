import React from "react";
import { motion } from "framer-motion";

import heroBg from "../../../../assets/uae/Hasan-Kubba-Ash-Ali-BBA2022-Shortlist-1024x742.png";
import aliAvatar from "../../../../assets/uae/ali.png";
import jilyAvatar from "../../../../assets/uae/645e149147e48297f40d7f9e_1594212445072 (1).png";

const GreenCard: React.FC<{
  quote: string;
  name: string;
  title: string;
  avatar: string;
  delay?: number;
}> = ({ quote, name, title, avatar, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-[#2e7d32] rounded-[14px] w-full text-right"
    style={{ padding: "18px 18px 14px", minWidth: "230px" }}
    dir="rtl"
  >
    <p className="text-[13px] text-white leading-[1.65] font-normal mb-3.5">
      "{quote}"
    </p>

    <div className="flex items-center gap-2.5 flex-row-reverse">
      <img
        src={avatar}
        alt={name}
        className="w-[42px] h-[42px] rounded-full object-cover border-2 border-white/25"
      />
      <div className="text-right">
        <p className="text-[13px] font-bold text-white">{name}</p>
        <p className="text-[11px] text-white/70 mt-0.5 whitespace-pre-line leading-[1.4]">
          {title}
        </p>
      </div>
    </div>
  </motion.div>
);

const ArabicTestimonialsHero: React.FC = () => {
  return (
    <section
      className="relative w-full min-h-[min(90vh,780px)] overflow-hidden flex items-center"
    >
      {/* Background */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div
        className="relative z-10 w-full mx-auto flex flex-col justify-between"
        style={{
          maxWidth: "1100px",
          padding: "clamp(32px, 6vh, 72px) 5%",
          minHeight: "min(90vh, 780px)",
        }}
      >
        <div
          className="
            w-full flex-1
            flex flex-col sm:flex-row
            sm:items-stretch sm:justify-between
            items-center justify-center
            gap-6 sm:gap-4
          "
        >
          {/* LEFT (bottom aligned) */}
          <div className="flex flex-col justify-end w-full sm:w-auto items-center sm:items-start">
            <GreenCard
              quote="طريقة قوية للتفكير في النجاح كرجل أعمال."
              name="علي عبدال"
              title={"من مستخدمي YouTube الإنتاجية،\nومدوّن بودكاستر، وطبيب سابق"}
              avatar={aliAvatar}
              delay={0.15}
            />
          </div>

          {/* Spacer */}
          <div className="hidden sm:flex flex-1" />

          {/* RIGHT (top aligned) */}
          <div className="flex flex-col justify-start w-full sm:w-auto items-center sm:items-end">
            <GreenCard
              quote="أوصي بشدة بكتاب الميزة غير العادلة."
              name="جيلي أفرع"
              title="اليوتيوب"
              avatar={jilyAvatar}
              delay={0.05}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArabicTestimonialsHero;