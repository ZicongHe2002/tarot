# Deployment runbook — Render or Vercel + PostgreSQL

## Fastest path: Render Blueprint

The repository includes `render.yaml`, which creates a Next.js web service and
a PostgreSQL database in Render's Virginia region. The first service start runs
`prisma db push` and the idempotent seed, so the 78-card deck, articles,
products, prices, versions, and feature flags are ready automatically.

1. Push the project to a GitHub, GitLab, or Bitbucket repository. In this
   repository the application lives in the `web/` directory.
2. In Render, choose **New → Blueprint**, connect the repository, and enter
   `web/render.yaml` as the Blueprint Path. The Blueprint sets the service
   root directory to `web`, so its npm commands run beside `package.json`.
3. When Render asks for values, enter a real support email for
   `NEXT_PUBLIC_SUPPORT_EMAIL` and the governing-law location you have chosen
   for `NEXT_PUBLIC_LEGAL_JURISDICTION` (for example, `New York, United States`).
   These values appear in the legal pages, so do not use placeholders in a
   public launch.
4. Review the two resources and click **Apply**. The first deploy takes longer
   because Render installs dependencies, builds Next.js, creates the schema,
   and seeds the database.
5. Open the web service's `onrender.com` URL. `APP_BASE_URL` automatically falls
   back to Render's `RENDER_EXTERNAL_URL` for this initial domain.
6. To enable live AI interpretations, add `DEEPSEEK_API_KEY` in the web
   service's **Environment** page and redeploy. Without it, the site remains
   usable and clearly labels interpretations as samples.
7. To enable email sign-in, add `RESEND_API_KEY` and a verified-domain
   `EMAIL_FROM` in the same Environment page, then redeploy.
8. To give invited users unlimited interpretations, add a strong
   `UNLIMITED_ACCESS_CODE` (20+ random characters) and redeploy. Share the
   `/{locale}/access` page, not the Render environment screen. Rotating or
   deleting this variable immediately invalidates existing access grants.
9. When adding a custom domain, set `APP_BASE_URL=https://yourdomain.com` (no
   trailing slash) and redeploy. Use the same origin for OAuth callbacks and
   Stripe webhook/redirect configuration.

The Blueprint deliberately selects free resources for a no-cost preview. Be
aware of Render's current free-tier constraints:

- The free web service sleeps after 15 minutes without traffic, so its next
  request has a cold start.
- Free Render PostgreSQL expires after 30 days and has no backups. Upgrade the
  database before then, or replace `DATABASE_URL` with a persistent PostgreSQL
  provider such as Neon before collecting real user data.
- Email magic links use Resend's HTTPS API, avoiding the free service's blocked
  outbound SMTP ports. Set `RESEND_API_KEY` and a verified-domain `EMAIL_FROM`
  in the web service environment before enabling email sign-in.
- The large GeoNames city dataset is not committed or imported by the
  Blueprint. Tarot works immediately; import cities separately if you want the
  full astrology/BaZi place picker (see the production database steps below).

`/api/health` is the Render health-check endpoint. Render supplies `PORT`, and
Next.js `next start` reads it automatically while binding to `0.0.0.0`.

---

## Alternative path: Vercel + Neon

This project runs on **SQLite locally** (zero setup) and **PostgreSQL in
production**. One schema is the source of truth (`prisma/schema.prisma`); the
Postgres variant is generated at build time. This runbook takes a clean
checkout to a live, Google-indexable site.

Verified path: the full stack (schema push, seed, 170k-city import, live AI
reading through Prisma) has been tested end-to-end against real PostgreSQL.

---

## 0. Accounts you need (all have free tiers)

