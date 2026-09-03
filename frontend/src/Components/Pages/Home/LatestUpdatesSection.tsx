import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "react-router-dom";

import blog1 from "../../../assets/home/blog1.png";
import blog2 from "../../../assets/home/blog2.png";
import blog3 from "../../../assets/home/blog3.png";

const CATEGORY = "#A67C52";

type UpdateCard = {
  image: string;
  title: string;
  category: string;
  date?: string;
  description: string;
  podcastUi?: boolean;
};

const updates: UpdateCard[] = [
  {
    image: blog1,
    title: "How You Already Have What It Takes To Succeed",
    category: "Featured Podcast",
    date: "4 Apr 2023",
    description:
      "Discover how to leverage your unique strengths for success with Hasan Kubba & Ash Ali in this Talks at Google episode.",
    podcastUi: true,
  },
  {
    image: blog2,
    title:
      "You Might Be Overlooking Your Unfair Advantage: Here's How To Find It",
    category: "Press Release",
    description:
      "Many believe proper education, pedigree, and money are paramount to success. If that is the case, billionaires and icons like Oprah Winfrey never would have made their mark.",
  },
  {
    image: blog3,
    title:
      "How The Successful Leverage Their Opportunities And How We Can Use Ours",
    category: "Press Release",
    description:
      "Realistically, the authors – Ash Ali and Hasan Kubba advocate for a hybrid 'reality growth mindset.'",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

type LatestUpdatesSectionProps = {
  /** Hide the in-section “Latest Updates” title (e.g. when the page already has an H1). */
  hideHeading?: boolean;
};

const LatestUpdatesSection: React.FC<LatestUpdatesSectionProps> = ({
  hideHeading = false,
}) => {
  return (
    <section className="bg-black text-white py-16 md:py-20 font-sans">
      <div className="mx-auto max-w-fluid px-4 sm:px-6 lg:px-8">
        {!hideHeading && (
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-lg font-normal tracking-tight sm:mb-12 sm:text-xl lg:mb-14"
          >
            Latest Updates
          </motion.h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {updates.map((item, idx) => (
            <motion.article
              key={item.title}
              custom={idx}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              className="flex flex-col text-left"
            >
              <div className="relative mb-5 overflow-hidden rounded-2xl">
                <img
                  src={item.image}
                  alt=""
                  className="aspect-[16/10] w-full object-cover"
                />
                {item.podcastUi && (
                  <>
                    <span className="absolute right-3 top-3 text-[10px] sm:text-xs font-medium tracking-wide text-white drop-shadow-md">
                      Talks at Google
                    </span>
                    <div
                      className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#e62117] shadow-lg"
                      aria-hidden
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="ml-0.5"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </>
                )}
              </div>

              <h3 className="text-xs sm:text-[0.8125rem] font-normal leading-snug tracking-wide text-white mb-4">
                {item.title}
              </h3>

              <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span style={{ color: CATEGORY }}>{item.category}</span>
                {item.date ? (
                  <span className="ml-auto text-white">{item.date}</span>
                ) : null}
              </div>

              <p className="text-sm sm:text-[0.9375rem] leading-relaxed text-white/95 font-normal">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-12 sm:mt-14 lg:mt-16 flex justify-center"
        >
          <Link
            to="/updates"
            className="rounded-sm border border-white bg-transparent px-8 py-2.5 text-sm font-normal text-white transition-colors hover:bg-white/10"
          >
            View more updates
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestUpdatesSection;
