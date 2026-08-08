import type { MetadataRoute } from "next";
import { env } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Personalized/private surfaces (also noindex via meta/X-Robots-Tag).
        disallow: ["/api/", "/*/reports/", "/*/share/", "/*/account/", "/*/journal", "/*/admin", "/*/order/"],
      },
    ],
    sitemap: `${env.appBaseUrl()}/sitemap.xml`,
  };
}
