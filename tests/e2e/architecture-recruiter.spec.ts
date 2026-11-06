import { expect, test } from "@playwright/test";

const designs = [
  ["rag-pipeline", "Retrieval-Augmented Generation pipeline"],
  ["ai-code-review-pipeline", "AI-assisted code review pipeline"],
  ["event-driven-microservices", "Event-driven microservices with a message broker"],
  ["chaos-engineering-platform", "Chaos engineering experiment platform"],
] as const;

test.describe("architecture lab", () => {
  test("index lists every design and links to it", async ({ page }) => {
    await page.goto("/architecture");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("How I think about systems.");
    await expect(page.getByText(/Illustrative reference design/)).toBeVisible();
    for (const [, title] of designs) await expect(page.getByRole("link", { name: title })).toBeVisible();
    await page.getByRole("link", { name: designs[0][1] }).click();
    await expect(page).toHaveURL(/\/architecture\/rag-pipeline$/);
  });

  for (const [slug, title] of designs) {
    test(`${slug} renders an accessible diagram and all sections`, async ({ page }) => {
      await page.goto(`/architecture/${slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
      await expect(page).toHaveTitle(new RegExp(title));
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/architecture/${slug}$`));

      const diagram = page.getByRole("img", { name: /.+/ }).filter({ has: page.locator("title") });
      await expect(diagram).toHaveCount(1);
      await expect(diagram).toBeVisible();

      for (const h of ["Why it matters", "Diagram", "How it flows", "Boundaries", "Failure handling", "Trade-offs", "Related work"])
        await expect(page.getByRole("heading", { level: 2, name: h })).toBeVisible();

      await page.getByText("Diagram as text").click();
      await expect(page.getByText("Connections")).toBeVisible();
    });
  }

  test("unknown design returns 404", async ({ page }) => {
    const res = await page.goto("/architecture/does-not-exist");
    expect(res?.status()).toBe(404);
  });

  test("primary nav links to the lab", async ({ page, isMobile }) => {
    await page.goto("/");
    if (isMobile) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.locator("#mobile-nav").getByRole("link", { name: "Architecture" }).click();
    } else {
      await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Architecture" }).click();
    }
    await expect(page).toHaveURL(/\/architecture$/);
  });
});

test.describe("recruiter mode", () => {
  test("shows the key facts, contact links and actions", async ({ page }) => {
    await page.goto("/recruiter");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Narendra Avula");
    await expect(page.getByText("Software Engineer III, JPMorgan Chase · 11+ years · Hyderabad, India")).toBeVisible();
    const contact = page.getByRole("list", { name: "Contact" });
    await expect(contact.getByRole("link", { name: "narendraavula2@gmail.com" })).toHaveAttribute("href", "mailto:narendraavula2@gmail.com");
    await expect(contact.getByRole("link", { name: "linkedin.com/in/narendraavula" })).toBeVisible();
    for (const h of ["Summary", "Experience", "Selected highlights", "Skills", "Projects", "Education and certification"])
      await expect(page.getByRole("heading", { level: 2, name: h })).toBeVisible();
    for (const company of ["JPMorgan Chase", "Qvantel Software Solutions", "CustomFurnish / Hinshitsu Manufacturing"])
      await expect(page.getByRole("heading", { level: 3, name: new RegExp(company) })).toBeVisible();
    await expect(page.getByRole("button", { name: "Print / save as PDF" })).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: "Download resume" })).toHaveAttribute("href", "/resume.pdf");
  });

  test("print layout drops site chrome and uses light colours", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.setItem("theme", "dark"));
    await page.goto("/recruiter");
    await page.emulateMedia({ media: "print" });
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();
    await expect(page.locator("footer")).toBeHidden();
    await expect(page.getByRole("button", { name: "Print / save as PDF" })).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe("rgb(255, 255, 255)");
  });

  test("homepage snapshot links to the one-page profile", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "View Full Profile" }).click();
    await expect(page).toHaveURL(/\/recruiter$/);
  });
});
