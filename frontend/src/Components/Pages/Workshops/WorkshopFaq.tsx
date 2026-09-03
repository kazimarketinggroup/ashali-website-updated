import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

import { Body, Card, Reveal, Section, SectionHeading } from "../../Shared/SectionKit";
import { faqs } from "./faqData";

/** §3 — "Practical questions, answered." */
const WorkshopFaq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  return (
    <Section>
      <div className="flex flex-col gap-12">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionHeading>Practical questions, answered.</SectionHeading>
        </Reveal>

        <Reveal delay={0.06} className="mx-auto w-full max-w-3xl">
          <Card className="p-0 sm:p-0">
            <ul className="divide-y divide-white/[0.06]">
              {faqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <li key={faq.id}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${faq.id}`}
                        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-white/[0.02] sm:px-7"
                      >
                        <span className="text-[14px] font-medium tracking-wide text-white sm:text-[15px]">
                          {faq.question}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="shrink-0 text-gray-400"
                          aria-hidden
                        >
                          <Plus size={18} strokeWidth={1.5} />
                        </motion.span>
                      </button>
                    </h3>

                    {/*
                      The answer stays mounted and only its height animates.
                      Unmounting it would remove the text from the DOM, which
                      would make the FAQPage schema describe content the page
                      doesn't actually show (§5). `inert` keeps a collapsed
                      answer out of the tab order and the accessibility tree.
                    */}
                    <motion.div
                      id={`faq-panel-${faq.id}`}
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                      aria-hidden={!isOpen}
                      inert={!isOpen}
                    >
                      <div className="px-6 pb-6 sm:px-7">
                        <Body className="max-w-2xl">{faq.answer}</Body>
                      </div>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
};

export default WorkshopFaq;
