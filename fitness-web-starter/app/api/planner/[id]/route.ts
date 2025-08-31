
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getUid(cookieHeader?: string | null) {
  const m = cookieHeader?.match(/uid=([^;]+)/);
  return m?.[1] || null;
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const uid = getUid(req.headers.get("cookie"));
  if (!uid) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  await prisma.plannerItem.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
