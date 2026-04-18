"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { galleryAll } from "@/data/galleryMedia";
import styles from "./DaysGalleryShowcase.module.scss";

/** Brand mark in gallery header (SVG shipped under `public/images/`). */
const GALLERY_LOGO = "/images/crossway_logo.svg";

const SLIDES = galleryAll;

export function DaysGalleryShowcase({ showHeader = true }: { showHeader?: boolean }) {
  const t = useTranslations("DaysHome.gallery");
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState(0);

  const autoplay = useMemo(() => {
    if (reduceMotion) return [];
    return [
      Autoplay({
        delay: 5200,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ];
  }, [reduceMotion]);

  const [mainRef, mainApi] = useEmblaCarousel({ loop: true, align: "center", direction: dir }, autoplay);
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    direction: dir,
    align: "start",
  });

  const onSelect = useCallback(() => {
    if (!mainApi) return;
    const i = mainApi.selectedScrollSnap();
    setSelected(i);
    thumbApi?.scrollTo(i);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("reInit", onSelect).on("select", onSelect);
    return () => {
      mainApi.off("reInit", onSelect).off("select", onSelect);
    };
  }, [mainApi, onSelect]);

  const scrollPrev = useCallback(() => mainApi?.scrollPrev(), [mainApi]);
  const scrollNext = useCallback(() => mainApi?.scrollNext(), [mainApi]);

  const onThumbClick = useCallback(
    (index: number) => {
      mainApi?.scrollTo(index);
    },
    [mainApi],
  );

  const showDots = SLIDES.length <= 14;

  return (
    <div className={styles.root}>
      {showHeader ? (
        <header className={styles.header}>
          <div className={styles.brandRow}>
            <Image
              src={GALLERY_LOGO}
              alt=""
              width={72}
              height={72}
              className={styles.brandMark}
              priority={false}
            />
            <div>
              <h2 id="days-gallery-heading" className={styles.title}>
                {t("sectionTitle")}
              </h2>
              <p className={styles.intro}>{t("intro")}</p>
              <p className={styles.hint}>{t("slideshowHint")}</p>
            </div>
          </div>
        </header>
      ) : null}

      <div className={styles.stage}>
        <div className={styles.slideCounter} aria-live="polite">
          {selected + 1} / {SLIDES.length}
        </div>

        <div className={styles.stageInner}>
          <div className={styles.mainViewport} ref={mainRef}>
            <div className={styles.mainTrack}>
              {SLIDES.map((item, index) => (
                <div className={styles.mainSlide} key={`${item.src}-${index}`}>
                  <div className={styles.mainImageWrap}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className={styles.mainImg}
                      sizes="(max-width: 900px) 100vw, min(1100px, 92vw)"
                      priority={index === 0}
                    />
                    <p className={styles.caption}>{item.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.controls}>
            <button type="button" className={styles.ctrlBtn} onClick={scrollPrev} aria-label={t("prev")}>
              ‹
            </button>
            <button type="button" className={styles.ctrlBtn} onClick={scrollNext} aria-label={t("next")}>
              ›
            </button>
          </div>
        </div>

        {showDots ? (
          <div className={styles.dots} role="tablist" aria-label={t("dotsLabel")}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={selected === i}
                className={`${styles.dot} ${selected === i ? styles.dotActive : ""}`}
                onClick={() => onThumbClick(i)}
                aria-label={t("goToSlide", { n: i + 1 })}
              />
            ))}
          </div>
        ) : null}

        <div className={styles.thumbsWrap}>
          <div className={styles.thumbViewport} ref={thumbRef}>
            <div className={styles.thumbTrack}>
              {SLIDES.map((item, index) => (
                <button
                  key={`thumb-${index}-${item.src}`}
                  type="button"
                  className={`${styles.thumbBtn} ${selected === index ? styles.thumbBtnActive : ""}`}
                  onClick={() => onThumbClick(index)}
                  aria-label={item.alt}
                  aria-current={selected === index}
                >
                  <Image src={item.src} alt="" fill className={styles.thumbImg} sizes="88px" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
