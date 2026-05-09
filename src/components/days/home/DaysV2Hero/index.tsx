"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { daysHeroSlideSources } from "@/lib/daysSiteAssets";
import { CROSSWAY_HOME } from "@/lib/crosswayHotelHomeNav";
import { imageBlurPlaceholder } from "@/lib/imagePlaceholder";
import { RESAVENUE_BOOK_DIRECT_URL } from "@/lib/resavenueBooking";
import styles from "./DaysV2Hero.module.scss";

/** Match Palomar hero dwell time for readability across slides. */
const AUTOPLAY_MS = 15000;

export function DaysV2Hero({ bookingSlot }: { bookingSlot: ReactNode }) {
  const t = useTranslations("DaysV2");
  const slidesMeta = t.raw("slides") as { area: string; caption: string }[];
  const locale = useLocale();
  const dir = (locale === "ar" ? "rtl" : "ltr") as "rtl" | "ltr";

  const slides = daysHeroSlideSources;

  const options = useMemo(
    () => ({
      loop: true,
      align: "start" as const,
      axis: "x" as const,
      direction: dir,
      duration: 32,
    }),
    [dir],
  );

  const plugins = useMemo(
    () => [
      Autoplay({
        delay: AUTOPLAY_MS,
        playOnInit: true,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: false,
        stopOnLastSnap: false,
      }),
    ],
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const meta = slidesMeta[selected] ?? slidesMeta[0];

  return (
    <section className={styles.wrap} id="top" aria-label={t("ariaLabel")}>
      <div className={styles.stage}>
        <div className={styles.emblaViewport} ref={emblaRef}>
          <div className={styles.emblaContainer}>
            {slides.map((src, index) => (
              <div key={src} className={styles.emblaSlide}>
                <Image
                  {...imageBlurPlaceholder}
                  src={src}
                  alt=""
                  fill
                  className={styles.slideImage}
                  sizes="100vw"
                  quality={88}
                  priority={index < 4}
                  fetchPriority={index === 0 ? "high" : undefined}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.veil} aria-hidden />
      </div>

      <div className={styles.grid}>
        <div className={styles.eyeline}>
          <span>{t("coord")}</span>
          <span className={styles.line} />
          <span>{t("place")}</span>
        </div>

        <p className={styles.h1seo}>{t("titleSeo")}</p>

        <div className={styles.titleBlock}>
          <span className={styles.row}>{t("line1")}</span>
          <span className={`${styles.row} ${styles.italic}`}>{t("line2")}</span>
          <span className={styles.row}>{t("line3")}</span>
          <span className={`${styles.row} ${styles.italic}`}>{t("line4")}</span>
        </div>

        <p className={styles.sub}>{t("sub")}</p>

        <div className={styles.meta}>
          <div className={styles.metaCol}>
            <span className={styles.metaNum}>{t("numRooms")}</span>
            <span className={styles.metaLbl}>{t("metaRooms")}</span>
          </div>
          <div className={styles.metaCol}>
            <span className={styles.metaNum}>{t("numVenues")}</span>
            <span className={styles.metaLbl}>{t("metaVenues")}</span>
          </div>
          <div className={styles.metaCol}>
            <span className={styles.metaNum}>{t("numPlace")}</span>
            <span className={styles.metaLbl}>{t("metaPlace")}</span>
          </div>
          <div className={`${styles.metaCol} ${styles.metaCta}`}>
            <a href={RESAVENUE_BOOK_DIRECT_URL} className={styles.btnPrimary} target="_blank" rel="noopener noreferrer">
              {t("ctaBook")}
            </a>
            <Link href={`/#${CROSSWAY_HOME.experiences}`} className={styles.btnGhost}>
              {t("ctaDining")}
            </Link>
          </div>
        </div>

        <div className={styles.foot}>
          <div>
            <div className={styles.capArea}>{meta?.area}</div>
            <div className={styles.capText}>{meta?.caption}</div>
          </div>
          <div className={styles.dots}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === selected ? styles.dotOn : ""}`}
                aria-label={t("dotAria", { n: i + 1, total: slides.length })}
                aria-current={i === selected ? "true" : undefined}
                onClick={() => scrollTo(i)}
              >
                <span className={styles.dotNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.dotBar}>
                  <span className={styles.dotBarFill} key={`${selected}-${i}`} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bookSlot}>{bookingSlot}</div>
    </section>
  );
}
