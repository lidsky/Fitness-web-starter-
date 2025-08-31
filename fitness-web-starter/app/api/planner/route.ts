
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getUid(cookieHeader?: string | null) {
  const m = cookieHeader?.match(/uid=([^;]+)/);
  return m?.[1] || null;
}

export async function GET(req: NextRequest) {
  const uid = getUid(req.headers.get("cookie"));
  if (!uid) return NextResponse.json({ items: [] });
  const items = await prisma.plannerItem.findMany({ where: { userId: uid }, orderBy: { startAt: "asc" } });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const uid = getUid(req.headers.get("cookie"));
  if (!uid) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const { title, type, startAt, endAt } = await req.json();
  const it = await prisma.plannerItem.create({ data: { userId: uid, title, type, startAt: new Date(startAt), endAt: new Date(endAt), color: type==="meal" ? "orange" : type==="workout" ? "blue" : "green" } });
  return NextResponse.json({ item: it });
}
