import { expect, test } from "@playwright/test";

const SECTION_ORDER = ["top", "snapshot", "about", "projects", "skills", "experience", "impact", "education", "insights", "contact"];

test.describe("homepage", () => {
  test("renders the brief's sections in order", async ({ page }) => {
    await page.goto("/");
    const ids = await page.evaluate(() =>
      [...document.querySelectorAll("main section[id]")].map((s) => s.id)
    );
    expect(ids).toEqual(SECTION_ORDER);
  });

  test("hero shows the headline, highlights and three actions", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Engineering reliable systems. Building intelligent products."
    );
    const highlights = page.getByRole("list", { name: "Highlights" });
    for (const h of ["JPMorgan Chase", "Software Engineer III", "11+ Years Experience", "AWS Certified Developer"]) {
      await expect(highlights).toContainText(h);
    }
    const hero = page.locator("#top");
    await expect(hero.getByRole("link", { name: "Download Resume" })).toHaveAttribute("href", "/resume.pdf");
    await expect(hero.getByRole("link", { name: "Explore My Work" })).toHaveAttribute("href", "#projects");
    await expect(hero.getByRole("link", { name: "Contact Me" })).toHaveAttribute("href", "#contact");
  });

  test("stats are real numbers in the server HTML (no zeros)", async ({ request }) => {
    const html = (await request.get("/")).text();
    const body = (await html).replace(/<!-- -->/g, "");
    expect(body).toContain('tabular-nums">11+<');
    expect(body).not.toMatch(/tabular-nums">0</);
  });

  test("features the four brief projects; only written case studies are links", async ({ page }) => {
    await page.goto("/");
    const projects = page.locator("#projects");
    for (const t of ["PrepForge", "CheckMate", "Enterprise Resiliency Engineering", "PrepForge Academic Hub"]) {
      await expect(projects.getByRole("heading", { level: 3, name: t, exact: true })).toBeVisible();
    }
    for (const slug of ["prepforge", "enterprise-resiliency-engineering", "prepforge-academic-hub"]) {
      await expect(projects.locator(`a[href="/projects/${slug}"]`)).toHaveCount(1);
    }
    await expect(projects.locator('a[href="/projects/checkmate"]')).toHaveCount(0);
    await expect(projects.getByRole("link", { name: "View all projects" })).toHaveAttribute("href", "/projects");
  });

  test("defaults to dark theme and the toggle persists light", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page.getByRole("button", { name: "Switch to light theme" }).click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await page.reload();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });

  test("has no horizontal overflow", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });

  test("skip link moves focus to main content", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard flow is desktop-only");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
});

test.describe("navigation", () => {
  test("desktop nav links point to existing sections", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop nav is hidden on mobile");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    const hrefs = await nav.locator("ul a").evaluateAll((as) => as.map((a) => a.getAttribute("href")!));
    expect(hrefs).toEqual(["/#top", "/#about", "/#experience", "/projects", "/architecture", "/insights", "/#contact"]);
    for (const href of hrefs.filter((h) => h.startsWith("/#"))) {
      await expect(page.locator(href.slice(1))).toHaveCount(1);
    }
    await expect(nav.getByRole("link", { name: "Download Resume" })).toHaveAttribute("download", /\.pdf$/);
  });

  test("mobile menu opens, navigates and closes with Escape", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const menu = page.locator("#mobile-nav");
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "Download Resume" })).toBeVisible();
    await menu.getByRole("link", { name: "Experience" }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(/#experience$/);

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
  });
});

test.describe("SEO", () => {
  test("metadata uses the canonical site URL, not the dead domain", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Narendra Avula/);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    const ogImage = await page.locator('meta[property="og:image"]').first().getAttribute("content");
    for (const url of [canonical, ogImage]) {
      expect(url).toContain("narendra-portfolio-woad.vercel.app");
      expect(url).not.toContain("narendraavula.com");
    }
  });

  test("robots and sitemap point at the canonical site URL", async ({ request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Sitemap: https://narendra-portfolio-woad.vercel.app/sitemap.xml");
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("<loc>https://narendra-portfolio-woad.vercel.app/</loc>");
    expect(sitemap).toContain("<loc>https://narendra-portfolio-woad.vercel.app/projects/prepforge</loc>");
    expect(sitemap).not.toContain("/projects/checkmate");
  });
});

test.describe("experience", () => {
  test("each role shows context, responsibilities and expandable projects", async ({ page }) => {
    await page.goto("/");
    const exp = page.locator("#experience");
    for (const company of ["JPMorgan Chase", "Qvantel Software Solutions", "CustomFurnish / Hinshitsu Manufacturing"]) {
      await expect(exp.getByRole("list", { name: `Responsibilities at ${company}` })).toBeVisible();
    }
    const qvantel = exp.locator("details", { hasText: "Projects at Qvantel" });
    await expect(qvantel.getByText("Developed five major features for the BSS platform.")).toBeHidden();
    await qvantel.locator("summary").click();
    await expect(qvantel.getByText("Developed five major features for the BSS platform.")).toBeVisible();
    await expect(qvantel.getByText("Client: Ericsson")).toBeVisible();
  });

  test("project details are keyboard accessible", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard flow is desktop-only");
    await page.goto("/");
    const summary = page.locator("#experience details", { hasText: "Projects at CustomFurnish" }).locator("summary");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("heading", { name: "BatchTag.com", level: 4 })).toBeVisible();
  });
});
