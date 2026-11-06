import { afterEach, describe, expect, it, vi } from "vitest";
import { readContactForm, validateContact, type ContactFields } from "@/lib/contact";
import { isContactFormEnabled, sendContactEmail } from "@/lib/email";
import { submitContact } from "@/app/actions/contact";

const valid: ContactFields = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  subject: "Senior backend role",
  message: "Hello, I would like to talk about a senior backend role on our team.",
};

const formOf = (fields: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
};

describe("validateContact", () => {
  it("accepts a complete message, subject optional", () => {
    expect(validateContact(valid)).toEqual({});
    expect(validateContact({ ...valid, subject: "" })).toEqual({});
  });

  it("reports each invalid field", () => {
    const errors = validateContact({ name: "A", email: "not-an-email", subject: "x".repeat(151), message: "too short" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name", "subject"]);
  });

  it("requires email and message", () => {
    const errors = validateContact({ ...valid, email: "", message: "" });
    expect(errors.email).toMatch(/enter your email/);
    expect(errors.message).toMatch(/enter a message/);
  });

  it("rejects over-long messages", () => {
    expect(validateContact({ ...valid, message: "x".repeat(5001) }).message).toMatch(/under 5000/);
  });

  it("trims form values and ignores non-string entries", () => {
    const f = formOf({ name: "  Ada  ", email: " ada@example.com ", message: " hi " });
    f.set("subject", new Blob(["x"]));
    expect(readContactForm(f)).toEqual({ name: "Ada", email: "ada@example.com", subject: "", message: "hi" });
  });
});

describe("sendContactEmail (Resend)", () => {
  it("is disabled without an API key", async () => {
    expect(isContactFormEnabled({})).toBe(false);
    expect(isContactFormEnabled({ RESEND_API_KEY: "re_x" })).toBe(true);
    const fetcher = vi.fn();
    expect(await sendContactEmail(valid, {}, fetcher)).toEqual({
      ok: false,
      reason: "RESEND_API_KEY is not set",
    });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("posts a plain-text email with reply-to set to the sender", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    const env = { RESEND_API_KEY: "re_test", CONTACT_TO_EMAIL: "me@example.com" };
    expect(await sendContactEmail(valid, env, fetcher)).toEqual({ ok: true });

    const [url, init] = fetcher.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.Authorization).toBe("Bearer re_test");
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({ to: ["me@example.com"], reply_to: valid.email, subject: "Portfolio: Senior backend role" });
    expect(body.text).toContain(valid.message);
    expect(body.html).toBeUndefined();
  });

  it("reports provider and network failures", async () => {
    const env = { RESEND_API_KEY: "re_test" };
    const rejected = vi.fn().mockResolvedValue(new Response("invalid from", { status: 422 }));
    expect(await sendContactEmail(valid, env, rejected)).toMatchObject({ ok: false, reason: expect.stringContaining("422") });
    const offline = vi.fn().mockRejectedValue(new Error("network down"));
    expect(await sendContactEmail(valid, env, offline)).toEqual({ ok: false, reason: "network down" });
  });
});

describe("submitContact Server Action", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns field errors without sending", async () => {
    const fetcher = vi.fn();
    vi.stubGlobal("fetch", fetcher);
    vi.stubEnv("RESEND_API_KEY", "re_test");
    const state = await submitContact({ status: "idle" }, formOf({ name: "", email: "x", message: "" }));
    expect(state.status).toBe("invalid");
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("silently accepts honeypot submissions without sending", async () => {
    const fetcher = vi.fn();
    vi.stubGlobal("fetch", fetcher);
    vi.stubEnv("RESEND_API_KEY", "re_test");
    const state = await submitContact({ status: "idle" }, formOf({ ...valid, website: "spam.example" }));
    expect(state).toEqual({ status: "success" });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("succeeds only when the provider accepts the email", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 200 })));
    expect(await submitContact({ status: "idle" }, formOf(valid))).toEqual({ status: "success" });

    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("nope", { status: 500 })));
    expect((await submitContact({ status: "idle" }, formOf(valid))).status).toBe("error");
  });

  it("fails (never fakes success) when no provider is configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await submitContact({ status: "idle" }, formOf(valid))).status).toBe("error");
  });
});
