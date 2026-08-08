import { test, expect } from "@playwright/test";

const readingRequest = {
  mode: "one_card",
  topic: "general",
  question: "What should I reflect on today?",
  locale: "en",
};

test("shared access code bypasses the monthly interpretation quota", async ({ page, context }) => {
  await context.addCookies([{ name: "fi", value: "3", url: "http://localhost:3000", httpOnly: true, sameSite: "Lax" }]);

  const before = await page.request.post("/api/tarot/draw", { data: readingRequest });
  expect(before.status()).toBe(402);

  await page.goto("/en/access");
  await page.getByLabel("Access code").fill("e2e-friends-access-code");
  await page.getByRole("button", { name: "Unlock unlimited access" }).click();
  await expect(page.getByText("Unlimited access is active in this browser.")).toBeVisible();

  const after = await page.request.post("/api/tarot/draw", { data: readingRequest });
  expect(after.ok()).toBe(true);
  await expect(after.json()).resolves.toMatchObject({ kind: "tarot" });

  await page.getByRole("button", { name: "Remove from this browser" }).click();
  await expect(page.getByRole("button", { name: "Unlock unlimited access" })).toBeVisible();
  const removed = await page.request.post("/api/tarot/draw", { data: readingRequest });
  expect(removed.status()).toBe(402);
});
