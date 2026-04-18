"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./DaysContactForm.module.scss";

export function DaysContactForm() {
  const t = useTranslations("DaysHome.contact");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [pending, setPending] = useState(false);

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
        body: JSON.stringify({ name, email, message, botcheck: "" }),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    } finally {
      setPending(false);
    }
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
