// Imports the GeoNames cities1000 dataset (CC-BY 4.0) into the City table.
// Usage: npm run db:cities  (expects files in data/geo/, see README)
import fs from "fs";
import path from "path";
import readline from "readline";
import { spawnSync } from "child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const GEO_DIR = path.join(process.cwd(), "data", "geo");

async function loadAdmin1(): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  const file = path.join(GEO_DIR, "admin1CodesASCII.txt");
  if (!fs.existsSync(file)) return map;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const [code, name] = line.split("\t");
    if (code && name) map.set(code, name);
  }
  return map;
}

async function main() {
  const citiesFile = path.join(GEO_DIR, "cities1000.txt");
  const citiesZip = path.join(GEO_DIR, "cities1000.zip");
  const existing = await prisma.city.count();

  // A normal Render restart should not re-import 170k rows. If an earlier
  // import was interrupted, clear the partial table and rebuild it below.
  if (existing >= 150_000) {
    console.log(`City table already has ${existing} rows — import skipped.`);
    return;
  }

  if (!fs.existsSync(citiesFile) && fs.existsSync(citiesZip)) {
    console.log("Extracting bundled GeoNames city data…");
    const result = spawnSync("unzip", ["-o", citiesZip, "-d", GEO_DIR], {
      stdio: "inherit",
    });
    if (result.status !== 0) {
      throw new Error(`Could not extract ${citiesZip}`);
    }
  }

  if (!fs.existsSync(citiesFile)) {
    throw new Error(
      "Missing data/geo/cities1000.txt and cities1000.zip — restore the bundled GeoNames archive"
    );
  }
  const admin1 = await loadAdmin1();
  if (existing > 0) {
    console.log(`City table has only ${existing} rows — clearing interrupted import.`);
    await prisma.city.deleteMany();
  }

  const rl = readline.createInterface({
    input: fs.createReadStream(citiesFile),
    crlfDelay: Infinity,
  });

  type Row = {
    id: number; name: string; ascii: string; country: string;
    admin1: string; lat: number; lon: number; tz: string; population: number;
  };
  let batch: Row[] = [];
  let total = 0;

  async function flush() {
    if (batch.length === 0) return;
    await prisma.city.createMany({ data: batch });
    total += batch.length;
    batch = [];
    if (total % 20000 < 5000) console.log(`  imported ${total}…`);
  }

  for await (const line of rl) {
    const f = line.split("\t");
    if (f.length < 18) continue;
    const id = Number(f[0]);
    const name = f[1];
    const ascii = f[2] || f[1];
    const lat = Number(f[4]);
    const lon = Number(f[5]);
    const country = f[8];
    const admin1Code = f[10];
    const population = Number(f[14]) || 0;
    const tz = f[17];
    if (!id || !name || !country || !tz || Number.isNaN(lat) || Number.isNaN(lon)) continue;
    batch.push({
      id,
      name,
      ascii: ascii.toLowerCase(),
      country,
      admin1: admin1.get(`${country}.${admin1Code}`) ?? "",
      lat,
      lon,
      tz,
      population,
    });
    if (batch.length >= 5000) await flush();
  }
  await flush();
  console.log(`Done: ${total} cities imported.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
