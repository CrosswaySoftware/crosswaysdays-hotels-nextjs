import type { MetadataRoute } from "next";
import { buildLocalizedSitemap } from "@/lib/buildLocalizedSitemap";
import { diningBlocks } from "@/data/diningMedia";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://crosswaydayshotel.com";

const STATIC_PATHS = [
  "/",
  ...diningBlocks.map((b) => `/experiences/${b.id}`),
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return buildLocalizedSitemap({
    baseUrl: SITE_URL,
    locales: routing.locales,
    paths: STATIC_PATHS,
  });
}
