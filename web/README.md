# [BRAND_NAME] — Tarot · Astrology · BaZi platform

Bilingual (English / 简体中文) self-reflection platform: tarot readings, Western
astrology birth charts, Chinese BaZi Four Pillars, daily guidance, compatibility,
and a private journal — with Stripe-ready payments.

**Core architectural rule:** *deterministic engines calculate; AI interprets.*
The interpretation model never draws a card, computes a position, or invents a
pillar. It receives structured calculated facts and returns schema-validated
JSON, checked by a safety layer before display.

Requirements sources: `../AI_Human_Payment_Requirements_DeepSeek_Interpretation_Only.md`
(v1.1, payment architecture) plus the product MVP specification.

---

## Quick start

```bash
# prerequisites: Node 20+ (built on Node 26)
cp .env.example .env          # then fill in AUTH_SECRET (openssl rand -base64 32)
npm install
npx prisma migrate dev        # creates SQLite dev.db
npm run db:seed               # 78 tarot cards, products/prices, articles, versions

# World city database (GeoNames cities1000, CC-BY 4.0): 170k cities, 246
# countries, per-city IANA timezone — powers the birth-place picker.
mkdir -p data/geo && cd data/geo \
  && curl -sLO https://download.geonames.org/export/dump/cities1000.zip \
  && curl -sLO https://download.geonames.org/export/dump/admin1CodesASCII.txt \
  && unzip -o cities1000.zip && cd ../..
npm run db:cities

npm run dev                   # http://localhost:3000
```

Without any API keys the site runs fully, with **clearly labeled sample
interpretations** and (if `DEV_FAKE_PAYMENTS=1`) a **simulated payment**
button. Nothing mock is ever presented as live.

### Connecting real providers

| Provider | How | Notes |
|---|---|---|
| DeepSeek (interpretation only) | set `DEEPSEEK_API_KEY` | model `deepseek-v4-pro` via `DEEPSEEK_MODEL`; legacy `deepseek-chat`/`deepseek-reasoner` are deprecated 2026-07-24 |
| Stripe | set `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`, run `stripe listen --forward-to localhost:3000/api/stripe/webhook` | **Get written category approval first — see Payment-provider risk** |
| Email sign-in | set `RESEND_API_KEY` + `EMAIL_FROM` | uses Resend's HTTPS API (works on Render free); dev mode prints magic links + `/api/dev/magic-link` |
| Google OAuth | set `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` | button appears automatically |

### Swapping calculation engines

Engines sit behind typed interfaces in `lib/providers/types.ts`
(`AstrologyEngine`, `BaziEngine`, `TarotEngine`, `InterpretationEngine`).
The bundled implementations are **real, tested engines**, not demos:

- **Astrology** — astronomy-engine 2.1.19: geocentric true-ecliptic-of-date
  longitudes, tropical zodiac, whole-sign houses, Meeus ascendant. Verified
  against equinox/solstice geometry (`npm run verify:engines`).
- **BaZi** — lunar-javascript 1.7.7: sexagenary pillars, solar-term (节)
  month boundaries, luck pillars. Verified against documented reference dates
  (1949-10-01 = 甲子 day) and cross-checked Ten-God derivation.
- **Tarot** — crypto-secure Fisher–Yates; no duplicates per spread; orientation
  independent; deterministic daily card per (seed, date).

To swap one (e.g. a licensed Swiss Ephemeris service), implement the interface
and change the export in `lib/providers/<engine>.ts`. Every stored result
carries `calculationEngine/Version`, `methodologyVersion`, `promptVersion`,
`modelProvider/Name`, `safetyPolicyVersion`, `generatedAt`.

---

## Tests

```bash
npm test               # Vitest: draw rules, unknown-time, adapters, zod, safety, geo (41 tests)
npm run verify:engines # astronomical + calendrical reference checks
npm run verify:routes  # crawls every public route in both locales (dev server must be running)
npm run test:e2e       # Playwright: tarot, profiles, purchase mock, cancellation, deletion, compatibility+share, a11y smoke
```

## Database

SQLite locally (`prisma/dev.db`), schema written Postgres-portable (no Prisma
enums; JSON as string columns). To move to PostgreSQL:

1. `provider = "postgresql"` in `prisma/schema.prisma`
2. set `DATABASE_URL`
3. regenerate migrations against postgres (`npx prisma migrate dev`), then
   `npx prisma migrate deploy` in later environments

## Deployment notes

- Any Node host works (Vercel, Fly, Render, a VPS). `next build && next start`.
- For Render, the repository-root `render.yaml` provisions a free preview web
  service and Postgres database; see `DEPLOYMENT.md` for the one-click flow and
  the free database's 30-day expiry warning.
- Set `APP_BASE_URL` to the public origin (canonical URLs, sitemap, Stripe redirects).
- Configure the Stripe webhook endpoint `https://<domain>/api/stripe/webhook`
  with the events listed in md §14; put the signing secret in `STRIPE_WEBHOOK_SECRET`.
