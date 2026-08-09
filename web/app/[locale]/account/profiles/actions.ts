"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { audit } from "@/lib/audit";
import { cityById, cityLabel as geoCityLabel } from "@/lib/geo";
import { isLocale } from "@/lib/config";

// Birth data travels only in action payloads — never in URLs (spec §8).
const ProfileInput = z.object({
  locale: z.enum(["en", "zh"]),
  label: z.string().trim().min(1).max(60),
  dateISO: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
    .optional(),
  sex: z.enum(["male", "female"]).optional(),
  primaryInterest: z.enum(["tarot", "astrology", "bazi", "general"]),
  cityId: z.string().max(60).optional(),
  lat: z.number().min(-90).max(90).optional(),
  lon: z.number().min(-180).max(180).optional(),
  tz: z.string().min(1).max(60).optional(),
});

export type ProfileFormInput = z.infer<typeof ProfileInput>;

const Id = z.string().min(1).max(64);

type Parsed = z.infer<typeof ProfileInput>;

async function resolvePlace(d: Parsed) {
  if (d.cityId) {
    // Authoritative lookup against the GeoNames City table (world coverage).
    const city = await cityById(d.cityId);
    if (!city) return null;
    return {
      cityId: String(city.id),
      cityLabel: geoCityLabel(city, d.locale),
      country: city.country as string | null,
      tz: city.tz,
      lat: city.lat,
      lon: city.lon,
    };
  }
  if (d.lat != null && d.lon != null && d.tz) {
    return {
      cityId: null as string | null,
      cityLabel: null as string | null,
      country: null as string | null,
      tz: d.tz,
      lat: d.lat,
      lon: d.lon,
    };
  }
  return null;
}

export async function createProfile(input: ProfileFormInput): Promise<{ error: string } | void> {
  const user = await getSessionUser();
  if (!user) return { error: "unauthenticated" };
  const parsed = ProfileInput.safeParse(input);
  if (!parsed.success) return { error: "invalid_input" };
  const d = parsed.data;
  const place = await resolvePlace(d);
  if (!place) return { error: "invalid_place" };

  const profile = await prisma.birthProfile.create({
    data: {
      userId: user.id,
      label: d.label,
      dateISO: d.dateISO,
      time: d.time ?? null,
      timeKnown: !!d.time,
      sex: d.sex ?? null,
      primaryInterest: d.primaryInterest,
      ...place,
    },
  });
  // Audit detail carries no personal data (spec §16).
  await audit("profile_created", profile.id, "birth profile created", user.id);
  redirect(`/${d.locale}/account/profiles`);
}

export async function updateProfile(
  id: string,
  input: ProfileFormInput
): Promise<{ error: string } | void> {
  const user = await getSessionUser();
  if (!user) return { error: "unauthenticated" };
  const idParsed = Id.safeParse(id);
  const parsed = ProfileInput.safeParse(input);
  if (!idParsed.success || !parsed.success) return { error: "invalid_input" };
  const d = parsed.data;
  const place = await resolvePlace(d);
  if (!place) return { error: "invalid_place" };

  // Ownership enforced in the WHERE clause — never trust client ids (spec §18).
  const result = await prisma.birthProfile.updateMany({
    where: { id: idParsed.data, userId: user.id },
    data: {
      label: d.label,
      dateISO: d.dateISO,
      time: d.time ?? null,
      timeKnown: !!d.time,
      sex: d.sex ?? null,
      primaryInterest: d.primaryInterest,
      ...place,
    },
  });
  if (result.count === 0) return { error: "not_found" };
  await audit("profile_updated", idParsed.data, "birth profile updated", user.id);
  redirect(`/${d.locale}/account/profiles`);
}

export async function deleteProfile(
  id: string,
  locale: string
): Promise<{ error: string } | { ok: true }> {
  const user = await getSessionUser();
  if (!user) return { error: "unauthenticated" };
  const idParsed = Id.safeParse(id);
  if (!idParsed.success) return { error: "invalid_input" };

  const result = await prisma.birthProfile.deleteMany({
    where: { id: idParsed.data, userId: user.id },
  });
  if (result.count === 0) return { error: "not_found" };
  await audit("profile_deleted", idParsed.data, "birth profile deleted", user.id);
  revalidatePath(`/${isLocale(locale) ? locale : "en"}/account/profiles`);
  return { ok: true };
}
