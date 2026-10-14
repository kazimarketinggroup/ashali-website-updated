"use client";

import React from "react";
import Image from "next/image";
import { motion, easeOut } from "framer-motion";

import amazonLogo from "../../../assets/book/amazon-logo.png";
import audibleLogo from "../../../assets/book/audibleLogo.png";
import waterstonesLogo from "../../../assets/book/waterStonesLogo.png";
import barnesLogo from "../../../assets/book/barnes-and-noble-logo.png";
import appleLogo from "../../../assets/book/appleLogo.png";

const retailers = [
  {
    image: amazonLogo,
    alt: "Amazon",
    href: "https://www.amazon.co.uk/dp/1788163311",
  },
  {
    image: audibleLogo,
    alt: "Audible",
    href: "https://www.audible.com/pd/The-Unfair-Advantage-Audiobook/B09GD3Z8QB",
  },
  {
    image: waterstonesLogo,
    alt: "Waterstones",
    href: "https://www.waterstones.com/book/the-unfair-advantage/ash-ali/hasan-kubba/9781788167543",
  },
  {
    image: barnesLogo,
    alt: "Barnes & Noble",
    href: "https://www.barnesandnoble.com/w/the-unfair-advantage-ash-ali/1139985540",
  },
  {
    image: appleLogo,
    alt: "Apple Books",
    href: "https://books.apple.com/gb/book/the-unfair-advantage/id1584662439",
  },
];

import Link from "next/link";

const BookRetailers: React.FC = () => {
  return (
    <section id="retailers" className="bg-black py-16 md:py-24 text-white">
      <div className="mx-auto max-w-fluid px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="text-center text-fluid-28 font-semibold tracking-tight"
        >
          Get your copy of &apos;The Unfair Advantage&apos;
        </motion.h2>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {retailers.map((r) => (
          <a
            key={r.alt}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Buy The Unfair Advantage on ${r.alt}`}
            className="flex h-[64px] items-center justify-center rounded-md border border-white/10 bg-[#121212] px-4 transition-colors duration-200 hover:border-white/30 hover:bg-[#181818]"
          >
            <Image src={r.image} alt={r.alt} width={130} height={32} loading="lazy" className="max-h-8 w-auto max-w-[130px] object-contain opacity-95" />
          </a>
        ))}
      </div>

        <div className="mt-8 text-center">
          <Link
            href="/contact?type=bulk-book"
            className="text-[#d97736] hover:text-[#f97316] text-[13px] sm:text-[14px] font-medium transition-colors hover:underline tracking-wide"
          >
            Bulk book enquiry
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BookRetailers;
