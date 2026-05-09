"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useId, useCallback, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { DisplayHeading } from "@/design-system/components/DisplayHeading";
import { Eyebrow } from "@/design-system/components/Eyebrow";
import { DAYS_MAP_EMBED, DAYS_MAP_OPEN } from "@/lib/maps";
import styles from "./DaysNearbySection.module.scss";

type NearbyRow = { name: string; dist: string; unit: string; note: string };

type NearbyGroup = { title: string; rows: NearbyRow[] };

export function DaysNearbySection() {
  const t = useTranslations("DaysHome.nearby");
  const locale = useLocale();
  const groups = t.raw("groups") as NearbyGroup[];
  const uid = useId().replace(/:/g, "");
  const gridPatternId = `days-near-grid-${uid}`;
  const coastGradId = `days-near-coast-${uid}`;

  const emblaDir = locale === "ar" ? ("rtl" as const) : ("ltr" as const);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    axis: "x",
    direction: emblaDir,
  });
  const [tab, setTab] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setTab(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("reInit", onSelect).on("select", onSelect);
    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, emblaDir]);

  const goTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <section className={styles.root} id="nearby" aria-labelledby="days-nearby-heading">
      <div className={styles.inner}>
        <Reveal>
          <header className={styles.head} id="days-nearby-heading">
            <Eyebrow>{t("title")}</Eyebrow>
            <DisplayHeading as="h2" className={`${styles.display} ${styles.displayCompact}`}>
              {t.rich("headline", {
                em: (chunks) => <em className={styles.displayEm}>{chunks}</em>,
              })}
            </DisplayHeading>
          </header>
        </Reveal>

        <div className={styles.grid}>
          <div className={styles.list}>
            {groups.map((g) => (
              <article key={g.title} className={styles.groupCard}>
                <h3 className={styles.groupTitle}>{g.title}</h3>
                <ul className={styles.placeList}>
                  {g.rows.map((n) => (
                    <li key={`${g.title}-${n.name}`} className={styles.place}>
                      <div className={styles.placeTop}>
                        <span className={styles.placeName}>{n.name}</span>
                        <span className={styles.distPill}>
                          <span className={styles.distNum}>{n.dist}</span>
                          <span className={styles.distUnit}>{n.unit}</span>
                        </span>
                      </div>
                      <span className={styles.placeCat}>{n.note}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className={styles.mapCol}>
            <div className={styles.mapSlider}>
              <div className={styles.mapViewport} ref={emblaRef}>
                <div className={styles.mapTrack}>
                  <div className={styles.mapSlide}>
                    <div className={styles.mapSlideInner}>
                      <iframe
                        title={t("mapSlideGoogle")}
                        src={DAYS_MAP_EMBED}
                        className={styles.mapIframe}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  <div className={styles.mapSlide}>
                    <div className={`${styles.mapSlideInner} ${styles.mapSlideDiagram}`}>
                      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet" className={styles.svg}>
                        <defs>
                          <pattern id={gridPatternId} width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M20 0 L0 0 0 20" fill="none" stroke="rgba(20,18,16,0.06)" strokeWidth="1" />
                          </pattern>
                          <linearGradient id={coastGradId} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="rgba(70,130,180,0)" />
                            <stop offset="100%" stopColor="rgba(70,130,180,0.09)" />
                          </linearGradient>
                        </defs>
                        <rect width="400" height="500" fill={`url(#${gridPatternId})`} />
                        <path d="M 310 40 L 400 40 L 400 460 L 310 460 L 310 40 Z" fill={`url(#${coastGradId})`} opacity={0.85} />
                        <path
                          d="M 305 60 Q 295 250 305 440"
                          stroke="rgba(46, 139, 180, 0.35)"
                          strokeWidth="1.5"
                          fill="none"
                          strokeDasharray="3 5"
                        />
                        <text x="295" y="248" style={{ fontFamily: "ui-monospace,monospace", fontSize: "9px", fill: "rgba(20,18,16,0.42)" }}>
                          CHENNAI
                        </text>
                        <text x="285" y="268" style={{ fontFamily: "ui-monospace,monospace", fontSize: "10px", fill: "rgba(20,18,16,0.48)" }}>
                          COASTAL BELT
                        </text>
                        <line x1="190" y1="56" x2="190" y2="444" stroke="rgba(20,18,16,0.22)" strokeWidth="2.5" />
                        <line x1="190" y1="268" x2="298" y2="268" stroke="rgba(20,18,16,0.16)" strokeWidth="1.5" strokeDasharray="4 5" />
                        <text x="175" y="48" style={{ fontFamily: "ui-monospace,monospace", fontSize: "10px", fill: "rgba(20,18,16,0.48)" }}>
                          OLD MAHABALIPURAM RD
                        </text>
                        <circle cx="190" cy="268" r="13" fill="#b07d4b" stroke="#1a1714" strokeWidth="1.5" />
                        <circle cx="190" cy="268" r="32" fill="none" stroke="#b07d4b" strokeOpacity="0.45" />
                        <circle cx="190" cy="268" r="56" fill="none" stroke="#b07d4b" strokeOpacity="0.22" />
                        <text x="155" y="273" style={{ fontFamily: "ui-monospace,monospace", fontSize: "10px", fill: "#1a1714", fontWeight: 600 }}>
                          CROSSWAY DAYS
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mapTabs} role="tablist" aria-label={t("mapViewsLabel")}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === 0}
                  className={`${styles.mapTab} ${tab === 0 ? styles.mapTabOn : ""}`}
                  onClick={() => goTo(0)}
                >
                  {t("mapSlideGoogle")}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === 1}
                  className={`${styles.mapTab} ${tab === 1 ? styles.mapTabOn : ""}`}
                  onClick={() => goTo(1)}
                >
                  {t("mapSlideDiagram")}
                </button>
              </div>
            </div>
            <div className={styles.mapCap}>
              <span>{t("mapAddress")}</span>
              <a className={styles.mapLink} href={DAYS_MAP_OPEN} target="_blank" rel="noopener noreferrer">
                {t("openMaps")} <span aria-hidden>→</span>
              </a>
            </div>
            <p className={styles.mapHint}>{t("mapHint")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
