"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useCallback } from "react";
import styles from "./DaysEmblaCarousel.module.scss";

export function DaysEmblaCarousel({
  images,
  alt,
  className,
}: {
  images: readonly string[];
  alt: string;
  className?: string;
}) {
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: dir });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className={`${styles.root} ${className ?? ""}`}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {images.map((src) => (
            <div className={styles.slide} key={src}>
              <div className={styles.imageWrap}>
                <Image src={src} alt={alt} fill className={styles.img} sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.arrows}>
        <button type="button" className={styles.arrow} onClick={scrollPrev} aria-label="Previous">
          ‹
        </button>
        <button type="button" className={styles.arrow} onClick={scrollNext} aria-label="Next">
          ›
        </button>
      </div>
    </div>
  );
}
