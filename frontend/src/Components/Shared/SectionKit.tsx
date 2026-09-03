import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { BRAND_GRADIENT_LR, brandGradientTextStyle } from "../../constants/brandGradient";
import { track, type AnalyticsEvent } from "../../utils/analytics";

/*
  Shared section primitives.

  These carry no new visual style: every value below is lifted from the
  components already on the site (section padding from HelpingLeaderSection,
  eyebrow from AshAliHero, card frame from SignatureTalks, gradient-ring card
  from HelpingLeaderSection, buttons from AshAliHero). They exist so the new
  content sections reuse the existing design tokens instead of re-declaring
  them page by page.
*/

/**
 * Page section shell.
 *
 * The horizontal gutter is `px-4 sm:px-6 lg:px-8`, matching SiteHeader exactly,
 * so section content lines up with the navbar (and footer) at every breakpoint.
 * Keep these in sync — changing the gutter here without changing the header
 * makes the whole site look misaligned.
 */
export const SECTION_GUTTER = "px-4 sm:px-6 lg:px-8";

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => <div className={`mx-auto w-full max-w-fluid ${className}`}>{children}</div>;

export const Section: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className = "", id }) => (
  <section id={id} className={`w-full bg-black py-16 md:py-20 ${SECTION_GUTTER} ${className}`}>
    <Container>{children}</Container>
  </section>
);

/** Uppercase tracked eyebrow — same treatment as the hero/section kickers. */
export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <p
    className={`text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 ${className}`}
  >
    {children}
  </p>
);

/** Section heading. `accent` renders the leading words in the brand gradient. */
export const SectionHeading: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <h2
    className={`text-white text-fluid-32 font-semibold leading-tight tracking-tight ${className}`}
  >
    {children}
  </h2>
);

export const GradientText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={brandGradientTextStyle}>{children}</span>
);

/** Body copy — the site's standard light grey paragraph. */
export const Body: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <p
    className={`text-gray-400 font-light text-[13px] sm:text-[14px] leading-[1.85] tracking-wide antialiased ${className}`}
  >
    {children}
  </p>
);

/* Shared focus ring so every CTA has a visible keyboard focus state (§6). */
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

type CtaProps = {
  to: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  /** Analytics event fired on click (§7). */
  event?: AnalyticsEvent;
};

/** Renders a CTA as an external anchor, in-page anchor, or router Link. */
function CtaLink({ to, children, external, cls, event }: CtaProps & { cls: string }) {
  const onClick = event ? () => track(event) : undefined;

  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  // Anchor links (#id) stay as plain anchors so they scroll within the page.
  if (to.startsWith("#")) {
    return (
      <a href={to} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}

/** Solid white CTA — primary button style from the hero. */
export const PrimaryLink: React.FC<CtaProps> = ({ className = "", ...props }) => (
  <CtaLink
    {...props}
    cls={`inline-block px-5 py-2.5 bg-white text-black font-semibold text-[12px] rounded-[2px] transition-colors duration-150 hover:bg-gray-100 shadow-md ${FOCUS_RING} ${className}`}
  />
);

/** Outlined CTA — secondary button style from the hero. */
export const SecondaryLink: React.FC<CtaProps> = ({ className = "", ...props }) => (
  <CtaLink
    {...props}
    cls={`inline-block px-5 py-2.5 bg-transparent border border-white/20 text-white font-medium text-[12px] rounded-[2px] transition-all duration-150 hover:border-white/60 hover:bg-white/5 ${FOCUS_RING} ${className}`}
  />
);

/**
 * Row of hero CTAs.
 *
 * On mobile the buttons stack and share one equal width, so a short label
 * ("Check availability") and a long one ("Explore keynotes and workshops")
 * don't render at two different widths. From `sm:` up they sit inline at their
 * natural width, exactly as before.
 *
 * `items-stretch` + `text-center` do the work: the flex column makes each child
 * fill the row, and the label stays centred inside it.
 */
export const CtaRow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`flex flex-col items-stretch gap-3 text-center sm:flex-row sm:flex-wrap sm:items-center sm:text-left ${className}`}
  >
    {children}
  </div>
);

