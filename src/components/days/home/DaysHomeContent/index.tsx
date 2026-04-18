"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { diningBlocks } from "@/data/diningMedia";
import { Reveal } from "@/components/motion/Reveal";
import { DaysGalleryShowcase } from "@/components/days/gallery/DaysGalleryShowcase";
import { DaysBookingPanel } from "@/components/days/booking/DaysBookingPanel";
import { DaysContactForm } from "@/components/days/contact/DaysContactForm";
import { DaysEmblaCarousel } from "@/components/days/media/DaysEmblaCarousel";
import { DaysRoomCard } from "@/components/days/rooms/DaysRoomCard";
import { DaysNearbySection } from "@/components/days/nearby/DaysNearbySection";
import { DaysTestimonials } from "@/components/days/testimonials/DaysTestimonials";
import { days } from "@/lib/media";
import styles from "./DaysHomeContent.module.scss";

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.6094305302545!2d80.22277981418843!3d12.803845022002887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525082143f7b2f%3A0xa260284c0ac52c7!2sDays%20Hotel%20by%20Wyndham%20Chennai%20OMR!5e0!3m2!1sen!2sin!4v1575021328813!5m2!1sen!2sin";

export function DaysHomeContent() {
  const t = useTranslations("DaysHome");
  const tx = useTranslations("DaysExperience");
  const booking = useTranslations("DaysBooking");

  return (
    <div className={styles.pageRoot}>
      <section className={styles.hero} id="top">
        <div className={styles.heroBg}>
          <div className={styles.heroKen}>
            <Image src={days.hero} alt="" fill priority className={styles.heroImg} sizes="100vw" />
          </div>
          <div className={styles.heroVignette} aria-hidden />
          <div className={styles.heroGrain} aria-hidden />
        </div>
        <div className={styles.heroInner}>
          <Reveal>
            <p className={styles.heroEyebrow}>{t("hero.eyebrow")}</p>
            <h1 className={styles.heroTitle}>{t("hero.title")}</h1>
            <p className={styles.heroSubtitle}>{t("hero.subtitle")}</p>
            <span className={styles.heroRule} aria-hidden />
          </Reveal>
          <div className={styles.heroBooking}>
            <DaysBookingPanel
              prominent
              labels={{
                title: booking("title"),
                checkIn: booking("checkIn"),
                checkOut: booking("checkOut"),
                rooms: booking("rooms"),
                adults: booking("adults"),
                children: booking("children"),
                submit: booking("submit"),
                placeholderDate: booking("placeholderDate"),
                childNone: booking("childNone"),
              }}
            />
          </div>
        </div>
      </section>

      <section className={styles.section} id="overview">
        <div className={styles.containerNarrow}>
          <Reveal>
            <h2 className={`${styles.sectionTitle} ${styles.headingDisplay}`}>{t("overview.title")}</h2>
            <p className={styles.prose}>{t("overview.p1")}</p>
            <p className={styles.prose}>{t("overview.p2")}</p>
          </Reveal>
        </div>
      </section>

      <section className={styles.sectionMuted} id="accommodation">
        <div className={styles.container}>
          <Reveal>
            <h2 className={`${styles.sectionTitle} ${styles.headingDisplay}`}>{t("rooms.sectionTitle")}</h2>
          </Reveal>
          <DaysRoomCard roomId="standard" />
          <DaysRoomCard roomId="deluxe" />
          <DaysRoomCard roomId="suite" />
        </div>
      </section>

      <section className={styles.section} id="restaurant">
        <div className={styles.container}>
          <Reveal>
            <h2 className={`${styles.sectionTitleCenter} ${styles.headingDisplay}`}>{t("dining.sectionTitle")}</h2>
          </Reveal>
          {diningBlocks.map((block) => {
            const paragraphs = t.raw(`dining.${block.id}.paragraphs`) as string[];
            const preview = paragraphs.length > 1 ? paragraphs.slice(0, 1) : paragraphs;
            const expHref = `/experiences/${block.id}` as const;
            return (
              <div key={block.id} className={styles.split}>
                {block.imageFirst ? (
                  <>
                    <Reveal className={styles.splitVisual}>
                      <DaysEmblaCarousel images={block.images} alt={t(`dining.${block.id}.title`)} />
                    </Reveal>
                    <Reveal className={styles.splitText}>
                      <h3 className={`${styles.splitHeading} ${styles.headingDisplay}`}>
                        <Link href={expHref} className={styles.splitHeadingLink}>
                          {t(`dining.${block.id}.title`)}
                        </Link>
                      </h3>
                      <div className={styles.prose}>
                        {preview.map((para, idx) => (
                          <p key={idx}>{para}</p>
                        ))}
                      </div>
                      <Link href={expHref} className={styles.experienceReadMore}>
                        {tx("readMore")}
                        <span className={styles.readMoreArrow} aria-hidden>
                          →
                        </span>
                      </Link>
                    </Reveal>
                  </>
                ) : (
                  <>
                    <Reveal className={styles.splitText}>
                      <h3 className={`${styles.splitHeading} ${styles.headingDisplay}`}>
                        <Link href={expHref} className={styles.splitHeadingLink}>
                          {t(`dining.${block.id}.title`)}
                        </Link>
                      </h3>
                      <div className={styles.prose}>
                        {preview.map((para, idx) => (
                          <p key={idx}>{para}</p>
                        ))}
                      </div>
                      <Link href={expHref} className={styles.experienceReadMore}>
                        {tx("readMore")}
                        <span className={styles.readMoreArrow} aria-hidden>
                          →
                        </span>
                      </Link>
                    </Reveal>
                    <Reveal className={styles.splitVisual}>
                      <DaysEmblaCarousel images={block.images} alt={t(`dining.${block.id}.title`)} />
                    </Reveal>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.sectionMuted} id="gallery">
        <div className={styles.container}>
          <DaysGalleryShowcase />
        </div>
      </section>

      <div className={styles.container}>
        <DaysTestimonials />
      </div>

      <DaysNearbySection />

      <section className={styles.sectionMuted} id="contact">
        <div className={styles.container}>
          <Reveal>
            <h2 className={`${styles.sectionTitle} ${styles.headingDisplay}`}>{t("contact.title")}</h2>
          </Reveal>
          <DaysContactForm />
          <h3 className={`${styles.mapTitle} ${styles.headingDisplay}`}>{t("contact.mapTitle")}</h3>
          <div className={styles.mapWrap}>
            <iframe
              title={t("contact.mapTitle")}
              src={MAP_EMBED}
              className={styles.mapFrame}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className={styles.tieUp} aria-hidden={false}>
        <div className={styles.container}>
          <Image
            src="/images/tie-up1.jpg"
            alt=""
            width={1200}
            height={200}
            className={styles.tieUpImg}
            sizes="100vw"
          />
        </div>
      </section>
    </div>
  );
}
