import { profile } from "@/content/profile";
import type { ContactFields } from "@/lib/contact";

type Env = Record<string, string | undefined>;

/**
 * Contact delivery through Resend's HTTP API (decision D4). Configure in Vercel:
 *   RESEND_API_KEY      required; without it the form is hidden
 *   CONTACT_TO_EMAIL    defaults to profile.email
 *   CONTACT_FROM_EMAIL  a sender on a domain verified in Resend; defaults to
 *                       Resend's test sender, which only delivers to the
 *                       Resend account's own address
 */
export function isContactFormEnabled(env: Env = process.env): boolean {
  return Boolean(env.RESEND_API_KEY);
}

export type SendResult = { ok: true } | { ok: false; reason: string };

export async function sendContactEmail(
  fields: ContactFields,
  env: Env = process.env,
  fetcher: typeof fetch = fetch,
): Promise<SendResult> {
  const key = env.RESEND_API_KEY;
  if (!key) return { ok: false, reason: "RESEND_API_KEY is not set" };

  const subject = fields.subject ? `Portfolio: ${fields.subject}` : `Portfolio message from ${fields.name}`;
  const header = [`From: ${fields.name} <${fields.email}>`, ...(fields.subject ? [`Subject: ${fields.subject}`] : [])];
  const text = [...header, "", fields.message].join("\n");

  try {
    const res = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL || "Portfolio contact <onboarding@resend.dev>",
        to: [env.CONTACT_TO_EMAIL || profile.email],
        reply_to: fields.email,
        subject,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return { ok: false, reason: `Resend responded ${res.status}: ${await res.text().catch(() => "")}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : String(e) };
  }
}
