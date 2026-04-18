"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { diningBlocks } from "@/data/diningMedia";
import type { ExperienceId } from "@/data/experienceIds";
import { DaysEmblaCarousel } from "@/components/days/media/DaysEmblaCarousel";
import styles from "./ExperienceDetailContent.module.scss";

export function ExperienceDetailContent({ slug }: { slug: ExperienceId }) {
  const t = useTranslations("DaysHome");
  const tx = useTranslations("DaysExperience");
  const block = diningBlocks.find((b) => b.id === slug);
  if (!block) return null;

  const paragraphs = t.raw(`dining.${slug}.paragraphs`) as string[];
  const title = t(`dining.${slug}.title`);
  const heroSrc = block.images[0] ?? "";

  return (
    <article className={styles.page}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <ol className={styles.breadcrumbList}>
          <li>
            <Link href="/" className={styles.breadcrumbLink}>
              {tx("breadcrumbHome")}
            </Link>
          </li>
          <li className={styles.breadcrumbSep} aria-hidden>
            /
          </li>
          <li>
            <Link href="/#restaurant" className={styles.breadcrumbLink}>
              {tx("breadcrumbExperiences")}
            </Link>
          </li>
          <li className={styles.breadcrumbSep} aria-hidden>
            /
          </li>
          <li className={styles.breadcrumbCurrent}>{title}</li>
        </ol>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src={heroSrc}
            alt=""
            fill
            priority
            className={styles.heroImg}
            sizes="100vw"
          />
          <div className={styles.heroScrim} aria-hidden />
          <div className={styles.heroGrain} aria-hidden />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>{tx("heroEyebrow")}</p>
          <h1 className={styles.heroTitle}>{title}</h1>
          <span className={styles.heroRule} aria-hidden />
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.prose}>
          {paragraphs.map((para, idx) => (
            <p key={idx} className={styles.para}>
              {para}
            </p>
          ))}
        </div>

        <section className={styles.gallerySection} aria-labelledby="exp-gallery-heading">
          <h2 id="exp-gallery-heading" className={styles.galleryTitle}>
            {tx("galleryHeading")}
          </h2>
          <div className={styles.carouselWrap}>
            <DaysEmblaCarousel images={block.images} alt={title} />
          </div>
        </section>

        <div className={styles.actions}>
          <Link href="/#restaurant" className={styles.backLink}>
            <span className={styles.backArrow} aria-hidden>
              ←
            </span>
            {tx("back")}
          </Link>
        </div>
      </div>
    </article>
  );
}
