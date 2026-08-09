import { test, expect } from "@playwright/test";
import { signIn } from "./helpers";

test("one saved profile fills BaZi and both compatibility people", async ({ page }) => {
  await signIn(page, `e2e-profile-reuse-${Date.now()}@test.local`);

  await page.goto("/zh/account/profiles/new");
  await page.getByLabel("档案名称").fill("小明");
  await page.getByLabel("出生日期").fill("1992-08-08");
  await page.getByRole("textbox", { name: "确切出生时间" }).fill("14:30");
  await page.getByRole("radio", { name: "男", exact: true }).check();

  const country = page.getByRole("combobox", { name: "出生国家 / 地区" });
  await country.fill("中国");
  await page.getByRole("option", { name: /中国（China）/ }).click();
  const city = page.getByRole("combobox", { name: "出生城市" });
  await city.fill("杭州");
  await page.getByRole("option", { name: /杭州，浙江/ }).first().click();

  await page.getByRole("button", { name: "下一步" }).click();
  await page.getByRole("button", { name: "确认" }).click();
  await expect(page).toHaveURL(/\/zh\/account\/profiles$/);

  const profileResponse = await page.request.get("/api/account/profiles?locale=zh");
  expect(profileResponse.ok()).toBeTruthy();
  const profileBody = await profileResponse.json();
  expect(profileBody.profiles).toHaveLength(1);
  expect(profileBody.profiles[0]).toMatchObject({
    label: "小明",
    dateISO: "1992-08-08",
    time: "14:30",
    cityLabel: "杭州，浙江",
    sex: "male",
  });

  await page.goto("/zh/bazi/calculator");
  const baziProfile = page.getByRole("combobox", { name: "选择出生档案" });
  await baziProfile.click();
  await page.getByRole("option", { name: /小明 · 1992-08-08 · 杭州，浙江/ }).click();
  await expect(page.locator("#bazi-date")).toHaveValue("1992-08-08");
  await expect(page.locator("#bazi-time")).toHaveValue("14:30");
  await expect(page.locator("#bazi-city")).toHaveValue("杭州，浙江");
  await expect(page.getByRole("radio", { name: "男", exact: true })).toBeChecked();

  const baziRequest = page.waitForRequest((request) => request.url().endsWith("/api/bazi/chart"));
  await page.getByRole("button", { name: "查看我的八字" }).click();
  const baziPayload = (await baziRequest).postDataJSON();
  expect(baziPayload.profileId).toBe(profileBody.profiles[0].id);
  expect(baziPayload.birth).toBeUndefined();

  await page.goto("/zh/compatibility/combined");
  const personA = page.getByRole("combobox", { name: "选择甲方档案" });
  await personA.click();
  await page.getByRole("option", { name: /小明 · 1992-08-08 · 杭州，浙江/ }).click();
  const personB = page.getByRole("combobox", { name: "选择乙方档案" });
  await personB.click();
  await page.getByRole("option", { name: /小明 · 1992-08-08 · 杭州，浙江/ }).click();

  await expect(page.locator("#a-date")).toHaveValue("1992-08-08");
  await expect(page.locator("#a-city")).toHaveValue("杭州，浙江");
  await expect(page.locator("#b-date")).toHaveValue("1992-08-08");
  await expect(page.locator("#b-city")).toHaveValue("杭州，浙江");
});
