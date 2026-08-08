import { test, expect, type Page } from "@playwright/test";

async function pickCityById(page: Page, prefix: string, country: string, countryOpt: RegExp, city: string, cityOpt: RegExp) {
  await page.locator(`#${prefix}-country`).click();
  await page.locator(`#${prefix}-country`).fill(country);
  await page.getByRole("option", { name: countryOpt }).first().click();
  await page.locator(`#${prefix}-city`).click();
  await page.locator(`#${prefix}-city`).fill(city);
  await page.getByRole("option", { name: cityOpt }).first().click();
}

test("compatibility astrology mode: two world cities → facts + interpretation + share card", async ({ page }) => {
  await page.goto("/en/compatibility/astrology");

  // Person A — a mid-sized city, not a capital (world-coverage check).
  await page.locator("#a-date").fill("1992-08-08");
  await page.locator("#a-time").fill("14:30");
  await pickCityById(page, "a", "china", /^China/, "foshan", /Foshan/);

  // Person B — different country through the second picker instance.
  await page.locator("#b-date").fill("1994-03-21");
  await page.locator("#b-time").fill("09:15");
  await pickCityById(page, "b", "united king", /United Kingdom/, "leeds", /Leeds/);

  await page.getByRole("button", { name: /generate compatibility report/i }).click();

  // Deterministic facts render, then the (sample) interpretation.
  await expect(page.getByText(/sun/i).first()).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText(/sample interpretation|interpretation/i).first()).toBeVisible({ timeout: 30_000 });

  // Share card is sanitized and reachable (link appears in a copyable input).
  await page.getByRole("button", { name: /share/i }).first().click();
  const linkInput = page.locator('input[value*="/share/"]');
  await expect(linkInput).toBeVisible({ timeout: 15_000 });
  const shareUrl = await linkInput.inputValue();
  await page.goto(shareUrl);
  // The share card renders the interpretation summary + the entertainment disclaimer…
  await expect(page.getByText(/entertainment, cultural exploration/i).first()).toBeVisible();
  // …and never any birth data (spec §13 privacy-safe share cards).
  await expect(page.getByText("1992-08-08")).toHaveCount(0);
  await expect(page.getByText("1994-03-21")).toHaveCount(0);
  await expect(page.getByText(/Foshan|Leeds/)).toHaveCount(0);
});