- `DEV_FAKE_PAYMENTS` is ignored in production builds (double-gated in code) —
  the flag alone can never enable simulated payments in prod.
- Recommended CSP: `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' https://api.stripe.com; frame-src https://checkout.stripe.com` (Checkout itself runs on Stripe's domain).
- Run `prisma migrate deploy` + `npm run db:seed` once per environment.

## Payment-provider risk (read before launch — md §11)

Stripe's restricted-business list **prohibits psychic services / fortune
tellers in some jurisdictions (verified July 2026: Japan, Mexico, Thailand)**
and may require review elsewhere. Before relying on Stripe:

1. Fix the operating entity's country (mainland-China entities cannot onboard).
2. Send Stripe an accurate description of the product and obtain approval.
3. Keep a backup provider evaluation — many PSPs restrict this category.
4. Do not enable Alipay/WeChat Pay without written category confirmation;
   mainland China is out of scope as a market (md §7.6). The Chinese-language
   audience is the diaspora, paying by card/Apple Pay/Google Pay in USD.
5. Enable **Stripe Tax** (`STRIPE_TAX_ENABLED=1`) before selling to the EU/UK —
   VAT applies from the first digital sale.
6. Set an ASCII statement descriptor (`STRIPE_STATEMENT_DESCRIPTOR_SUFFIX`).

## Known limitations

- **Interpretation quality/language:** without `DEEPSEEK_API_KEY`, all
  interpretations are labeled samples. With a key, readings use discipline-
  specific expert prompts (`lib/providers/prompts.ts`) plus knowledge grounding
  (`lib/providers/reference.ts`): the drawn cards' canonical Rider-Waite
  meanings, the public-domain 子平 framework (Ten Gods, five-element cycles,
  Day-Master strength), and standard astrology significations. The zod schema +
  safety layer gate every response. **Sourcing policy:** grounding draws only on
  public-domain classical sources (子平真诠, 滴天髓, 三命通会; RWS symbolism) and
  content we authored — never modern copyrighted books (infringement + liability).
  Prompt versions are recorded in the `PromptVersion` table for audit.
- **BaZi true solar time** is not applied in v1 (documented on the methodology
  page); births near hour/solar-term boundaries get explicit warnings instead.
- **City names are English/pinyin** in the picker (GeoNames base names);
  Chinese users search by pinyin (e.g. "foshan"), and country names are fully
  localized. Bundling zh city aliases is a possible follow-up (GeoNames
  alternateNames dataset). Villages below ~1,000 population use the manual
  coordinates + full-IANA-timezone fallback.
- **Historical timezones** come from the host's IANA database via `luxon`;
  extremely old or politically complex birth times may need manual review.
- **Traditional Chinese (zh-Hant)** not yet shipped — the i18n layer
  (`lib/i18n/messages.ts`) makes it additive.
- **Subscriptions without Stripe** use the dev-mock provider only; dunning is
  delegated to Stripe Billing in production.
- **Email deliverability** (SPF/DKIM) and a production SMTP provider are not
  configured here.
- **Tarot deck** uses the public-domain Rider-Waite-Smith imagery (1909; PD in
  US/UK), fetched from Wikimedia Commons and resized into `public/images/tarot/`
  by `node scripts/download-deck.mjs`. An original generative SVG remains as the
  fallback if an image is missing (`components/tarot/card-art.tsx`). Commission a
  bespoke deck later if you want a unique look.
- The Phase-2 human-advisor marketplace (md §8–§10: Connect onboarding,
  transfers, payouts, reversals) is **not built** — the order/ledger schema
  leaves room for it.

## Production checklist

- [ ] Entity jurisdiction decided; Stripe category approval **in writing**
- [ ] Legal review of terms/privacy/refunds/subscriptions (+ zh translations) — `[JURISDICTION]` placeholders replaced
- [ ] `AUTH_SECRET` rotated; SMTP configured; `/api/dev/magic-link` verified 404 in prod
- [ ] `DEEPSEEK_API_KEY` set; sample-mode banner verified gone; §5 prompt reviewed
- [ ] Stripe webhook configured + signature verified in logs; test purchase + refund round-trip
- [ ] Stripe Tax enabled and registrations added (EU/UK at minimum)
- [ ] Statement descriptor set; dispute evidence stored in English
- [ ] PostgreSQL migration applied; backups scheduled
- [ ] CSP + security headers deployed; rate limiting at the edge for /api
- [ ] Privacy policy reflects actual analytics (none shipped by default) and the DeepSeek PRC-processing disclosure
- [ ] Crisis-resource numbers localized per launch market
- [ ] 375px mobile pass + keyboard-only pass + screen-reader spot-check
- [ ] Age positioning (18+) present in footer/terms — verify per market requirements
- [ ] Brand set via `NEXT_PUBLIC_BRAND_NAME(_ZH)`; OG images added
- [ ] `npm test`, `npm run verify:engines`, `npm run test:e2e` all green in CI
