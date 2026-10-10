import type { MetadataRoute } from "next";

import { SITE_ORIGIN } from "@/src/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/cmsadmin",
          "/cmsadmin/",
          "/api/cms",
          "/api/cms/",
        ],
      },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
