
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getUid(cookieHeader?: string | null) {
  const m = cookieHeader?.match(/uid=([^;]+)/);
  return m?.[1] || null;
}

export async function POST(req: NextRequest) {
  const uid = getUid(req.headers.get("cookie"));
  if (!uid) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const body = await req.json();
  await prisma.profile.upsert({
    where: { userId: uid },
    create: { userId: uid, heightCm: body.cm, weightKg: body.kg, age: body.age, sex: body.sex, activity: body.activity, goal: body.goal, tdeeKcal: body.kcal, macros: body },
    update: { heightCm: body.cm, weightKg: body.kg, age: body.age, sex: body.sex, activity: body.activity, goal: body.goal, tdeeKcal: body.kcal, macros: body }
  });
  return NextResponse.json({ ok: true });
}
