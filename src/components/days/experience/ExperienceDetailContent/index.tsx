"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { daysExperienceBlocks } from "@/data/daysExperienceBlocks";
import type { ExperienceId } from "@/data/experienceIds";
import { CROSSWAY_HOME } from "@/lib/crosswayHotelHomeNav";
import styles from "./ExperienceDetailContent.module.scss";

const TILE_KEYS = ["tile0", "tile1", "tile2", "tile3", "tile4"] as const;

export function ExperienceDetailContent({ slug }: { slug: ExperienceId }) {
  const t = useTranslations("DaysHome");
  const tx = useTranslations("DaysExperience");
  const tv2 = useTranslations("DaysV2.dining");
  const block = daysExperienceBlocks.find((b) => b.id === slug);
  if (!block) return null;

  const paragraphs = t.raw(`dining.${slug}.paragraphs`) as string[];
  const title = t(`dining.${slug}.title`);
  const heroSrc = block.images[0] ?? "";

  const hoursShort = tv2(`hoursFallback.${slug}`);

  const [lede, ...restParas] = paragraphs;

  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroStage}>
          <Image src={heroSrc} alt="" fill priority className={styles.heroImg} sizes="100vw" />
          <div className={styles.heroVeil} aria-hidden />
        </div>
        <div className={styles.heroGrid}>
          <Link href={`/#${CROSSWAY_HOME.experiences}`} className={styles.back}>
            {tx("heroBack")}
          </Link>
          <p className={styles.heroEyebrow}>{tv2(`kinds.${slug}`)}</p>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.meta}>
            <span>{hoursShort}</span>
            <span className={styles.metaSep} aria-hidden>
              ·
            </span>
            <span>
              {tv2(`seats.${slug}`)} {tv2("seatsSuffix")}
            </span>
          </div>
        </div>
      </header>

      <div className={styles.section}>
        <div className={styles.body}>
          <div className={styles.side}>
            <p className={styles.aboutLabel}>{tx("aboutLabel")}</p>
          </div>
          <div className={styles.prose}>
            {lede ? <p className={styles.lede}>{lede}</p> : null}
            {restParas.map((para, idx) => (
              <p key={idx} className={styles.para}>
                {para}
              </p>
            ))}
            <div className={styles.sigBlock}>
              <p className={styles.sigEyebrow}>{tv2("highlights")}</p>
              <p className={styles.sig}>{tv2(`sig.${slug}`)}</p>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {block.images.map((src, k) => (
            <div key={src} className={`${styles.tile} ${styles[TILE_KEYS[Math.min(k, TILE_KEYS.length - 1)]]}`}>
              <Image src={src} alt="" fill className={styles.tileImg} sizes="(max-width: 1000px) 50vw, 33vw" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
