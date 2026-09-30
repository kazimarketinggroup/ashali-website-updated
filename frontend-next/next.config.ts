import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
      The design ships ~324 source images, 316 of them PNG. Serving modern
      formats is handled here rather than by re-encoding the source files, so
      every existing `import img from ".../foo.png"` keeps working untouched
      while the browser receives AVIF/WebP. This replaces the Vite build's
      vite-plugin-image-optimizer step.
    */
    formats: ["image/avif", "image/webp"],
  },

  /*
    URL parity is a hard requirement: every route in the Vite router is
    reproduced 1:1 under app/, so no redirects are needed for the migration
    itself. This hook is left in place (empty) because Phase 2 will need it for
    the three broken internal links and the placeholder-route decisions — both
    of which are still awaiting sign-off. Adding entries here is the ONLY
    sanctioned way to change a URL's behaviour.
  */
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home-booked",
        destination: "/",
        permanent: true,
      },
      {
        source: "/consulting",
        destination: "/advisory",
        permanent: true,
      },
      {
        source: "/testimonials",
        destination: "/speaking",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/change-your-life",
        destination: "/",
        permanent: true,
      },
      {
        source: "/just-eat-gets-10-5-million-in-vc-investment",
        destination: "/portfolio/just-eat",
        permanent: true,
      },
      {
        source: "/book",
        destination: "/unfair-advantage",
        permanent: true,
      },
      {
        source: "/workshop",
        destination: "/workshops",
        permanent: true,
      },
      {
        source: "/unlock",
        destination: "/the-next-level",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/updates",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/reports/:path*",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename="Global-Sales-Capability-Index-2026-Uhubs.pdf"',
          },
          {
            key: "Content-Type",
            value: "application/pdf",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
