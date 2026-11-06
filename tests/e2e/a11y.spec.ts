import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/** One page of each route type */
const ROUTES = [
  "/",
  "/projects",
  "/projects/prepforge",
  "/architecture",
  "/architecture/rag-pipeline",
  "/insights",
  "/insights/idempotent-message-consumers",
  "/recruiter",
  "/does-not-exist",
];

async function axeViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  return violations.map((v) => ({
    rule: v.id,
    impact: v.impact,
    nodes: v.nodes.slice(0, 5).map((n) => n.target.join(" ")),
  }));
}

test.describe("axe (WCAG 2.2 AA)", () => {
  // Scan the final state, not mid-animation (fade-ins would read as low contrast)
  test.use({ reducedMotion: "reduce" });

  for (const theme of ["dark", "light"] as const) {
    test.describe(theme, () => {
      test.use({ colorScheme: theme });
      for (const route of ROUTES) {
        test(`${route} has no violations`, async ({ page }) => {
          await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
          await page.goto(route);
          await expect(page.locator("main")).toBeVisible();
          expect(await axeViolations(page)).toEqual([]);
        });
      }
    });
  }
});

test.describe("keyboard", () => {
  test("first Tab reaches the skip link, which moves focus to main", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press("Enter");
    await expect(page.locator("main#main")).toBeFocused();
  });

  test("every focusable element shows a visible focus indicator", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard navigation is a desktop concern");
    await page.goto("/");
    const missing: string[] = [];
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press("Tab");
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        const s = getComputedStyle(el);
        const ring = s.boxShadow !== "none";
        const outline = s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0;
        return { ok: ring || outline, name: `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 40)}"` };
      });
      if (info && !info.ok) missing.push(info.name);
    }
    expect(missing).toEqual([]);
  });

  test("mobile menu opens from the keyboard and closes with Escape", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the menu button only shows on small screens");
    await page.goto("/");
    const button = page.getByRole("button", { name: "Open menu" });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#mobile-nav")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-nav")).toBeHidden();
  });

  test("project filters work from the keyboard", async ({ page }) => {
    await page.goto("/projects");
    const search = page.getByRole("searchbox");
    await search.focus();
    await page.keyboard.type("zzzz-no-match");
    await expect(page.getByText(/no projects/i)).toBeVisible();
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("content is visible without waiting for animations", async ({ page }) => {
    await page.goto("/");
    // Scroll-triggered reveals must not leave content hidden
    for (const id of ["about", "projects", "experience", "contact"]) {
      const section = page.locator(`#${id}`);
      await section.scrollIntoViewIfNeeded();
      const opacity = await section.locator("h2").first().evaluate((h) => {
        let o = 1;
        for (let el: Element | null = h; el; el = el.parentElement) o *= parseFloat(getComputedStyle(el).opacity);
        return o;
      });
      expect(opacity, `#${id} heading opacity`).toBe(1);
    }
  });

  test("no CSS animations run", async ({ page }) => {
    await page.goto("/");
    const running = await page.evaluate(() =>
      document.getAnimations().filter((a) => a.playState === "running" && (a.effect as KeyframeEffect)?.getTiming().iterations === Infinity).length
    );
    expect(running).toBe(0);
  });
});
