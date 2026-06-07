import type { MetadataRoute } from "next";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

type BuildLocalizedSitemapOptions = {
  baseUrl: string;
  locales: readonly string[];
  paths: readonly string[];
};

function localizedUrl(base: string, locale: string, path: string): string {
  if (path === "/") return `${base}/${locale}`;
  return `${base}/${locale}${path}`;
}

function priorityFor(path: string): number {
  if (path === "/") return 1;
  if (path.startsWith("/experiences")) return 0.7;
  return 0.8;
}

function changeFrequencyFor(path: string): ChangeFrequency {
  return path === "/" ? "weekly" : "monthly";
}

export function buildLocalizedSitemap({
  baseUrl,
  locales,
  paths,
}: BuildLocalizedSitemapOptions): MetadataRoute.Sitemap {
  const base = baseUrl.replace(/\/$/, "");
  const now = new Date();

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: localizedUrl(base, locale, path),
      lastModified: now,
      changeFrequency: changeFrequencyFor(path),
      priority: priorityFor(path),
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, localizedUrl(base, l, path)])),
      },
    })),
  );
}
