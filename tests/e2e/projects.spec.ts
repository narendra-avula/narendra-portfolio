import { expect, test } from "@playwright/test";

const caseStudies = [
  ["prepforge", "PrepForge"],
  ["prepforge-academic-hub", "PrepForge Academic Hub"],
  ["enterprise-resiliency-engineering", "Enterprise Resiliency Engineering"],
] as const;

test.describe("projects catalogue", () => {
  test("lists every project, filters by category and searches", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Systems I have built.");
    const list = page.getByRole("list", { name: "Projects" });
    const cards = list.locator(":scope > li");
    const total = await cards.count();
    expect(total).toBe(10);

    await page.getByRole("button", { name: "Cloud" }).click();
    await expect(page.getByRole("button", { name: "Cloud" })).toHaveAttribute("aria-pressed", "true");
    await expect(cards).toHaveCount(1);
    await expect(list.getByRole("heading", { name: "Enterprise Resiliency Engineering" })).toBeVisible();

    await page.getByRole("button", { name: "All" }).click();
    await page.getByRole("searchbox", { name: "Search projects" }).fill("ericsson");
    await expect(cards).toHaveCount(1);
    await expect(page.getByRole("status")).toHaveText("1 project");
    await expect(list.getByRole("heading", { name: "Digital BSS Platform" })).toBeVisible();
  });

  test("shows an empty state that clears filters", async ({ page }) => {
    await page.goto("/projects");
    await page.getByRole("button", { name: "Personal" }).click();
    await page.getByRole("searchbox", { name: "Search projects" }).fill("rabbitmq");
    await expect(page.getByText("No projects match.")).toBeVisible();
    await page.getByRole("button", { name: "Clear filters" }).click();
    await expect(page.getByRole("list", { name: "Projects" }).locator(":scope > li")).toHaveCount(10);
  });

  test("a card opens its case study", async ({ page }) => {
    await page.goto("/projects");
    await page.getByRole("link", { name: "PrepForge", exact: true }).click();
    await expect(page).toHaveURL(/\/projects\/prepforge$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("PrepForge");
  });
});

test.describe("case studies", () => {
  for (const [slug, title] of caseStudies) {
    test(`${slug} renders with metadata and status labels`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(`/projects/${slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
      for (const h of ["Overview", "Problem", "Solution", "What exists today", "Technology stack", "My contribution", "Source and demo"]) {
        await expect(page.getByRole("heading", { level: 2, name: h, exact: true })).toBeVisible();
      }
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://narendra-portfolio-woad.vercel.app/projects/${slug}`
      );
      await expect(page).toHaveTitle(new RegExp(`^${title}`));
      expect(errors).toEqual([]);
    });
  }

  test("employer work is labelled sanitized and illustrative", async ({ page }) => {
    await page.goto("/projects/enterprise-resiliency-engineering");
    await expect(page.getByText(/not JPMorgan Chase's production architecture/)).toBeVisible();
    await expect(page.getByText(/Illustrative only/)).toBeVisible();
  });

  test("unknown and unwritten slugs return 404", async ({ page }) => {
    for (const slug of ["does-not-exist", "checkmate"]) {
      const res = await page.goto(`/projects/${slug}`);
      expect(res?.status()).toBe(404);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page doesn't exist.");
    }
  });

  test("table of contents links to every section", async ({ page, isMobile }) => {
    test.skip(isMobile, "the table of contents is desktop-only");
    await page.goto("/projects/prepforge");
    const toc = page.getByRole("navigation", { name: "On this page" });
    const targets = await toc.locator("a").evaluateAll((as) => as.map((a) => a.getAttribute("href")!));
    expect(targets.length).toBeGreaterThan(8);
    for (const t of targets) await expect(page.locator(t)).toHaveCount(1);
  });

  test("no horizontal overflow on a case study", async ({ page }) => {
    await page.goto("/projects/prepforge");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test("nav Projects goes to the catalogue and is marked current there", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop nav");
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Projects" })
  ).toHaveAttribute("aria-current", "page");
});
