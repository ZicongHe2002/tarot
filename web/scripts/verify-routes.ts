// Crawls every public route in both locales against a running dev/prod server
// and fails on non-200s or rendered error markers. Usage:
//   npm run dev   (in another terminal)
//   npm run verify:routes
const BASE = process.env.VERIFY_BASE_URL || "http://localhost:3000";

const CARD_SLUGS = ["the-fool", "the-tower", "ace-of-wands", "ten-of-swords", "queen-of-cups", "king-of-pentacles"];
const PATHS: string[] = [
  "",
  "/tarot",
  "/tarot/daily",
  "/tarot/one-card",
  "/tarot/three-card",
  "/tarot/yes-or-no",
  "/tarot/cards",
  ...CARD_SLUGS.map((s) => `/tarot/cards/${s}`),
  "/astrology",
  "/astrology/birth-chart",
  "/astrology/transits",
  "/astrology/placements/sun-in-aries",
  "/astrology/placements/sun-in-pisces",
  "/horoscope/leo/daily",
  "/horoscope/capricorn/daily",
  "/bazi",
  "/bazi/calculator",
  "/bazi/five-elements",
  "/bazi/ten-gods",
  "/bazi/luck-pillars",
  "/bazi/methodology",
  "/bazi/day-master/jia-wood",
  "/bazi/day-master/gui-water",
  "/daily-guidance",
  "/compatibility",
  "/compatibility/astrology",
  "/compatibility/bazi",
  "/compatibility/combined",
  "/journal",
  "/learn",
  "/learn/what-is-tarot",
  "/learn/how-we-use-ai",
  "/learn/unknown-birth-time",
  "/pricing",
  "/account",
  "/account/signin",
  "/account/check-email",
  "/account/profiles",
  "/account/profiles/new",
  "/account/subscription",
  "/account/privacy",
  "/account/delete",
  "/admin",
  "/legal/terms",
  "/legal/privacy",
  "/legal/cookies",
  "/legal/subscriptions",
  "/legal/refunds",
  "/legal/disclaimer",
  "/legal/ai-disclosure",
];

const ERROR_MARKERS = [
  "Application error",
  "Internal Server Error",
  "__next_error__",
  "Unhandled Runtime Error",
];

async function main() {
  const failures: string[] = [];
  let checked = 0;
  for (const locale of ["en", "zh"]) {
    for (const path of PATHS) {
      const url = `${BASE}/${locale}${path}`;
      try {
        const res = await fetch(url, { redirect: "manual" });
        const body = await res.text();
        if (res.status !== 200) {
          failures.push(`${res.status}  ${url}`);
        } else {
          const marker = ERROR_MARKERS.find((m) => body.includes(m));
          if (marker) failures.push(`marker "${marker}"  ${url}`);
        }
      } catch (e) {
        failures.push(`fetch failed  ${url}  ${e}`);
      }
      checked++;
    }
  }
  // API surface sanity (no auth): cities lookup + sitemap/robots.
  for (const [url, expect] of [
    [`${BASE}/api/cities`, `"countries"`],
    [`${BASE}/api/cities?country=CN&q=shen`, `Shenzhen`],
    [`${BASE}/sitemap.xml`, `<urlset`],
    [`${BASE}/robots.txt`, `Sitemap:`],
  ] as const) {
    const res = await fetch(url);
    const body = await res.text();
    if (res.status !== 200 || !body.includes(expect)) failures.push(`api check failed  ${url}`);
    checked++;
  }

  console.log(`Checked ${checked} URLs.`);
  if (failures.length) {
    console.error(`FAILURES (${failures.length}):\n` + failures.join("\n"));
    process.exit(1);
  }
  console.log("ALL ROUTES OK");
}

main();
