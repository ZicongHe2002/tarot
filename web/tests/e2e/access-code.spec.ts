import { test, expect } from "@playwright/test";
import { createProfile } from "./helpers";

const readingRequest = {
  mode: "one_card",
  topic: "general",
  question: "What should I reflect on today?",
  locale: "en",
};

test("personal tokens create isolated accounts with unlimited interpretations", async ({ page, context }) => {
  await context.addCookies([{ name: "fi", value: "3", url: "http://localhost:3000", httpOnly: true, sameSite: "Lax" }]);

  const before = await page.request.post("/api/tarot/draw", { data: readingRequest });
  expect(before.status()).toBe(402);

  await page.goto("/en/access");
  await page.getByLabel("Personal token").fill("e2e-friends-access-code");
  await page.getByRole("button", { name: "Sign in with token" }).click();
  await expect(page.getByText("This token account is signed in with unlimited access.")).toBeVisible();

  await page.goto("/en/account");
  await expect(page.getByText("Independent token account")).toBeVisible();
  await page.goto("/en/account/profiles");
  await expect(page.getByRole("heading", { name: /birth profiles/i })).toBeVisible();
  await createProfile(page, "Private token profile");
  await page.goto("/en/access");

  const after = await page.request.post("/api/tarot/draw", { data: readingRequest });
  expect(after.ok()).toBe(true);
  await expect(after.json()).resolves.toMatchObject({ kind: "tarot" });

  await page.getByRole("button", { name: "Sign out of this token account" }).click();
  await expect(page.getByRole("button", { name: "Sign in with token" })).toBeVisible();

  await page.getByLabel("Personal token").fill("e2e-second-person-code");
  await page.getByRole("button", { name: "Sign in with token" }).click();
  await expect(page.getByText("This token account is signed in with unlimited access.")).toBeVisible();
  await page.goto("/en/account/profiles");
  await expect(page.getByRole("heading", { name: /birth profiles/i })).toBeVisible();
  await expect(page.getByText("Private token profile")).toHaveCount(0);

  await page.goto("/en/access");
  await page.getByRole("button", { name: "Sign out of this token account" }).click();
  await page.getByLabel("Personal token").fill("e2e-friends-access-code");
  await page.getByRole("button", { name: "Sign in with token" }).click();
  await expect(page.getByText("This token account is signed in with unlimited access.")).toBeVisible();
  await page.goto("/en/account/profiles");
  await expect(page.getByText("Private token profile").first()).toBeVisible();
  const deleted = await page.request.post("/api/account/delete", { data: { confirm: "DELETE" } });
  expect(deleted.ok()).toBe(true);

  const removed = await page.request.post("/api/tarot/draw", { data: readingRequest });
  expect(removed.status()).toBe(402);
});
