"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./DaysNearbySection.module.scss";

type Essential = { label: string; detail: string; distance: string };
type Landmark = { name: string; distance: string };

export function DaysNearbySection() {
  const t = useTranslations("DaysHome");
  const essentials = t.raw("nearby.essentials") as Essential[];
  const landmarks = t.raw("nearby.landmarks") as Landmark[];

  return (
    <section className={styles.nearby} id="nearby" aria-labelledby="nearby-heading">
      <div className={styles.nearbyAmbient} aria-hidden />
      <div className={styles.inner}>
        <Reveal>
          <header className={styles.header}>
            <h2 id="nearby-heading" className={styles.title}>
              {t("nearby.title")}
            </h2>
            <span className={styles.titleRule} aria-hidden />
            <p className={styles.subtitle}>{t("nearby.subtitle")}</p>
          </header>
        </Reveal>

        <div className={styles.essentials}>
          {essentials.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.06}>
              <article className={styles.essentialCard}>
                <span className={styles.essentialAccent} aria-hidden />
                <p className={styles.essentialLabel}>{item.label}</p>
                <p className={styles.essentialDetail}>{item.detail}</p>
                <p className={styles.essentialDistance}>
                  <span className={styles.essentialDistanceValue}>{item.distance}</span>
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className={styles.landmarksBoard}>
            <h3 className={styles.landmarksHeading}>{t("nearby.landmarksHeading")}</h3>
            <ul className={styles.landmarkList}>
              {landmarks.map((row) => (
                <li key={row.name} className={styles.landmarkRow}>
                  <span className={styles.landmarkName}>{row.name}</span>
                  <span className={styles.landmarkFiller} aria-hidden />
                  <span className={styles.landmarkDist}>{row.distance}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
