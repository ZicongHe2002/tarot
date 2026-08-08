import { type Page, expect } from "@playwright/test";

/** Complete the real email magic-link flow using the dev mailbox. */
export async function signIn(page: Page, email: string) {
  await page.goto("/en/account/signin");
  await page.getByLabel(/email/i).fill(email);
  await page.getByRole("button", { name: /sign-in link/i }).click();
  // The dev mailbox stores the link the moment Auth.js "sends" it.
  await expect
    .poll(
      async () => {
        const res = await page.request.get(`/api/dev/magic-link?email=${encodeURIComponent(email)}`);
        return res.ok() ? (await res.json()).url : null;
      },
      { timeout: 15_000 }
    )
    .toBeTruthy();
  const res = await page.request.get(`/api/dev/magic-link?email=${encodeURIComponent(email)}`);
  const { url } = await res.json();
  await page.goto(url);
  await page.goto("/en/account");
  await expect(page.getByText(email)).toBeVisible();
}

/** Country → city selection through the world-city picker. */
export async function pickCity(page: Page, opts: { country: string; countryOption: RegExp; city: string; cityOption: RegExp; prefixLabels?: { country: RegExp; city: RegExp } }) {
  const countryBox = page.getByRole("combobox", { name: opts.prefixLabels?.country ?? /birth country/i });
  await countryBox.click();
  await countryBox.fill(opts.country);
  await page.getByRole("option", { name: opts.countryOption }).first().click();
  const cityBox = page.getByRole("combobox", { name: opts.prefixLabels?.city ?? /birth city/i });
  await cityBox.click();
  await cityBox.fill(opts.city);
  await page.getByRole("option", { name: opts.cityOption }).first().click();
}

export async function createProfile(page: Page, label: string) {
  await page.goto("/en/account/profiles/new");
  await page.getByLabel(/profile name/i).fill(label);
  await page.getByLabel(/date of birth/i).fill("1992-08-08");
  await page.getByRole("textbox", { name: "Exact birth time" }).fill("14:30");
  await pickCity(page, { country: "china", countryOption: /^China/, city: "beijing", cityOption: /Beijing/ });
  await page.getByRole("button", { name: "Next", exact: true }).click();
  // Normalization confirmation step (spec §8)
  await expect(page.getByText(/Asia\/Shanghai/)).toBeVisible();
  await page.getByRole("button", { name: "Confirm", exact: true }).click();
  await expect(page).toHaveURL(/account\/profiles/);
  await expect(page.getByText(label)).toBeVisible();
}
