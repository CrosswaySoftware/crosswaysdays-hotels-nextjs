"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/design-system/components/Eyebrow";
import styles from "./DaysTestimonials.module.scss";

type Item = { name: string; quote: string; from?: string };

export function DaysTestimonials() {
  const t = useTranslations("DaysHome.testimonials");
  const items = t.raw("items") as Item[];
  const reduceMotion = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduceMotion || items.length < 2) return;
    const id = window.setInterval(() => setI((x) => (x + 1) % items.length), 7000);
    return () => window.clearInterval(id);
  }, [items.length, reduceMotion]);

  const cur = items[i] ?? items[0];
  const fromLabel = cur?.from?.trim() ? cur.from : t("guestLabel");

  return (
    <section className={styles.root} aria-labelledby="days-testimonials-eyebrow">
      <div className={styles.grid}>
        <div className={styles.side}>
          <div id="days-testimonials-eyebrow">
            <Eyebrow>{t("title")}</Eyebrow>
          </div>
          <div className={styles.stars}>
            <div className={styles.qsRow}>
              <span>{t("rating")}</span>
              <span className={styles.qsStars} aria-hidden>
                ★★★★★
              </span>
            </div>
            <span className={styles.qsMeta}>{t("ratingMeta")}</span>
          </div>
          <div className={styles.nav} role="tablist" aria-label={t("navLabel")}>
            {items.map((_, n) => (
              <button
                key={n}
                type="button"
                role="tab"
                aria-selected={n === i}
                className={`${styles.qn} ${n === i ? styles.qnOn : ""}`}
                onClick={() => setI(n)}
              >
                {String(n + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.mark} aria-hidden>
            “
          </div>
          <blockquote key={i} className={styles.text}>
            {cur?.quote}
          </blockquote>
          <div className={styles.attr}>
            <span className={styles.name}>{cur?.name}</span>
            <span className={styles.from}>{fromLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