| Service | Purpose | Notes |
|---|---|---|
| A domain registrar | your web address | Cloudflare or Namecheap, ~$10–15/yr |
| [Vercel](https://vercel.com) | hosting | connects to your Git repo |
| [Neon](https://neon.tech) | PostgreSQL database | free tier is plenty to launch |
| [DeepSeek](https://platform.deepseek.com) | AI interpretation | prepaid; ~$0.003/reading |
| [Resend](https://resend.com) | sign-in emails | free tier; needs domain DNS records |
| Google Cloud (optional) | Google sign-in | OAuth credentials |
| Stripe | payments | **category approval required — see §6** |

You can launch **everything except live payments** before Stripe approval
(free readings, AI, accounts). Payments switch on later with no redeploy.

---

## 1. Put the code on GitHub

```bash
cd web
git add -A && git commit -m "Deployment prep"
# create an empty repo on GitHub, then:
git remote add origin https://github.com/<you>/<repo>.git
git branch -M main && git push -u origin main
```

`.env`, `dev.db`, and `data/geo/` are git-ignored and never leave your machine.

## 2. Create the production database (Neon)

1. New project on Neon → copy the connection string
   (`postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`).
2. Keep it for step 4 as `DATABASE_URL`.

## 3. Import world cities into the production DB (one time)

Cities aren't in Git (30 MB). From your machine, pointed at Neon:

```bash
# download the dataset (see README quick-start), then:
npm run db:gen:prod                                   # writes prisma/schema.prod.prisma
DATABASE_URL="<neon-url>" npx prisma db push --schema prisma/schema.prod.prisma
DATABASE_URL="<neon-url>" npx tsx prisma/seed.ts       # 78 cards, products, prices, articles
DATABASE_URL="<neon-url>" npx tsx scripts/import-cities.ts   # ~170k cities (a few minutes)
```

## 4. Deploy on Vercel

1. Import the GitHub repo in Vercel (root directory = `web`).
2. **Build command:** `npm run db:gen:prod && npx prisma generate --schema prisma/schema.prod.prisma && next build`
3. Add environment variables (Project → Settings → Environment Variables):

   | Key | Value |
   |---|---|
   | `DATABASE_URL` | your Neon connection string |
   | `APP_BASE_URL` | `https://yourdomain.com` |
   | `AUTH_SECRET` | `openssl rand -base64 32` |
   | `AUTH_TRUST_HOST` | `true` |
   | `DEEPSEEK_API_KEY` | your DeepSeek key |
   | `DEEPSEEK_MODEL` | `deepseek-v4-pro` |
   | `RESEND_API_KEY` | Resend API key |
   | `EMAIL_FROM` | `no-reply@yourdomain.com` |
   | `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | optional |
   | `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | add after §6 |
   | `STRIPE_TAX_ENABLED` | `1` once Stripe Tax is set up |

   Do **not** set `DEV_FAKE_PAYMENTS` in production — it is code-gated off there
   regardless, but leave it unset.
4. Deploy. Vercel builds, generates the Postgres client, and serves the app.

## 5. Connect the domain & Google indexing

1. Vercel → Domains → add your domain, follow the DNS instructions.
2. Set `APP_BASE_URL` to the final `https://` origin and redeploy.
3. [Google Search Console](https://search.google.com/search-console): add the
   domain, verify (DNS TXT), submit `https://yourdomain.com/sitemap.xml`.
   The sitemap is generated automatically from content. Indexing takes days–weeks.

## 6. Payments (Stripe) — do this in parallel, it gates on approval

1. Register a business entity first (Stripe cannot onboard an individual for
   this category in most places, and **cannot onboard mainland-China entities
   at all** — a HK/SG/US entity is typical). See README "Payment-provider risk".
2. Create the Stripe account, describe the product **accurately** (AI-assisted
   tarot/astrology/BaZi reflection content), and request approval — psychic /
   fortune-telling is restricted (prohibited in JP/MX/TH).
3. After approval: add `STRIPE_SECRET_KEY`, create the webhook endpoint
   `https://yourdomain.com/api/stripe/webhook`, subscribe to the events in
   README §14, put its signing secret in `STRIPE_WEBHOOK_SECRET`, enable
   Stripe Tax, set a statement descriptor. Redeploy.

## 7. Before you announce it

Run the README "Production checklist". Minimum: legal review of the policy
pages (replace `[JURISDICTION]`), confirm sample-mode banners are gone, test a
real purchase + refund round-trip, and do a mobile + keyboard pass.

---

## Schema changes after launch

Edit `prisma/schema.prisma`, then apply to production:

```bash
npm run db:gen:prod
DATABASE_URL="<neon-url>" npx prisma db push --schema prisma/schema.prod.prisma
```

`db push` is schema-driven (no migration files). For zero-downtime destructive
changes on a live DB with real data, adopt Prisma Migrate on a committed
Postgres provider later — not needed for launch.
