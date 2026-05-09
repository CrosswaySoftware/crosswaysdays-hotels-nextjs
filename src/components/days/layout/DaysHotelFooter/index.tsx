import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CROSSWAY_HOME } from "@/lib/crosswayHotelHomeNav";
import { days } from "@/lib/media";
import styles from "./DaysHotelFooter.module.scss";

const social = [
  { label: "Facebook", href: "https://www.facebook.com/crosswayhotels", icon: "f" },
  { label: "Twitter", href: "https://twitter.com/HotelsCrossway", icon: "𝕏" },
  { label: "Instagram", href: "https://www.instagram.com/crosswayhotels/", icon: "◎" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/crossway-hotels-and-resorts-b49137170/", icon: "in" },
];

export async function DaysHotelFooter() {
  const t = await getTranslations("DaysFooter");
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <a href="https://www.crosswayhotels.com/" target="_blank" rel="noopener noreferrer">
              <Image
                src={days.logoFooter}
                alt="Crossway Hotels and Resorts"
                width={240}
                height={56}
                className={styles.logo}
              />
            </a>
            <p className={styles.address}>{t("address")}</p>
          </div>
          <div>
            <h2 className={styles.title}>{t("contactTitle")}</h2>
            <p className={styles.muted}>
              <a href="tel:+919751277770">+91 97512 77770</a>
            </p>
            <p className={styles.muted}>
              <a href="mailto:contact@crosswayhotels.com">contact@crosswayhotels.com</a>
            </p>
          </div>
          <div>
            <h2 className={styles.title}>{t("linksTitle")}</h2>
            <ul className={styles.links}>
              <li>
                <a href={`#${CROSSWAY_HOME.story}`}>{t("linkOverview")}</a>
              </li>
              <li>
                <a href={`#${CROSSWAY_HOME.accommodation}`}>{t("linkAccommodation")}</a>
              </li>
              <li>
                <a href={`#${CROSSWAY_HOME.experiences}`}>{t("linkRestaurant")}</a>
              </li>
              <li>
                <a href={`#${CROSSWAY_HOME.gallery}`}>{t("linkGallery")}</a>
              </li>
              <li>
                <a href={`#${CROSSWAY_HOME.contact}`}>{t("linkContact")}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className={styles.title}>{t("socialTitle")}</h2>
            <ul className={styles.social}>
              {social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>{t("copyright", { year })}</p>
        </div>
      </div>
    </footer>
  );
}
