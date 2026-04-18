"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useState } from "react";
import { roomMedia, type RoomId } from "@/data/roomMedia";
import styles from "./DaysRoomCard.module.scss";

export function DaysRoomCard({ roomId }: { roomId: RoomId }) {
  const t = useTranslations(`DaysHome.rooms.${roomId}`);
  const amenities = t.raw("amenities") as string[];
  const specs = t.raw("specs") as string[];
  const media = roomMedia[roomId];
  const [open, setOpen] = useState(false);
  const title = useId();
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: dir });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <article className={styles.card}>
      <div className={styles.grid}>
        <div className={styles.visual}>
          <Image
            src={media.card}
            alt=""
            width={640}
            height={480}
            className={styles.cardImg}
            sizes="(max-width: 900px) 100vw, 40vw"
          />
        </div>
        <div className={styles.body}>
          <h3 className={styles.name}>{t("title")}</h3>
          <p className={styles.desc}>{t("description")}</p>
          <ul className={styles.specs}>
            {specs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <button type="button" className={styles.detailsBtn} onClick={() => setOpen(true)}>
            {t("detailsCta")}
          </button>
        </div>
        <div className={styles.bookCol}>
          <form
            action="https://bookings.resavenue.com/resBooking4/searchRooms"
            method="get"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bookForm}
          >
            <input type="hidden" name="curr" value="INR" />
            <input type="hidden" name="regCode" value="ZGVR1115" />
            <button type="submit" className={styles.bookBtn}>
              {t("bookNow")}
            </button>
          </form>
        </div>
      </div>

      {open ? (
        <div className={styles.modalRoot} role="presentation">
          <button type="button" className={styles.modalBackdrop} aria-label="Close" onClick={() => setOpen(false)} />
          <div
            className={styles.modalDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title}
          >
            <button type="button" className={styles.modalClose} onClick={() => setOpen(false)} aria-label="Close">
              ×
            </button>
            <div className={styles.modalGrid}>
              <div className={styles.modalAside}>
                <h2 id={title} className={styles.modalTitle}>
                  {t("title")}
                </h2>
                <p className={styles.amenityHeading}>{t("amenitiesHeading")}</p>
                <ul className={styles.amenityList}>
                  {amenities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.modalCarousel}>
                <div className={styles.embla} ref={emblaRef}>
                  <div className={styles.emblaContainer}>
                    {media.gallery.map((src) => (
                      <div className={styles.emblaSlide} key={src}>
                        <div className={styles.emblaImgWrap}>
                          <Image src={src} alt="" fill className={styles.emblaImg} sizes="(max-width: 900px) 100vw, 60vw" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.emblaArrows}>
                  <button type="button" className={styles.emblaArrow} onClick={scrollPrev} aria-label="Previous">
                    ‹
                  </button>
                  <button type="button" className={styles.emblaArrow} onClick={scrollNext} aria-label="Next">
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