/** Matte card frame — the SignatureTalks / ContactSection panel treatment. */
export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className = "", id }) => (
  <div
    id={id}
    className={`bg-[#0c0c0c] border border-white/[0.06] rounded-[4px] p-6 sm:p-8 ${className}`}
  >
    {children}
  </div>
);

/**
 * Gradient-ringed card — the HelpingLeaderSection treatment.
 *
 * `bgImage` fills the whole inner card. It has to be applied on the padded
 * element itself rather than on a child: a child sits inside the padding box,
 * so it can only cover the content area and leaves an inset border of bare
 * card colour around the image.
 */
export const GradientCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
  /** 0–100. Kept low so body copy stays readable over the photo. */
  bgOpacity?: number;
}> = ({ children, className = "", bgImage, bgOpacity = 18 }) => (
  <div className={`rounded-lg p-[1px] ${className}`} style={{ background: BRAND_GRADIENT_LR }}>
    <div className="relative h-full w-full overflow-hidden rounded-[7px] bg-[#080808] p-6 sm:p-8">
      {bgImage && (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})`, opacity: bgOpacity / 100 }}
            aria-hidden
          />
          {/* Keeps text contrast up where the photo is light. */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent"
            aria-hidden
          />
        </>
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  </div>
);

/** Fade-up wrapper matching the site's existing scroll reveal. */
export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

/** Bulleted list with the small gradient dot used in existing list sections. */
export const CheckList: React.FC<{ items: string[]; className?: string }> = ({
  items,
  className = "",
}) => (
  <ul className={`space-y-3 ${className}`}>
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span
          className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full"
          style={{ background: BRAND_GRADIENT_LR }}
          aria-hidden
        />
        <span className="text-gray-400 font-light text-[13px] sm:text-[14px] leading-[1.7] tracking-wide antialiased">
          {item}
        </span>
      </li>
    ))}
  </ul>
);

/**
 * Proof strip — the dot-separated credential row used on the hero and
 * about page. Renders as a list for assistive tech.
 */
export const ProofStrip: React.FC<{ items: string[]; className?: string }> = ({
  items,
  className = "",
}) => (
  <ul className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${className}`}>
    {items.map((item, i) => (
      <li key={item} className="flex items-center gap-3">
        <span className="text-[11px] sm:text-[12px] font-light tracking-wide text-gray-400">
          {item}
        </span>
        {i < items.length - 1 && (
          <span className="text-gray-600" aria-hidden>
            ·
          </span>
        )}
      </li>
    ))}
  </ul>
);

/**
 * Photograph in a fixed-ratio frame.
 *
 * The wrapper reserves space from the aspect ratio, so images never shift
 * layout as they load (§6). Everything below the fold lazy-loads; pass
 * `priority` for an above-the-fold image that should load eagerly.
 */
export const MediaFrame: React.FC<{
  src: string;
  alt: string;
  /** Tailwind aspect class, e.g. "aspect-video", "aspect-[4/5]". */
  ratio?: string;
  className?: string;
  /** Object-position tweak for awkward crops. */
  position?: string;
  priority?: boolean;
}> = ({ src, alt, ratio = "aspect-video", className = "", position = "object-center", priority }) => (
  <div className={`relative w-full overflow-hidden rounded-[4px] bg-[#0c0c0c] ${ratio} ${className}`}>
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={`absolute inset-0 h-full w-full object-cover ${position}`}
      draggable="false"
    />
  </div>
);

/**
 * Placeholder badge for proof content awaiting real, approved assets (§11).
 * Deliberately visible so nothing fabricated ever ships silently.
 */
export const PendingBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-[2px] border border-dashed border-white/25 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500">
    {children}
  </span>
);
