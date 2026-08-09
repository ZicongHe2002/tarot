import { test, expect } from "@playwright/test";
import { signIn } from "./helpers";

test("Chinese country search selects China and unlocks city search", async ({ page }) => {
  await signIn(page, `e2e-geo-${Date.now()}@test.local`);
  await page.goto("/zh/account/profiles/new");

  const country = page.getByRole("combobox", { name: "出生国家 / 地区" });
  await country.fill("中国");
  await page.getByRole("option", { name: /中国（China）/ }).click();

  const city = page.getByRole("combobox", { name: "出生城市" });
  await expect(city).toBeEnabled();
  await city.fill("杭州");
  await page.getByRole("option", { name: /Hangzhou/ }).first().click();
  await expect(city).toHaveValue(/Hangzhou/);
});
