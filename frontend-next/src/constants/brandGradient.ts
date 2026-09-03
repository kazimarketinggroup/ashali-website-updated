import type { CSSProperties } from "react";

/** Navbar rule + footer rule / icon rings — design picker */
export const BRAND_GRADIENT_LR = "linear-gradient(90deg, #FF781D 0%, #008080 100%)";

/** Solid stops (borders, accents that cannot use gradient text) */
export const BRAND_ORANGE = "#FF781D";
export const BRAND_TEAL = "#008080";

/** Gradient-filled text (orange → teal, left to right) */
export const brandGradientTextStyle: CSSProperties = {
  backgroundImage: BRAND_GRADIENT_LR,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
};
