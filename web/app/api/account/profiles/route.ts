import { NextRequest, NextResponse } from "next/server";
import { cityById, cityLabel } from "@/lib/geo";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

// Private profile picker data. Birth details are returned only to the signed-in
// owner (email sessions and access-code accounts are both supported).
export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json(
      { error: "unauthenticated" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  const locale = req.nextUrl.searchParams.get("locale") === "zh" ? "zh" : "en";
  const rows = await prisma.birthProfile.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      label: true,
      dateISO: true,
      time: true,
      timeKnown: true,
      country: true,
      cityId: true,
      cityLabel: true,
      lat: true,
      lon: true,
      tz: true,
      sex: true,
      primaryInterest: true,
    },
  });

  const profiles = await Promise.all(
    rows.map(async (profile) => {
      const city = profile.cityId ? await cityById(profile.cityId) : null;
      return {
        ...profile,
        time: profile.time ?? undefined,
        country: profile.country ?? undefined,
        cityId: profile.cityId ?? undefined,
        cityLabel: (city ? cityLabel(city, locale) : profile.cityLabel) ?? undefined,
        sex:
          profile.sex === "male" || profile.sex === "female" ? profile.sex : undefined,
      };
    })
  );

  return NextResponse.json(
    { profiles },
    { headers: { "Cache-Control": "private, no-store, max-age=0" } }
  );
}
