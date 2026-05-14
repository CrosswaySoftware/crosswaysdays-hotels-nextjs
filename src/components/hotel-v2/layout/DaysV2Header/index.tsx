"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher/LocaleSwitcher";
import { CROSSWAY_HOME } from "@/lib/crosswayHotelHomeNav";
import { days } from "@/lib/media";
import {
  CROSSWAY_CORPORATE_URL,
  SISTER_SITE_LABEL_KEYS,
  sisterMicrositeUrl,
  sisterSitesFor,
  type SisterSiteId,
} from "@/lib/crosswaySisterHotels";
import { RESAVENUE_BOOK_DIRECT_URL } from "@/lib/resavenueBooking";
import styles from "./DaysV2Header.module.scss";

const SITE_ID: SisterSiteId = "days";

function readHash() {
  if (typeof window === "undefined") return "";
  return window.location.hash;
}

function subscribeHash(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

type NavKey = "home" | "accommodation" | "restaurant" | "gallery" | "contact";

export function DaysV2Header() {
  const t = useTranslations("DaysNav");
  const locale = useLocale();
  const sisterIds = sisterSitesFor(SITE_ID);
  const hotelsDropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [hotelsDropdownOpen, setHotelsDropdownOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname() ?? "/";
  const hash = useSyncExternalStore(subscribeHash, readHash, () => "");

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    setHotelsDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!hotelsDropdownOpen) return;
    const onDoc = (e: MouseEvent) => {
      const root = hotelsDropdownRef.current;
      if (root && !root.contains(e.target as Node)) setHotelsDropdownOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [hotelsDropdownOpen]);

  useEffect(() => {
    if (!hotelsDropdownOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setHotelsDropdownOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hotelsDropdownOpen]);

  const isHome = pathname === "/" || pathname === "";
  const h = hash;

  const linkActive = (key: NavKey) => {
    if (key === "home") return isHome && (!h || h === "#" || h === "");
    if (key === "accommodation") return isHome && h === `#${CROSSWAY_HOME.accommodation}`;
    if (key === "restaurant")
      return (isHome && h === `#${CROSSWAY_HOME.experiences}`) || pathname.startsWith("/experiences");
    if (key === "gallery")
      return isHome && (h === `#${CROSSWAY_HOME.gallery}` || h === `#${CROSSWAY_HOME.galleryAll}`);
    if (key === "contact") return isHome && h === `#${CROSSWAY_HOME.contact}`;
    return false;
  };

  const H = (id: string) => `/#${id}`;

  const barSolid = solid || !isHome;
  const headerSolid = barSolid || open;
  const logoSrc = headerSolid ? days.logoHeaderBlue : days.logoHeader;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`${styles.root} ${barSolid ? styles.solid : ""} ${open ? styles.menuOpen : ""}`}>
      <div className={styles.inner}>
        <a
          href={CROSSWAY_CORPORATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.logo} ${headerSolid ? styles.logoSolid : ""}`}
          onClick={() => setOpen(false)}
        >
          <Image
            src={logoSrc}
            alt=""
            width={200}
            height={48}
            className={`${styles.logoImg} ${headerSolid ? styles.logoImgSolid : ""}`}
            priority
          />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <Link href="/" className={`${styles.navLink} ${linkActive("home") ? styles.active : ""}`} onClick={() => setOpen(false)}>
            <span>{t("home")}</span>
            <span className={styles.navDot} aria-hidden />
          </Link>
          <Link
            href={H(CROSSWAY_HOME.accommodation)}
            className={`${styles.navLink} ${linkActive("accommodation") ? styles.active : ""}`}
            onClick={() => setOpen(false)}
          >
            <span>{t("accommodation")}</span>
            <span className={styles.navDot} aria-hidden />
          </Link>
          <Link
            href={H(CROSSWAY_HOME.experiences)}
            className={`${styles.navLink} ${linkActive("restaurant") ? styles.active : ""}`}
            onClick={() => setOpen(false)}
          >
            <span>{t("restaurant")}</span>
            <span className={styles.navDot} aria-hidden />
          </Link>
          <Link
            href={H(CROSSWAY_HOME.gallery)}
            className={`${styles.navLink} ${linkActive("gallery") ? styles.active : ""}`}
            onClick={() => setOpen(false)}
          >
            <span>{t("gallery")}</span>
            <span className={styles.navDot} aria-hidden />
          </Link>
          <div
            ref={hotelsDropdownRef}
            className={`${styles.navDropdown} ${hotelsDropdownOpen ? styles.navDropdownOpen : ""}`}
          >
            <button
              type="button"
              className={`${styles.navLink} ${styles.navDropdownTrigger}`}
              aria-haspopup="menu"
              aria-expanded={hotelsDropdownOpen}
              id="days-hdr-our-hotels"
              onClick={() => setHotelsDropdownOpen((v) => !v)}
            >
              <span>{t("ourHotels")}</span>
              <span className={styles.navDropdownCaret} aria-hidden />
            </button>
            <div className={styles.navDropdownPanel} role="presentation">
              <div
                className={styles.navDropdownPanelInner}
                role="menu"
                aria-label={t("ourHotels")}
                aria-labelledby="days-hdr-our-hotels"
              >
                {sisterIds.map((id) => (
                  <a
                    key={id}
                    href={sisterMicrositeUrl(id, locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    className={styles.navDropdownLink}
                    onClick={() => {
                      setHotelsDropdownOpen(false);
                      setOpen(false);
                    }}
                  >
                    {t(SISTER_SITE_LABEL_KEYS[id])}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <Link
            href={H(CROSSWAY_HOME.contact)}
            className={`${styles.navLink} ${linkActive("contact") ? styles.active : ""}`}
            onClick={() => setOpen(false)}
          >
            <span>{t("contact")}</span>
            <span className={styles.navDot} aria-hidden />
          </Link>
        </nav>

        <div className={styles.actions}>
          <a className={styles.phone} href="tel:+919751277770">
            +91 97512 77770
          </a>
          <a
            href={RESAVENUE_BOOK_DIRECT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.book}
            onClick={() => setOpen(false)}
          >
            {t("bookDirect")}
          </a>
          <div className={styles.locale}>
            <LocaleSwitcher density="compact" tone={headerSolid ? "onLight" : "onDark"} />
          </div>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-label={t("menuToggle")}
            onClick={() => {
              setOpen((v) => !v);
              setHotelsDropdownOpen(false);
            }}
          >
            <span className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}>
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <>
          <button type="button" className={styles.mobileBackdrop} aria-label={t("menuClose")} onClick={() => setOpen(false)} />
          <div className={styles.mobileSheet} role="dialog" aria-modal="true" aria-label={t("menuTitle")}>
            <nav className={styles.mobileNav}>
              <Link
                href="/"
                className={`${styles.mobileLink} ${linkActive("home") ? styles.mobileLinkActive : ""}`}
                onClick={() => setOpen(false)}
              >
                {t("home")}
              </Link>
              <Link
                href={H(CROSSWAY_HOME.accommodation)}
                className={`${styles.mobileLink} ${linkActive("accommodation") ? styles.mobileLinkActive : ""}`}
                onClick={() => setOpen(false)}
              >
                {t("accommodation")}
              </Link>
              <Link
                href={H(CROSSWAY_HOME.experiences)}
                className={`${styles.mobileLink} ${linkActive("restaurant") ? styles.mobileLinkActive : ""}`}
                onClick={() => setOpen(false)}
              >
                {t("restaurant")}
              </Link>
              <Link
                href={H(CROSSWAY_HOME.gallery)}
                className={`${styles.mobileLink} ${linkActive("gallery") ? styles.mobileLinkActive : ""}`}
                onClick={() => setOpen(false)}
              >
                {t("gallery")}
              </Link>
              <div className={styles.mobileGroup}>
                <div className={styles.mobileGroupLabel}>{t("ourHotels")}</div>
                {sisterIds.map((id) => (
                  <a
                    key={id}
                    href={sisterMicrositeUrl(id, locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.mobileLink} ${styles.mobileLinkSub}`}
                    onClick={() => setOpen(false)}
                  >
                    {t(SISTER_SITE_LABEL_KEYS[id])}
                  </a>
                ))}
              </div>
              <Link
                href={H(CROSSWAY_HOME.contact)}
                className={`${styles.mobileLink} ${linkActive("contact") ? styles.mobileLinkActive : ""}`}
                onClick={() => setOpen(false)}
              >
                {t("contact")}
              </Link>
            </nav>
            <a
              href={RESAVENUE_BOOK_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileBook}
              onClick={() => setOpen(false)}
            >
              {t("bookDirect")}
            </a>
          </div>
        </>
      ) : null}
    </header>
  );
}
