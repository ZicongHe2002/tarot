import { test, expect } from "@playwright/test";
import { signIn } from "./helpers";

test("Chinese country search selects China and unlocks city search", async ({ page }) => {
  await signIn(page, `e2e-geo-${Date.now()}@test.local`);
  await page.goto("/zh/account/profiles/new");
  await page.getByLabel("档案名称").fill("中文城市档案");
  await page.getByLabel("出生日期").fill("1992-08-08");
  await page.getByLabel("我不知道确切的出生时间").check();

  const country = page.getByRole("combobox", { name: "出生国家 / 地区" });
  await country.fill("中国");
  await page.getByRole("option", { name: /中国（China）/ }).click();

  const city = page.getByRole("combobox", { name: "出生城市" });
  await expect(city).toBeEnabled();
  await city.fill("杭州");
  await page.getByRole("option", { name: /杭州，浙江/ }).first().click();
  await expect(city).toHaveValue("杭州，浙江");

  await page.getByRole("button", { name: "下一步" }).click();
  await expect(page.getByText("杭州，浙江")).toBeVisible();
  await page.getByRole("button", { name: "确认" }).click();
  await expect(page).toHaveURL(/\/zh\/account\/profiles$/);
  await expect(page.getByText("杭州，浙江")).toBeVisible();
});
