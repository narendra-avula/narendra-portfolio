/** Contact form rules, shared by the browser and the Server Action */

export const contactLimits = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { max: 150 },
  message: { min: 20, max: 5000 },
} as const;

/** Hidden field real visitors never fill; bots that fill it get a fake success */
export const HONEYPOT_FIELD = "website";

export type ContactFields = { name: string; email: string; subject: string; message: string };
export type ContactField = keyof ContactFields;
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; errors: ContactErrors }
  | { status: "error"; message: string }
  | { status: "success" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function readContactForm(form: FormData): ContactFields {
  const get = (k: string) => {
    const v = form.get(k);
    return typeof v === "string" ? v.trim() : "";
  };
  return { name: get("name"), email: get("email"), subject: get("subject"), message: get("message") };
}

export function validateContact(v: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  const { name, email, subject, message } = contactLimits;

  if (v.name.length < name.min) errors.name = "Please enter your name.";
  else if (v.name.length > name.max) errors.name = `Please keep your name under ${name.max} characters.`;

  if (!v.email) errors.email = "Please enter your email address.";
  else if (v.email.length > email.max || !EMAIL.test(v.email)) errors.email = "Please enter a valid email address.";

  if (v.subject.length > subject.max) errors.subject = `Please keep the subject under ${subject.max} characters.`;

  if (!v.message) errors.message = "Please enter a message.";
  else if (v.message.length < message.min) errors.message = `Please write at least ${message.min} characters.`;
  else if (v.message.length > message.max) errors.message = `Please keep your message under ${message.max} characters.`;

  return errors;
}
