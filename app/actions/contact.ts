"use server";

import { HONEYPOT_FIELD, readContactForm, validateContact, type ContactState } from "@/lib/contact";
import { sendContactEmail } from "@/lib/email";

/**
 * Validates again on the server (never trust the browser), drops honeypot
 * submissions, and reports success only when the provider accepted the email.
 */
export async function submitContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  const values = readContactForm(form);

  const trap = form.get(HONEYPOT_FIELD);
  if (typeof trap === "string" && trap.trim() !== "") return { status: "success" };

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };

  const result = await sendContactEmail(values);
  if (!result.ok) {
    console.error("Contact form delivery failed:", result.reason);
    return {
      status: "error",
      message: "Your message could not be sent. Please try again, or email me directly.",
    };
  }
  return { status: "success" };
}
