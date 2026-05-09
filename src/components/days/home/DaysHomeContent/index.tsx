"use client";

import { useTranslations } from "next-intl";
import { DisplayHeading } from "@/design-system/components/DisplayHeading";
import { Eyebrow } from "@/design-system/components/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { DaysGalleryShowcase } from "@/components/days/gallery/DaysGalleryShowcase";
import { DaysBookingPanel } from "@/components/days/booking/DaysBookingPanel";
import { DaysContactHomeBlock } from "@/components/days/contact/DaysContactHomeBlock";
import { DaysNearbySection } from "@/components/days/nearby/DaysNearbySection";
import { DaysTestimonials } from "@/components/days/testimonials/DaysTestimonials";
import {
  DaysV2DiningStrip,
  DaysV2GalleryMosaic,
  DaysV2RoomsBoard,
  DaysV2StorySection,
} from "@/components/hotel-v2/home/DaysV2Sections";
import { DaysV2Hero } from "@/components/days/home/DaysV2Hero";
import v2SectionStyles from "@/components/hotel-v2/home/DaysV2Sections/DaysV2Sections.module.scss";
import { CROSSWAY_HOME } from "@/lib/crosswayHotelHomeNav";
import { RESAVENUE_BOOK_DIRECT_URL } from "@/lib/resavenueBooking";
import styles from "./DaysHomeContent.module.scss";

export function DaysHomeContent() {
  const t = useTranslations("DaysHome");
  const tb = useTranslations("DaysBooking");
  const vc = useTranslations("DaysV2.contact");
  const whyPoints = (t.raw("whyChoose.points") as string[]) ?? [];

  const bookingSlot = (
    <div id={CROSSWAY_HOME.book} className={styles.bookingDock}>
      <DaysBookingPanel
        prominent
        labels={{
          title: tb("title"),
          checkIn: tb("checkIn"),
          checkOut: tb("checkOut"),
          rooms: tb("rooms"),
          adults: tb("adults"),
          children: tb("children"),
          submit: tb("submit"),
          placeholderDate: tb("placeholderDate"),
          childNone: tb("childNone"),
        }}
      />
    </div>
  );

  return (
    <div className={styles.pageRoot}>
      <DaysV2Hero bookingSlot={bookingSlot} />

      <DaysV2StorySection />
      <DaysV2RoomsBoard sectionId={CROSSWAY_HOME.accommodation} />
      <DaysV2DiningStrip sectionId={CROSSWAY_HOME.experiences} />
      <DaysV2GalleryMosaic sectionId={CROSSWAY_HOME.gallery} />

      <section id={CROSSWAY_HOME.galleryAll} className={styles.galleryEmbed} aria-label={t("gallery.sectionTitle")}>
        <DaysGalleryShowcase showHeader={false} />
      </section>

      <section className={styles.whyCta} id="why-days" aria-labelledby="why-days-heading">
        <Reveal>
          <div className={styles.whyCtaGrid}>
            <div className={styles.whyCtaEye}>
              <Eyebrow tone="dark">{t("whyChoose.eyebrow")}</Eyebrow>
            </div>
            <h2 id="why-days-heading" className={styles.whyCtaTitle}>
              {t("whyChoose.titleBefore")}
              <em>{t("whyChoose.titleEm")}</em>
              {t("whyChoose.titleAfter")}
            </h2>
            <div className={styles.whyCtaSide}>
              <ul className={styles.whyCtaPoints}>
                {whyPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href={RESAVENUE_BOOK_DIRECT_URL} className={styles.whyCtaBook} target="_blank" rel="noopener noreferrer">
                {t("whyChoose.bookCta")} <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <div className={styles.container}>
        <DaysTestimonials />
      </div>

      <DaysNearbySection />

      <section className={`${styles.sectionMuted} ${v2SectionStyles.ds}`} id={CROSSWAY_HOME.contact}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.contactHead}>
              <Eyebrow>{vc("eyebrow")}</Eyebrow>
              <DisplayHeading as="h2">{t("contact.title")}</DisplayHeading>
              <p className={v2SectionStyles.intro}>{t("contact.intro")}</p>
            </div>
          </Reveal>
          <DaysContactHomeBlock />
        </div>
      </section>
    </div>
  );
}
