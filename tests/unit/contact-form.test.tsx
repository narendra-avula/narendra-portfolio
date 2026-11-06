import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ContactState } from "@/lib/contact";

const submitContact = vi.fn<(prev: ContactState, form: FormData) => Promise<ContactState>>();
const track = vi.fn();
vi.mock("@/app/actions/contact", () => ({ submitContact: (p: ContactState, f: FormData) => submitContact(p, f) }));
vi.mock("@vercel/analytics", () => ({ track: (...args: unknown[]) => track(...args) }));

const { default: ContactForm } = await import("@/components/home/ContactForm");

const fillValid = () => {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ada Lovelace" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "ada@example.com" } });
  fireEvent.change(screen.getByLabelText("Message"), {
    target: { value: "Hello, I would like to talk about a senior backend role." },
  });
};

const submit = () => act(async () => fireEvent.click(screen.getByRole("button", { name: /send message/i })));

describe("ContactForm", () => {
  beforeEach(() => render(<ContactForm email="me@example.com" />));
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("validates in the browser before calling the server", async () => {
    await submit();
    expect(submitContact).not.toHaveBeenCalled();
    const name = screen.getByLabelText("Name");
    expect(name.getAttribute("aria-invalid")).toBe("true");
    expect(document.getElementById(name.getAttribute("aria-describedby")!)?.textContent).toContain("Please enter your name.");
    expect(screen.getByLabelText("Email").getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByLabelText("Subject (optional)").hasAttribute("aria-invalid")).toBe(false);
    expect(document.activeElement).toBe(name);
  });

  it("shows the provider error with a mailto fallback and keeps the typed text", async () => {
    submitContact.mockResolvedValue({ status: "error", message: "Your message could not be sent." });
    fillValid();
    await submit();
    await waitFor(() => expect(screen.getByRole("status").textContent).toContain("could not be sent"));
    expect(screen.getByRole("link", { name: "me@example.com" }).getAttribute("href")).toBe("mailto:me@example.com");
    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("Ada Lovelace");
    expect(track).not.toHaveBeenCalled();
  });

  it("shows server-side field errors", async () => {
    submitContact.mockResolvedValue({ status: "invalid", errors: { email: "Please enter a valid email address." } });
    fillValid();
    await submit();
    await waitFor(() => expect(screen.getByLabelText("Email").getAttribute("aria-invalid")).toBe("true"));
    expect(screen.getByText("Please enter a valid email address.")).toBeTruthy();
  });

  it("confirms success, clears the form and records the event", async () => {
    submitContact.mockResolvedValue({ status: "success" });
    fillValid();
    await submit();
    await waitFor(() => expect(screen.getByRole("status").textContent).toContain("message has been sent"));
    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("");
    expect(track).toHaveBeenCalledWith("Contact Submit");
  });
});
