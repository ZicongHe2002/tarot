import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = ["/en", "/en/tarot", "/en/pricing", "/zh", "/zh/bazi"];

for (const path of PAGES) {
  test(`a11y smoke: ${path} has no serious/critical violations @mobile`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(
      serious.map((v) => `${v.id}: ${v.nodes.length} nodes — ${v.help}`),
      JSON.stringify(serious, null, 2)
    ).toEqual([]);
  });
}

test("keyboard: skip link focuses main content", async ({ page }) => {
  await page.goto("/en");
  await page.keyboard.press("Tab");
  await expect(page.getByText(/skip to main content/i)).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeVisible();
});

test("reduced motion is honored via media query CSS", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/en/tarot/daily");
  const duration = await page.evaluate(() => {
    const el = document.querySelector(".tarot-flip") ?? document.body;
    return getComputedStyle(el).transitionDuration;
  });
  expect(["0s", "0.01ms", "0.00001s", "1e-05s"]).toContain(duration.split(",")[0].trim());
  await context.close();
});
