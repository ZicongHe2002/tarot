// Downloads the public-domain Rider-Waite-Smith deck (1909, PD in US/UK) from
// Wikimedia Commons and resizes each card to a web-friendly JPG in
// public/images/tarot/<slug>.jpg. Run once: `node scripts/download-deck.mjs`.
import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "public", "images", "tarot");
fs.mkdirSync(OUT, { recursive: true });

const FILEPATH = (name) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}`;

// Major arcana: slug → exact Wikimedia filename (Waite numbering: Strength 8).
const MAJORS = [
  ["the-fool", "RWS_Tarot_00_Fool.jpg"],
  ["the-magician", "RWS_Tarot_01_Magician.jpg"],
  ["the-high-priestess", "RWS_Tarot_02_High_Priestess.jpg"],
  ["the-empress", "RWS_Tarot_03_Empress.jpg"],
  ["the-emperor", "RWS_Tarot_04_Emperor.jpg"],
  ["the-hierophant", "RWS_Tarot_05_Hierophant.jpg"],
  ["the-lovers", "RWS_Tarot_06_Lovers.jpg"],
  ["the-chariot", "RWS_Tarot_07_Chariot.jpg"],
  ["strength", "RWS_Tarot_08_Strength.jpg"],
  ["the-hermit", "RWS_Tarot_09_Hermit.jpg"],
  ["wheel-of-fortune", "RWS_Tarot_10_Wheel_of_Fortune.jpg"],
  ["justice", "RWS_Tarot_11_Justice.jpg"],
  ["the-hanged-man", "RWS_Tarot_12_Hanged_Man.jpg"],
  ["death", "RWS_Tarot_13_Death.jpg"],
  ["temperance", "RWS_Tarot_14_Temperance.jpg"],
  ["the-devil", "RWS_Tarot_15_Devil.jpg"],
  ["the-tower", "RWS_Tarot_16_Tower.jpg"],
  ["the-star", "RWS_Tarot_17_Star.jpg"],
  ["the-moon", "RWS_Tarot_18_Moon.jpg"],
  ["the-sun", "RWS_Tarot_19_Sun.jpg"],
  ["judgement", "RWS_Tarot_20_Judgement.jpg"],
  ["the-world", "RWS_Tarot_21_World.jpg"],
];

const SUIT_PREFIX = { wands: "Wands", cups: "Cups", swords: "Swords", pentacles: "Pents" };
const RANKS = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "page", "knight", "queen", "king"];

function minorTargets() {
  const out = [];
  for (const [suit, prefix] of Object.entries(SUIT_PREFIX)) {
    RANKS.forEach((rank, i) => {
      const num = String(i + 1).padStart(2, "0");
      out.push([`${rank}-of-${suit}`, `${prefix}${num}.jpg`]);
    });
  }
  return out;
}

const ALL = [...MAJORS, ...minorTargets()];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { headers: { "User-Agent": "luminary-deck/1.0 (self-hosted contact: dev)" } });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    if (res.status === 429 || res.status >= 500) {
      await sleep(2000 * (i + 1)); // back off on rate limit
      continue;
    }
    throw new Error(`HTTP ${res.status}`);
  }
  throw new Error("HTTP 429 (exhausted retries)");
}

async function run() {
  let ok = 0;
  const failed = [];
  for (const [slug, file] of ALL) {
    const dest = path.join(OUT, `${slug}.jpg`);
    // Skip files already fetched — lets a re-run finish the rate-limited tail.
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      ok++;
      continue;
    }
    try {
      const buf = await fetchWithRetry(FILEPATH(file));
      await sharp(buf)
        .resize({ width: 500, withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(dest);
      ok++;
      process.stdout.write(`  ${slug} ✓\r`);
      await sleep(400); // be polite to Wikimedia
    } catch (e) {
      failed.push([slug, file, String(e)]);
    }
  }
  console.log(`\nDownloaded ${ok}/${ALL.length} cards to public/images/tarot/`);
  if (failed.length) {
    console.log("FAILED:");
    for (const [slug, file, err] of failed) console.log(`  ${slug} (${file}): ${err}`);
    process.exit(1);
  }
}

run();
