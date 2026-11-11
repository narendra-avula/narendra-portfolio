import { expect, test } from "@playwright/test";

const article = "/insights/idempotent-message-consumers";

test.describe("insights", () => {
  test("index lists articles and filters them", async ({ page }) => {
    await page.goto("/insights");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const list = page.getByRole("list", { name: "Articles" });
    const items = list.locator(":scope > li");
    await expect(items).toHaveCount(2);
    await expect(list.getByText("Draft — unpublished").first()).toBeVisible();

    await page.getByRole("button", { name: "Cloud Engineering" }).click();
    await expect(items).toHaveCount(1);
    await page.getByRole("button", { name: "All" }).click();
    await page.getByLabel("Search articles").fill("rabbitmq");
    await expect(list.getByRole("heading", { name: /Idempotent message consumers/ })).toBeVisible();
    await page.getByLabel("Search articles").fill("nothing-matches-this");
    await expect(page.getByText("No articles match.")).toBeVisible();
  });

  test("article renders with reading time, working TOC, related and noindex for drafts", async ({ page }) => {
    await page.goto(article);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Idempotent message consumers");
    await expect(page.getByText(/\d+ min read/).first()).toBeVisible();
    await expect(page.getByText("This article is an unpublished draft.")).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

    const missing = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLAnchorElement>('nav[aria-label="On this page"] a')]
        .map((a) => a.getAttribute("href")!)
        .filter((h) => !document.querySelector(h))
    );
    expect(missing).toEqual([]);
    expect(await page.locator('nav[aria-label="On this page"] a').count()).toBeGreaterThan(3);

    await expect(page.getByRole("heading", { name: "Related insights" })).toBeVisible();
    await expect(page.locator("pre").first()).toBeVisible();
  });

  test("unknown article returns 404", async ({ request }) => {
    expect((await request.get("/insights/does-not-exist")).status()).toBe(404);
  });

  test("homepage never shows draft articles", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#insights");
    await expect(section.getByText("First articles are in progress")).toBeVisible();
    await expect(section.getByText("Draft — unpublished")).toHaveCount(0);
  });
});

test.describe("SEO", () => {
  const routes: [string, RegExp][] = [
    ["/", /Narendra Avula \| Senior Software Engineer/],
    ["/projects", /^Projects \| Narendra Avula$/],
    ["/projects/prepforge", /PrepForge/],
    ["/architecture", /^Architecture Lab \| Narendra Avula$/],
    ["/recruiter", /^Recruiter profile \| Narendra Avula$/],
    ["/insights", /^Insights \| Narendra Avula$/],
    [article, /Idempotent message consumers/],
  ];

  for (const [path, title] of routes) {
    test(`${path} has its own title, description and canonical URL`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(new URL(canonical!).pathname.replace(/\/$/, "") || "/").toBe(path);
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    });
  }

  test("Person and WebSite JSON-LD are present and valid JSON", async ({ page }) => {
    await page.goto("/");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = blocks.flatMap((b) => [JSON.parse(b)].flat()).map((d) => d["@type"]);
    expect(types).toEqual(expect.arrayContaining(["Person", "WebSite"]));
  });

  test("sitemap lists insights but never drafts; robots points at it", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("/insights</loc>");
    expect(sitemap).not.toContain("/insights/");
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toMatch(/Sitemap: .*\/sitemap\.xml/);
  });
});

test.describe("contact", () => {
  test("without an email provider the form is hidden and email is offered", async ({ page }) => {
    await page.goto("/#contact");
    const section = page.locator("#contact");
    await expect(section.getByRole("link", { name: /Email/ })).toHaveAttribute("href", /^mailto:/);
    await expect(section.locator("form")).toHaveCount(0);
  });
});
