import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ExperienceDetailContent } from "@/components/days/experience/ExperienceDetailContent";
import { diningBlocks } from "@/data/diningMedia";
import { isExperienceId, type ExperienceId } from "@/data/experienceIds";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => diningBlocks.map((b) => ({ locale, slug: b.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isExperienceId(slug)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "DaysHome" });
  const title = t(`dining.${slug}.title`);
  const paras = t.raw(`dining.${slug}.paragraphs`) as string[];
  const description = paras[0]?.slice(0, 160) ?? "";
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isExperienceId(slug)) {
    notFound();
  }
  setRequestLocale(locale);
  return <ExperienceDetailContent slug={slug as ExperienceId} />;
}
