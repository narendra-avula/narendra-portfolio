import { expect, test } from "@playwright/test";

test("homepage renders without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(errors).toEqual([]);
});

test("resume is downloadable", async ({ request }) => {
  const res = await request.get("/resume.pdf");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("pdf");
});

test("every in-page link has a target", async ({ page }) => {
  await page.goto("/");
  const missing = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]
      .map((a) => a.getAttribute("href")!)
      .filter((h) => h.length > 1 && !document.querySelector(h))
  );
  expect(missing).toEqual([]);
});

test("analytics wiring records project views and resume clicks", async ({ page }) => {
  await page.addInitScript(() => {
    const calls: unknown[] = [];
    const browserWindow = window as Window & {
      __analyticsCalls?: unknown[];
      va?: (...args: unknown[]) => void;
    };
    browserWindow.__analyticsCalls = calls;
    browserWindow.va = (...args: unknown[]) => calls.push(args);
  });

  await page.goto("/projects/prepforge");
  await expect.poll(async () => page.evaluate(() => (window as Window & { __analyticsCalls?: unknown[] }).__analyticsCalls ?? [])).toEqual(
    expect.arrayContaining([
      expect.arrayContaining([
        "event",
        expect.objectContaining({ name: "Project Visit" }),
      ]),
    ]),
  );

  await page.goto("/");
  await page.getByRole("link", { name: "Download Resume" }).first().click();
  await expect.poll(async () => page.evaluate(() => (window as Window & { __analyticsCalls?: unknown[] }).__analyticsCalls ?? [])).toEqual(
    expect.arrayContaining([
      expect.arrayContaining([
        "event",
        expect.objectContaining({ name: "Resume Download" }),
      ]),
    ]),
  );
});
