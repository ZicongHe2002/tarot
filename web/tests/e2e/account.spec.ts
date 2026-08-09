import { test, expect } from "@playwright/test";
import { signIn, createProfile, pickCity } from "./helpers";

test.describe("profiles and account lifecycle", () => {
  test("email sign-in, profile creation with normalization, unknown-time handling", async ({ page }) => {
    const email = `e2e-profile-${Date.now()}@test.local`;
    await signIn(page, email);
    await createProfile(page, "Me (e2e)");

    // Unknown-time profile: check the box and confirm no time is required.
    await page.goto("/en/account/profiles/new");
    await page.getByLabel(/profile name/i).fill("No-time profile");
    await page.getByLabel(/date of birth/i).fill("1995-01-15");
    await page.getByLabel(/i do not know my exact birth time/i).check();
    await expect(page.getByText(/we do not calculate the ascendant/i)).toBeVisible();
    await pickCity(page, { country: "hong kong", countryOption: /Hong Kong/, city: "hong", cityOption: /Hong Kong/ });
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await page.getByRole("button", { name: "Confirm", exact: true }).click();
    await expect(page.getByText("No-time profile")).toBeVisible();
  });

  test("account deletion removes access", async ({ page }) => {
    const email = `e2e-delete-${Date.now()}@test.local`;
    await signIn(page, email);
    await page.goto("/en/account/delete");
    await page.getByRole("textbox").fill("DELETE");
    await page.getByRole("button", { name: /delete/i }).click();
    await page.waitForURL(/\/en(\/)?$/, { timeout: 15_000 });
    await page.goto("/en/account/profiles");
    await expect(page.getByText(/sign in/i).first()).toBeVisible();
  });

  test("journal API rejects unauthenticated access (server-side authz)", async ({ request }) => {
    expect((await request.get("/api/journal")).status()).toBe(401);
    expect(
      (
        await request.post("/api/journal", {
          data: { kind: "note", title: "x" },
        })
      ).status()
    ).toBe(401);
    expect((await request.get("/api/account/export")).status()).toBe(401);
    expect((await request.get("/api/account/profiles?locale=zh")).status()).toBe(401);
  });
});
