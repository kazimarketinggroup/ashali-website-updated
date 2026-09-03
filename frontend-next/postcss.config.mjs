/*
  Classic Tailwind v3 PostCSS pipeline — identical to the Vite build's
  postcss.config.js. Note this is NOT the v4 `@tailwindcss/postcss` plugin;
  see tailwind.config.ts for why v3 is pinned.
*/
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
