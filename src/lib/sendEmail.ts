/**
 * Client-side email helper (axios → Lambda). Copy into each app's src/lib/sendEmail.ts
 */
import axios from "axios";

export const SEND_EMAIL_API_URL =
  process.env.NEXT_PUBLIC_SEND_EMAIL_API_URL ??
  "https://jcby3alvkl.execute-api.ap-south-1.amazonaws.com/prod/send-email";

export const CONTACT_EMAIL_TO =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL_TO ?? "contact@crosswayhotels.com";

/** SES verified sender — must be a full email address. */
export const EMAIL_FROM =
  process.env.NEXT_PUBLIC_EMAIL_FROM ?? "contact@crosswayhotels.com";

export type EmailAttachment = {
  filename: string;
  content: string;
  contentType?: string;
};

export type SendEmailPayload = {
  to?: string;
  from?: string;
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
};

const PURPOSE_LABELS: Record<string, string> = {
  stay: "Stay",
  event: "Event",
  dining: "Dining",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildFormEmailHtml(options: {
  brandName: string;
  formLabel: string;
  fields: Record<string, string>;
  senderName?: string;
  senderEmail?: string;
}): string {
  const { brandName, formLabel, fields, senderName, senderEmail } = options;
  const rows = Object.entries(fields)
    .filter(([, value]) => value.trim())
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px 8px 0;font-weight:600;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const fromLine =
    senderName || senderEmail
      ? `<p style="margin:0 0 16px;color:#444">From: ${escapeHtml(senderName ?? "")}${senderEmail ? ` &lt;${escapeHtml(senderEmail)}&gt;` : ""}</p>`
      : "";

  return `<div style="font-family:system-ui,sans-serif;max-width:640px;color:#1a1a1a">
  <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#8a6b45">${escapeHtml(brandName)}</p>
  <h1 style="margin:0 0 16px;font-size:22px;font-weight:600">${escapeHtml(formLabel)}</h1>
  ${fromLine}
  <table style="border-collapse:collapse;width:100%">${rows}</table>
</div>`;
}

type SendEmailApiResponse = {
  success?: boolean;
  messageId?: string;
  error?: string;
};

function parseApiError(data: unknown): string {
  if (typeof data === "string" && data.trim()) return data;
  if (data && typeof data === "object" && "error" in data) {
    const err = (data as SendEmailApiResponse).error;
    if (typeof err === "string" && err.trim()) return err;
  }
  return "send failed";
}

export async function sendEmail(
  payload: SendEmailPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const { data } = await axios.post<SendEmailApiResponse>(SEND_EMAIL_API_URL, {
      to: payload.to ?? CONTACT_EMAIL_TO,
      from: payload.from ?? EMAIL_FROM,
      subject: payload.subject,
      html: payload.html,
      ...(payload.attachments?.length ? { attachments: payload.attachments } : {}),
    });

    if (data?.success === true || (typeof data?.messageId === "string" && data.messageId.length > 0)) {
      return { ok: true };
    }

    return { ok: false, error: parseApiError(data) };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { ok: false, error: parseApiError(err.response?.data) || err.message };
    }
    const message = err instanceof Error ? err.message : "send failed";
    return { ok: false, error: message };
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      if (typeof dataUrl !== "string") {
        reject(new Error("read failed"));
        return;
      }
      resolve(dataUrl.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(reader.error ?? new Error("read failed"));
    reader.readAsDataURL(file);
  });
}

export async function sendContactEmail(options: {
  brandName: string;
  name: string;
  email: string;
  message: string;
  subject?: string;
  purpose?: string;
}): Promise<boolean> {
  const { brandName, name, email, message, subject, purpose } = options;
  const fields: Record<string, string> = {
    Name: name,
    Email: email,
    Message: message,
  };
  if (subject) fields.Subject = subject;
  if (purpose && PURPOSE_LABELS[purpose]) fields["Enquiry type"] = PURPOSE_LABELS[purpose];

  const html = buildFormEmailHtml({
    brandName,
    formLabel: "Contact enquiry",
    fields,
    senderName: name,
    senderEmail: email,
  });

  const result = await sendEmail({
    subject: `[${brandName}] Contact: ${subject ?? name}`,
    html,
  });
  return result.ok;
}

export async function sendCareersEmail(options: {
  brandName: string;
  name: string;
  email: string;
  address: string;
  position: string;
  mobile: string;
  resume?: File | null;
}): Promise<boolean> {
  const { brandName, name, email, address, position, mobile, resume } = options;
  const attachments = [];
  if (resume && resume.size > 0) {
    if (resume.size > 5 * 1024 * 1024) return false;
    attachments.push({
      filename: resume.name || "resume.pdf",
      content: await fileToBase64(resume),
      contentType: resume.type || "application/pdf",
    });
  }

  const html = buildFormEmailHtml({
    brandName,
    formLabel: "Careers application",
    fields: {
      Name: name,
      Email: email,
      Address: address,
      Position: position,
      Mobile: mobile,
    },
    senderName: name,
    senderEmail: email,
  });

  const result = await sendEmail({
    subject: `[${brandName}] Careers: ${position} — ${name}`,
    html,
    attachments: attachments.length ? attachments : undefined,
  });
  return result.ok;
}

export async function sendFeedbackEmail(options: {
  brandName: string;
  name: string;
  email: string;
  subject: string;
  comment: string;
}): Promise<boolean> {
  const { brandName, name, email, subject, comment } = options;
  const html = buildFormEmailHtml({
    brandName,
    formLabel: "Guest feedback",
    fields: {
      Name: name,
      Email: email,
      Subject: subject,
      Comment: comment,
    },
    senderName: name,
    senderEmail: email,
  });

  const result = await sendEmail({
    subject: `[${brandName}] Feedback: ${subject}`,
    html,
  });
  return result.ok;
}
