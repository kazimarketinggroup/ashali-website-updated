"use client";

import React from "react";
import { motion } from "framer-motion";

export const BRAND_GRADIENT_LR = "linear-gradient(90deg, #FF781D 0%, #008080 100%)";

const testimonials = [
  {
    quote:
      '本书的两位作者阿什·阿里、哈桑·库巴本身就是白手起家的创业者，后来又转型成为天使投资者和顾问，投资创业公司并给予指导。置身商海，他们见识过许多创业公司，有些成功，另一些则失败了，这不由令他们思考，创业成败的关键是什么，并提出了“不公平优势”这一概念。 在媒体...',
    name: "煎茶",
  
  },
  {
    quote:
      "欧洲主要的外卖点餐平台Just Eat相当于英国版的美团外卖，它的首任营销总监阿什·阿里被人称为增长黑客，就是善于让创业公司快速发展的人。 离开Just Eat以后，阿什·阿里又创立了Fair Exchange公司，这是一个出租车租车平台，短短三年时间，公司的预定业务就从零增长到2500万",
    name: "游啊游的游",
  },
  {
    quote:
      '很少有人觉得生命是公平的吧。有人智商140，有人天生丽质，有人生来就是trust baby.....多年前我读川普女儿Ivanka写的自传，她描述自己如何努力奋斗，独立自强，比如从沃顿商学院以优异的成绩毕业，在川普集团里担任EVP，参与拍摄真人秀The Apprentice等，坦白讲她算是很优秀的',
    name: "西雅图的傻牛",
  
  },
  
];

const ChinaTestmonialSection: React.FC = () => {
  return (
    <section className="w-full bg-[#0d0d0d] px-4 sm:px-8 pt-11 pb-14">
      <div className="max-w-5xl mx-auto">

        {/* Heading with brand gradient */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-fluid-22 font-bold mb-8"
          style={{ background: BRAND_GRADIENT_LR, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block" }}
        >
          想法...
        </motion.h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-[#1a1a1a] rounded-[10px] px-5 sm:px-[26px] pt-7 pb-6"
            >
              {/* Quote mark — uses start of brand gradient (#FF781D) */}
              <span
                className="block text-fluid-36 font-black leading-none mb-3 font-serif"
                style={{ color: "#FF781D" }}
              >
                "
              </span>

              {/* Body */}
              <p className="text-[13px] text-white/70 leading-[1.72] mb-5">
                {t.quote}
              </p>

              {/* Author */}
              <div>
                <p className="text-[13px] font-bold text-white leading-snug">
                  {t.name}
                </p>
               
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ChinaTestmonialSection;