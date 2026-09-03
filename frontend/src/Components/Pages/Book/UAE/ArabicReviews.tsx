import React from "react";
import { motion } from "framer-motion";
import { BRAND_GRADIENT_LR } from "../China/TestMonial";


const reviews = [
  {
    quote:
      "تتحدى الميزة غير العادلة التفكير التقليدي باستراتيجيات غير تقليدية لتحقيق النجاح. فهو يساعد القراء على الاستفادة من نقاط القوة، وبناء التحالفات، واحتضان الابتكار لتحقيق ميزة تنافسية. يجب قراءته للحصول على رؤى تجارية جديدة",
    name: "مانفي كمال",
  },
  {
    quote:
      "هذا هو كتاب الأعمال الأكثر تأثيراً الذي قرأته. لقد انتهيت منه في يوم واحد! تركز دروسها على الشركات الناشئة وريادة الأعمال، وتنطبق على النمو الوظيفي والحياة بشكل عام. يساعد إطار عمل MILES (المال) والاستخبارات والموقع والتعليم والحالة) على تحديد ميزتك غير العادلة والاستفادة منها.",
    name: "عطية قنبري",
  },
  {
    quote:
      "يقدم الكتاب منظوراً جديداً للقيادة والاستراتيجية، موضحاً كيف يتمتع كل عضو في الفريق بميزة فريدة. إن أفكاره العملية لا تقدر بثمن بالنسبة لمشروعي الجديد. قراءة مؤثرة حقاً - تهانينا للمؤلف!",
    name: "أحمد",
  },
];

const ArabicReviews: React.FC = () => {
  return (
    <section className="w-full bg-[#0b0b0b] text-white py-16 md:py-20 px-4 sm:px-6" dir="rtl">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="text-fluid-22 font-bold mb-8"
                    style={{ background: BRAND_GRADIENT_LR, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block" }}
        >
          أفكار...
        </motion.h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#161616] border border-white/[0.06] rounded-xl p-6 flex flex-col justify-between text-right"
            >
              {/* Quote mark */}
              <div>
                <span
                  className="text-fluid-42 leading-none text-white font-serif block mb-3"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  "
                </span>
                <p className="text-[13px] text-white leading-[1.85]">
                  {review.quote}
                </p>
              </div>

              {/* Author */}
              <p className="text-[13px] text-white mt-6">
                - {review.name}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ArabicReviews;