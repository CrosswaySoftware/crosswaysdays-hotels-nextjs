"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./DaysContactForm.module.scss";

const PURPOSE_KEYS = ["stay", "event", "dining", "press"] as const;

export function DaysContactForm({ variant = "stacked" }: { variant?: "stacked" | "con" }) {
  const t = useTranslations("DaysHome.contact");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [pending, setPending] = useState(false);
  const [purpose, setPurpose] = useState<(typeof PURPOSE_KEYS)[number]>("stay");
  const [lastName, setLastName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const botcheck = String(fd.get("botcheck") ?? "");
    if (botcheck) return;
    setPending(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          botcheck: "",
          purpose: variant === "con" ? purpose : undefined,
        }),
      });
      if (res.ok) {
        setLastName(name);
        setStatus("ok");
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    } finally {
      setPending(false);
    }
  }

  if (variant === "con") {
    return (
      <form className={styles.formCon} onSubmit={onSubmit}>
        {status === "ok" ? (
          <p className={styles.feedbackOkNamed}>{t("successNamed", { name: lastName.trim() || t("guestFallback") })}</p>
        ) : null}
        {status === "err" ? <p className={styles.feedbackErr}>{t("error")}</p> : null}

        <div className={styles.purposeRow}>
          {PURPOSE_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              className={`${styles.pill} ${purpose === key ? styles.pillOn : ""}`}
              onClick={() => setPurpose(key)}
            >
              {t(`purpose.${key}`)}
            </button>
          ))}
        </div>

        <label className={styles.fieldCon}>
          <span>{t("fieldName")}</span>
          <input name="name" type="text" required autoComplete="name" placeholder={t("placeholderName")} />
        </label>
        <label className={styles.fieldCon}>
          <span>{t("fieldEmail")}</span>
          <input name="email" type="email" required autoComplete="email" placeholder={t("placeholderEmail")} />
        </label>
        <input type="text" name="botcheck" className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden />
        <label className={styles.fieldCon}>
          <span>{t("fieldMessage")}</span>
          <textarea name="message" rows={6} required placeholder={t("placeholderMessage")} />
        </label>
        <button type="submit" className={styles.submitCon} disabled={pending}>
          {pending ? t("sending") : t("submit")}
        </button>
      </form>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {status === "ok" ? <p className={styles.feedbackOk}>{t("success")}</p> : null}
      {status === "err" ? <p className={styles.feedbackErr}>{t("error")}</p> : null}
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>{t("name")}</span>
          <input className={styles.input} name="name" type="text" required autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{t("email")}</span>
          <input className={styles.input} name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <input type="text" name="botcheck" className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden />
      <label className={styles.field}>
        <span className={styles.label}>{t("message")}</span>
        <textarea className={styles.textarea} name="message" rows={6} required />
      </label>
      <button type="submit" className={styles.submit} disabled={pending}>
        {pending ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
