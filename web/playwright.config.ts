import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 90_000,
  retries: 0,
  workers: 1, // shared SQLite dev database — keep runs deterministic
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile-375",
      // Chromium-based 375px viewport (spec §25 mobile check) — webkit not installed.
      use: { ...devices["Desktop Chrome"], viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true },
      grep: /@mobile/,
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000/en",
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
