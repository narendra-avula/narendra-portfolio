"use client";

import { useActionState, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { LuCircleAlert, LuCircleCheck, LuSend } from "react-icons/lu";
import { track } from "@vercel/analytics";
import { submitContact } from "@/app/actions/contact";
import {
  HONEYPOT_FIELD,
  contactLimits,
  readContactForm,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactFields,
  type ContactState,
} from "@/lib/contact";
import { analyticsEvents } from "@/lib/analytics";
import { buttonClass, focusRing } from "@/components/ui";

const empty: ContactFields = { name: "", email: "", subject: "", message: "" };
const order: ContactField[] = ["name", "email", "subject", "message"];

/** Label, control and error message; the control's id must be `id` */
function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
        {optional && <span className="font-normal text-subtle"> (optional)</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = `w-full rounded-lg border bg-surface px-3.5 py-2.5 text-[15px] text-fg placeholder:text-subtle ${focusRing}`;

export default function ContactForm({ email }: { email: string }) {
  const [values, setValues] = useState<ContactFields>(empty);
  // Inputs are controlled, so typed text survives a failed submit; clear it only on success
  const [state, formAction, pending] = useActionState<ContactState, FormData>(async (prev, form) => {
    const next = await submitContact(prev, form);
    if (next.status === "success") {
      setValues(empty);
      track(analyticsEvents.contactSubmit);
    }
    return next;
  }, { status: "idle" });
  const [clientErrors, setClientErrors] = useState<ContactErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const errors: ContactErrors = clientErrors ?? (state.status === "invalid" ? state.errors : {});

  const focusFirstError = (errs: ContactErrors) => {
    const first = order.find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  // Move focus to what changed: the first invalid field, or the status message
  useEffect(() => {
    if (state.status === "invalid") focusFirstError(state.errors);
    else if (state.status === "success" || state.status === "error") statusRef.current?.focus();
  }, [state]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const errs = validateContact(readContactForm(new FormData(e.currentTarget)));
    if (Object.keys(errs).length > 0) {
      e.preventDefault();
      setClientErrors(errs);
      focusFirstError(errs);
      return;
    }
    setClientErrors(null);
  };

  const inputProps = (name: ContactField, optional = false) => ({
    id: `${id}-${name}`,
    name,
    value: values[name],
    onChange: (e: { target: { value: string } }) => setValues((v) => ({ ...v, [name]: e.target.value })),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
    "aria-required": optional ? undefined : true,
    className: `${inputClass} ${errors[name] ? "border-red-500/70" : "border-line hover:border-line-strong"}`,
  });

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate aria-labelledby={`${id}-title`} className="space-y-5">
      <h3 id={`${id}-title`} className="text-lg font-semibold text-fg">
        Send a message
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-name`} label="Name" error={errors.name}>
          <input type="text" autoComplete="name" maxLength={contactLimits.name.max} {...inputProps("name")} />
        </Field>
        <Field id={`${id}-email`} label="Email" error={errors.email}>
          <input type="email" autoComplete="email" maxLength={contactLimits.email.max} {...inputProps("email")} />
        </Field>
      </div>

      <Field id={`${id}-subject`} label="Subject" error={errors.subject} optional>
        <input type="text" maxLength={contactLimits.subject.max} {...inputProps("subject", true)} />
      </Field>

      <Field id={`${id}-message`} label="Message" error={errors.message}>
        <textarea rows={6} maxLength={contactLimits.message.max} {...inputProps("message")} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-${HONEYPOT_FIELD}`}>Website</label>
        <input id={`${id}-${HONEYPOT_FIELD}`} type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={pending} className={buttonClass("primary", "disabled:cursor-wait disabled:opacity-60")}>
          <LuSend className="h-4 w-4" aria-hidden="true" />
          {pending ? "Sending…" : "Send message"}
        </button>
        <p className="text-sm text-subtle">Your email is used only to reply to you.</p>
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
        {state.status === "success" && !clientErrors && (
          <p className="flex gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm text-emerald-800 dark:text-emerald-200">
            <LuCircleCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            Thanks, your message has been sent. I&apos;ll reply by email.
          </p>
        )}
        {state.status === "error" && !clientErrors && (
          <p className="flex gap-2.5 rounded-lg border border-red-500/40 bg-red-500/10 p-3.5 text-sm text-red-800 dark:text-red-200">
            <LuCircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              {state.message}{" "}
              <a href={`mailto:${email}`} className={`rounded font-medium underline underline-offset-4 ${focusRing}`}>
                {email}
              </a>
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
