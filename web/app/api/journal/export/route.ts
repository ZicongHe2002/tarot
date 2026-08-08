import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { audit } from "@/lib/audit";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  const entries = await prisma.journalEntry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
  await audit("journal_exported", user.id, `${entries.length} entries`, user.id);
  return new NextResponse(
    JSON.stringify(
      entries.map((e) => ({
        kind: e.kind,
        title: e.title,
        notes: e.notes,
        mood: e.mood,
        tags: JSON.parse(e.tagsJson),
        favorite: e.favorite,
        createdAt: e.createdAt,
      })),
      null,
      2
    ),
    {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": 'attachment; filename="journal-export.json"',
        "Cache-Control": "no-store",
      },
    }
  );
}
