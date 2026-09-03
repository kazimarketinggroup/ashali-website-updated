import React from "react";
import { Link } from "react-router-dom";

import { BRAND_GRADIENT_LR } from "../../../constants/brandGradient";

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string;
  linkClassName?: string;
};

const GradientBorderLink: React.FC<Props> = ({ to, children, className = "", linkClassName = "" }) => (
  <span className={`inline-block rounded-none p-px ${className}`} style={{ background: BRAND_GRADIENT_LR }}>
    <Link
      to={to}
      className={`block rounded-none bg-black px-6 py-2 text-xs font-bold text-white transition-colors hover:bg-neutral-950 sm:px-8 sm:text-sm ${linkClassName}`}
    >
      {children}
    </Link>
  </span>
);

export default GradientBorderLink;
