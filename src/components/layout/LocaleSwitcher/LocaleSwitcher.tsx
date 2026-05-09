"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./LocaleSwitcher.module.scss";

export function LocaleSwitcher({
  density = "compact",
  tone = "onDark",
}: {
  density?: "compact" | "comfortable";
  /** `onDark` = header over imagery; `onLight` = scrolled / solid cream bar */
  tone?: "onDark" | "onLight";
}) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathnameRaw = usePathname();
  const pathname = pathnameRaw && pathnameRaw.length > 0 ? pathnameRaw : "/";

  const onLocaleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <label className={styles.root}>
      <span className={styles.sr}>{t("label")}</span>
      <select
        className={`${styles.select} ${density === "comfortable" ? styles.selectComfortable : ""} ${tone === "onLight" ? styles.selectOnLight : ""}`}
        value={locale}
        aria-label={t("label")}
        onChange={(e) => onLocaleChange(e.target.value)}
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {t(loc)}
          </option>
        ))}
      </select>
    </label>
  );
}
