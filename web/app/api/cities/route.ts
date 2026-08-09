import { NextRequest, NextResponse } from "next/server";
import { searchCities, countryOptions } from "@/lib/geo";

// Public city/country lookup for the birth-place picker.
// GET /api/cities                     → country list (localized names)
// GET /api/cities?country=CN&q=fo    → city matches, population-ranked
export async function GET(req: NextRequest) {
  const country = req.nextUrl.searchParams.get("country");
  if (!country) {
    const countries = await countryOptions();
    return NextResponse.json(
      { countries },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
  if (!/^[A-Za-z]{2}$/.test(country)) {
    return NextResponse.json({ error: "invalid_country" }, { status: 400 });
  }
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const cities = await searchCities({ country, q, limit: 20 });
  return NextResponse.json(
    { cities },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
