"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./DaysTestimonials.module.scss";

export function DaysTestimonials() {
  const t = useTranslations("DaysHome.testimonials");
  const items = t.raw("items") as { name: string; quote: string }[];
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const reduceMotion = useReducedMotion();

  const plugins = useMemo(() => {
    if (reduceMotion) return [];
    return [
      Autoplay({
        delay: 5200,
        playOnInit: true,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ];
  }, [reduceMotion]);

  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", direction: dir, slidesToScroll: 1 }, plugins);

  return (
    <section className={styles.section} aria-labelledby="days-testimonials-heading">
      <h2 id="days-testimonials-heading" className={styles.heading}>
        {t("title")}
      </h2>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.track}>
          {items.map((item, i) => (
            <div className={styles.slide} key={`${item.name}-${i}`}>
              <blockquote className={styles.card}>
                <p className={styles.quote}>{item.quote}</p>
                <footer className={styles.author}>{item.name}</footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
