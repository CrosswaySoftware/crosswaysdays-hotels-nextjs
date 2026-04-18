"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher/LocaleSwitcher";
import { days } from "@/lib/media";
import styles from "./DaysHotelHeader.module.scss";

const NAV: { href: string; key: "overview" | "accommodation" | "restaurant" | "gallery" | "contact" }[] = [
  { href: "#overview", key: "overview" },
  { href: "#accommodation", key: "accommodation" },
  { href: "#restaurant", key: "restaurant" },
  { href: "#gallery", key: "gallery" },
  { href: "#contact", key: "contact" },
];

export function DaysHotelHeader() {
  const t = useTranslations("DaysNav");
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.root}>
      <div className={styles.ribbon}>
        <div className={styles.ribbonInner}>
          <a className={styles.ribbonLink} href="tel:+916383752850">
            +91 63837 52850
          </a>
          <span className={styles.dot} aria-hidden />
          <a className={styles.ribbonLink} href="mailto:contact@crosswayhotels.com">
            contact@crosswayhotels.com
          </a>
        </div>
      </div>
      <div className={styles.bar}>
        <div className={styles.barInner}>
          <a href="https://www.crosswayhotels.com/" className={styles.logo} target="_blank" rel="noopener noreferrer">
            <Image
              src={days.logoHeader}
              alt="Crossway Hotels and Resorts"
              width={200}
              height={48}
              className={styles.logoImg}
              priority
            />
          </a>

          <nav id="days-nav" className={`${styles.nav} ${open ? styles.navOpen : ""}`} aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={styles.navLink}
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
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
                {t("bookDirect")}
              </button>
            </form>
            <LocaleSwitcher density="compact" />
          </div>

          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="days-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.srOnly}>{t("menuToggle")}</span>
            <span className={styles.hamburger} data-open={open} aria-hidden />
          </button>
        </div>
      </div>
    </header>
  );
}
