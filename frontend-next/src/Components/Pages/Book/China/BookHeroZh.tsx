"use client";

import React from "react";
import { motion } from "framer-motion";

import heroBg from "../../../../assets/china/ash-ali-hasan-kubba-bba-2022.png";
import bookCover from "../../../../assets/china/book.png";
import avatar1 from "../../../../assets/china/left.png";
import avatar2 from "../../../../assets/china/right.png";

const testimonials = {
  left: {
    text: `张朝阳在一次采访中劝说年轻人，不要过于固执于努力。 因为他觉得努力和成功之间，关系不大。 人到中年，对张老师的劝解深以为然。 努力，更像是一个人面对目标时的进取态度，但是，是否能成功抵达目标，努力不是决定性因素。 具体原因，很多人在《不公平优势》一书中，找到了...`,
    name: "赤文",
    avatar: avatar1.src,
  },
  right: {
    text: `反者道之动，弱者道之用 ·不公平优势：就是你拥有而别人没有或难以复制的资源、能力、知识、经验、关系等。 优势的领域和视角划分 分为： Money & Mindset：金钱与对金钱的认知，指你拥有或能够获取到金钱的资源，包括现金、投资、赞助等；比钱更重要的是对钱的认知。无法...`,
    name: "马乔里",
    avatar: avatar2.src,
  },
};

const Card: React.FC<{
  text: string;
  name: string;
  avatar: string;
  delay?: number;
}> = ({ text, name, avatar, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="w-full max-w-[min(100%,240px)] rounded-[10px] bg-white/90 p-4 shadow-lg backdrop-blur-sm"
  >
    <p className="text-[11.5px] text-[#1a1a1a] leading-[1.72] mb-3.5 line-clamp-7">
      {text}
    </p>
    <div className="flex items-center gap-2.5">
      <img
        src={avatar}
        alt={name}
        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
      />
      <span className="text-[13px] font-semibold text-[#1a1a1a]">
        {name}
      </span>
    </div>
  </motion.div>
);

const BookHeroZh: React.FC = () => {
  return (
    <section
      className="relative min-h-[100svh] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg.src})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1100px] flex-col items-center justify-between gap-8 px-5 py-14 sm:px-6 md:flex-row md:gap-10 md:py-16">

        {/* Left card */}
        <div className="flex-1 flex justify-center md:justify-start order-2 md:order-1">
          <Card
            text={testimonials.left.text}
            name={testimonials.left.name}
            avatar={testimonials.left.avatar}
            delay={0.1}
          />
        </div>

        {/* Book */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex-shrink-0 order-1 md:order-2 z-20"
        >
          <div
            className="rounded-[6px] overflow-hidden"
            style={{
              width: "clamp(160px, 18vw, 220px)",
              height: "clamp(230px, 26vw, 315px)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.75)",
            }}
          >
            <img
              src={bookCover.src}
              alt="不公平优势"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Right card */}
        <div className="flex-1 flex justify-center md:justify-end order-3">
          <Card
            text={testimonials.right.text}
            name={testimonials.right.name}
            avatar={testimonials.right.avatar}
            delay={0.2}
          />
        </div>

      </div>
    </section>
  );
};

export default BookHeroZh;
