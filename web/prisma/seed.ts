import { PrismaClient } from "@prisma/client";
import { TAROT_MAJORS } from "../content/tarot-majors";
import { TAROT_MINORS } from "../content/tarot-minors";
import { ARTICLES } from "../content/articles";

const prisma = new PrismaClient();

async function main() {
  // ---------- Tarot cards ----------
  const cards = [...TAROT_MAJORS, ...TAROT_MINORS];
  if (cards.length !== 78) throw new Error(`expected 78 cards, got ${cards.length}`);
  for (const c of cards) {
    await prisma.tarotCard.upsert({
      where: { id: c.id },
      create: {
        id: c.id,
        slug: c.slug,
        arcana: c.arcana,
        suit: c.suit,
        number: c.number,
        contentJson: JSON.stringify(c),
      },
      update: { slug: c.slug, contentJson: JSON.stringify(c) },
    });
  }

  // ---------- Articles ----------
  for (const a of ARTICLES) {
    await prisma.contentArticle.upsert({
      where: { slug: a.slug },
      create: { slug: a.slug, contentJson: JSON.stringify(a), published: true },
      update: { contentJson: JSON.stringify(a) },
    });
  }

  // ---------- Products & prices (configurable DB values, spec §15) ----------
  async function product(
    slug: string,
    kind: "subscription" | "one_time",
    name: { en: string; zh: string },
    description: { en: string; zh: string },
    prices: Array<{ cents: number; interval: "month" | "year" | null }>
  ) {
    const p = await prisma.product.upsert({
      where: { slug },
      create: {
        slug,
        kind,
        nameJson: JSON.stringify(name),
        descriptionJson: JSON.stringify(description),
        active: true,
      },
      update: { nameJson: JSON.stringify(name), descriptionJson: JSON.stringify(description) },
    });
    for (const pr of prices) {
      const existing = await prisma.price.findFirst({
        where: { productId: p.id, interval: pr.interval, currency: "usd" },
      });
      if (existing) {
        await prisma.price.update({ where: { id: existing.id }, data: { unitAmountCents: pr.cents } });
      } else {
        await prisma.price.create({
          data: { productId: p.id, currency: "usd", unitAmountCents: pr.cents, interval: pr.interval },
        });
      }
    }
    return p;
  }

  await product(
    "premium",
    "subscription",
    { en: "Premium", zh: "高级会员" },
    {
      en: "Unlimited interpretations, daily guidance, journal insights, and member pricing on reports.",
      zh: "不限次解读、每日指引、手记洞察，以及深度报告会员价。",
    },
    [
      { cents: 899, interval: "month" },
      { cents: 5999, interval: "year" },
    ]
  );
  // One-time reports respect the md §7.9 price floor ($9.99+).
  await product(
    "tarot-deep-reading",
    "one_time",
    { en: "Full Tarot Reading (Celtic Cross)", zh: "完整塔罗牌阵解读（凯尔特十字）" },
    {
      en: "A ten-card Celtic Cross drawn securely and interpreted in depth.",
      zh: "凯尔特十字十张牌阵，安全抽取，深度解读。",
    },
    [{ cents: 1299, interval: null }]
  );
  await product(
    "natal-report",
    "one_time",
    { en: "Natal Chart Deep Report", zh: "本命星盘深度报告" },
    {
      en: "Your full birth chart calculated astronomically and interpreted section by section.",
      zh: "以天文精度计算你的出生星盘，逐部分完整解读。",
    },
    [{ cents: 1899, interval: null }]
  );
  await product(
    "bazi-report",
    "one_time",
    { en: "BaZi Four Pillars Deep Report", zh: "八字四柱深度报告" },
    {
      en: "Four Pillars, Day Master, element balance, and luck cycles, interpreted in depth.",
      zh: "四柱、日主、五行强弱与大运流转的深度解读。",
    },
    [{ cents: 1899, interval: null }]
  );
  await product(
    "compatibility-report",
    "one_time",
    { en: "Compatibility Deep Report", zh: "合盘深度报告" },
    {
      en: "Two charts compared across communication, values, and rhythm — astrology and BaZi combined.",
      zh: "占星与八字双视角，比对两人在沟通、价值观与节奏上的相处模式。",
    },
    [{ cents: 2899, interval: null }]
  );

  // ---------- Versions ----------
  const versions: Array<[string, string, object]> = [
    ["astrology", "tropical-wholesign-1.0.0", { engine: "astronomy-engine 2.1.19", zodiac: "tropical", houses: "whole_sign", frame: "true ecliptic of date" }],
    ["bazi", "local-clock-jie-boundary-1.0.0", { engine: "lunar-javascript 1.7.7", monthBoundary: "solar terms (节)", hourPolicy: "local clock, Zi-hour per engine", luckDirection: "sex + year-stem polarity", boundaryPolicy: "warn within 24h of 节" }],
    ["tarot", "crypto-fisher-yates-1.0.0", { rng: "crypto.randomInt Fisher–Yates", orientation: "independent 50%" }],
  ];
  for (const [engine, version, methodology] of versions) {
    await prisma.calculationVersion.upsert({
      where: { engine_version: { engine, version } },
      create: { engine, version, methodologyJson: JSON.stringify(methodology), active: true },
      update: { active: true },
    });
  }
  // Historical prompt version (kept for audit), then the active v3.
  await prisma.promptVersion.upsert({
    where: { key_version: { key: "interpretation_system", version: "2026-07-16.v2" } },
    create: { key: "interpretation_system", version: "2026-07-16.v2", body: "generic single prompt (superseded)", active: false },
    update: { active: false },
  });
  await prisma.promptVersion.upsert({
    where: { key_version: { key: "interpretation_system", version: "2026-07-18.v3" } },
    create: {
      key: "interpretation_system",
      version: "2026-07-18.v3",
      body: "discipline-specific prompts (lib/providers/prompts.ts) + knowledge grounding (lib/providers/reference.ts): RWS card meanings, 子平 Ten-God/five-element framework, astrology significations",
      active: true,
    },
    update: { active: true },
  });

  // ---------- Feature flags ----------
  for (const [key, enabled, note] of [
    ["subscriptions", true, "Show premium plans and gates"],
    ["compatibility", true, "Compatibility tools"],
    ["human_advisors", false, "Phase 2 marketplace (md §8) — not built yet"],
  ] as const) {
    await prisma.featureFlag.upsert({
      where: { key },
      create: { key, enabled, note },
      update: {},
    });
  }

  // ---------- Dev accounts (never seeded in production) ----------
  if (process.env.NODE_ENV !== "production" && process.env.RENDER !== "true") {
    await prisma.user.upsert({
      where: { email: "admin@localhost.dev" },
      create: { email: "admin@localhost.dev", name: "Dev Admin", role: "admin", emailVerified: new Date() },
      update: { role: "admin" },
    });

    // A ready-to-use member account with a birth profile + a couple of journal
    // entries, so the full signed-in experience is explorable via /api/dev/login.
    const test = await prisma.user.upsert({
      where: { email: "test@luminary.dev" },
      create: { email: "test@luminary.dev", name: "Test Member", role: "user", emailVerified: new Date(), locale: "en" },
      update: {},
    });
    const existingProfile = await prisma.birthProfile.findFirst({ where: { userId: test.id } });
    if (!existingProfile) {
      await prisma.birthProfile.create({
        data: {
          userId: test.id,
          label: "Me",
          dateISO: "1992-08-08",
          time: "14:30",
          timeKnown: true,
          cityId: "1816670", // Beijing (GeoNames)
          cityLabel: "Beijing, Beijing, CN",
          tz: "Asia/Shanghai",
          lat: 39.9075,
          lon: 116.39723,
          sex: "male",
          primaryInterest: "astrology",
        },
      });
      await prisma.journalEntry.createMany({
        data: [
          { userId: test.id, kind: "note", title: "First reflection", notes: "Trying the platform — curious how the three traditions line up.", mood: "curious", tagsJson: JSON.stringify(["start"]) },
          { userId: test.id, kind: "note", title: "The Hermit keeps showing up", notes: "Third time this month. Maybe a nudge toward some quiet.", mood: "calm", tagsJson: JSON.stringify(["tarot", "pattern"]), favorite: true },
        ],
      });
    }
  }

  console.log("Seed complete:", {
    cards: await prisma.tarotCard.count(),
    articles: await prisma.contentArticle.count(),
    products: await prisma.product.count(),
    prices: await prisma.price.count(),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
