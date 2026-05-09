"use client";

import { useTranslations } from "next-intl";
import { Eyebrow } from "@/design-system/components/Eyebrow";
import { DaysContactForm } from "@/components/days/contact/DaysContactForm";
import styles from "./DaysContactHomeBlock.module.scss";

export function DaysContactHomeBlock() {
  const t = useTranslations("DaysHome.contact");

  return (
    <div className={styles.grid}>
      <div className={styles.info}>
        <Eyebrow>{t("reachEyebrow")}</Eyebrow>
        <div className={styles.block}>
          <span>{t("visitLabel")}</span>
          <p>{t("visitText")}</p>
        </div>
        <div className={styles.block}>
          <span>{t("deskLabel")}</span>
          <p>
            {t("deskLine1")}
            <br />
            {t("deskLine2")}
          </p>
        </div>
        <div className={styles.block}>
          <span>{t("eventsLabel")}</span>
          <p>
            {t("eventsLine1")}
            <br />
            {t("eventsLine2")}
          </p>
        </div>
        <div className={styles.block}>
          <span>{t("pressLabel")}</span>
          <p>{t("pressText")}</p>
        </div>
      </div>
      <DaysContactForm variant="con" />
    </div>
  );
}
