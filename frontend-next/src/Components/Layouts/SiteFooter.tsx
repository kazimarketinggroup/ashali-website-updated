"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Linkedin } from "lucide-react";
import { toast } from "sonner";

import { BRAND_GRADIENT_LR } from "../../constants/brandGradient";
import { api, getApiErrorMessage } from "../../utils/api";
import { useCMS } from "../../context/CMSContext";

type FooterLink = { label: string; to: string; external?: boolean };
type FooterColumn = { heading: string; links: FooterLink[] };

const defaultColumns: FooterColumn[] = [
  {
    heading: "Pages",
    links: [
      { label: "About", to: "/about" },
      { label: "Keynotes", to: "/speaking" },
      { label: "Workshops", to: "/workshops" },
      { label: "Book", to: "/unfair-advantage" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "Advisory", to: "/advisory" },
      { label: "Malaysia & SEA", to: "/malaysia-sea" },
      { label: "Giving Back", to: "/giving-back" },
      { label: "Sales Kickoff", to: "/sales-kickoff" },
    ],
  },
  {
    heading: "Elsewhere",
    links: [
      { label: "Uhubs.ai", to: "https://www.uhubs.ai/", external: true },
      { label: "The Unfair Academy", to: "https://www.theunfairacademy.com/", external: true },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms & Conditions", to: "/terms" },
    ],
  },
];

function GradientRingIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="me noopener noreferrer"
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full p-px transition-opacity hover:opacity-90"
      style={{ background: BRAND_GRADIENT_LR }}
    >
      <span className="flex h-full w-full items-center justify-center rounded-full bg-black text-white">{children}</span>
    </a>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SiteFooter: React.FC = () => {
  const pathname = usePathname() ?? "/";
  const { cmsData } = useCMS();
  const footer = cmsData?.footer;

  const brandName = footer?.brandName || "ASH ALI";
  const bio =
    footer?.bio ||
    "Ash Ali is a British tech entrepreneur, investor, international keynote speaker and co-author of the award winning The Unfair Advantage. He helps leaders and organisations build practical advantage in an AI shaped world. Based between London and Kuala Lumpur; working globally.";
  const locations = footer?.locations || "London • Kuala Lumpur • Global";
  const newsletterHeading = footer?.newsletterHeading || "Let's keep connected";
  const newsletterSubtitle =
    footer?.newsletterSubtitle ||
    "Ash's thinking on advantage, AI and growth, straight to your inbox.";
  const linkedinUrl = footer?.linkedinUrl || "https://uk.linkedin.com/in/ashali";
  const twitterUrl = footer?.twitterUrl || "https://x.com/Ash_Ali";
  const columns = footer?.columns && footer.columns.length > 0 ? footer.columns : defaultColumns;
  const copyright = footer?.copyright || "2026 © — Ash Ali | All Rights Reserved";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (pathname.startsWith("/cmsadmin")) {
    return null;
  }

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/newsletter/subscribe", {
        name: name.trim() || undefined,
        email: email.trim(),
        website_hp: honeypot,
      });
      toast.success(response.data?.message || "Thank you for subscribing!");
      setName("");
      setEmail("");
      setHoneypot("");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Something went wrong. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-fluid px-4 pt-12 pb-6 sm:px-6 sm:pt-14 sm:pb-6 lg:px-8 lg:pt-16 lg:pb-6">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div className="max-w-[410px]">
            <p className="text-[clamp(1.7rem,3vw,2.1rem)] font-semibold leading-none tracking-normal">
              {brandName}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {linkedinUrl && (
                <GradientRingIcon href={linkedinUrl} label="Ash Ali on LinkedIn">
                  <Linkedin className="h-4 w-4" strokeWidth={1.75} />
                </GradientRingIcon>
              )}
              {twitterUrl && (
                <GradientRingIcon href={twitterUrl} label="Ash Ali on X">
                  <IconX className="h-[15px] w-[15px]" />
                </GradientRingIcon>
              )}
            </div>

            <p className="mt-6 text-[14px] sm:text-[15px] font-normal leading-[2] text-white/86">
              {bio}
            </p>

            <p className="mt-5 text-[13px] font-normal tracking-wide text-white/55">
              {locations}
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-[clamp(1.25rem,2vw,1.55rem)] font-semibold leading-tight">
              {newsletterHeading}
            </p>
            <p className="mt-2 text-[13px] font-normal text-white/75">
              {newsletterSubtitle}
            </p>

            <form className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]" onSubmit={handleSubscribe}>
              <input
                type="text"
                name="website_hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: "absolute", opacity: 0, pointerEvents: "none", zIndex: -1, width: 0, height: 0 }}
              />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-9 min-w-0 bg-white px-6 text-[12px] font-normal text-black outline-none placeholder:text-black/60 focus:ring-1 focus:ring-white"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="h-9 min-w-0 bg-white px-6 text-[12px] font-normal text-black outline-none placeholder:text-black/60 focus:ring-1 focus:ring-white"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-9 border border-white bg-transparent px-9 text-[12px] font-normal text-white transition-colors hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? "..." : "Subscribe"}
              </button>
            </form>

            <div className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {columns.map((col) => (
                <div key={col.heading} className="min-w-0">
                  <p className="text-[13px] font-semibold text-white">{col.heading}</p>
                  <ul className="mt-4 space-y-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        {link.external ? (
                          <a
                            href={link.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[13px] font-normal text-white/70 transition-colors hover:text-white"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link href={link.to} className="text-[13px] font-normal text-white/70 transition-colors hover:text-white">
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-6 h-[3px] w-full sm:my-7" style={{ background: BRAND_GRADIENT_LR }} aria-hidden />

        <p className="text-left text-[12px] font-normal text-white/80">
          {copyright}
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
