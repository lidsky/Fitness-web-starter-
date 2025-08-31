
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const email = "demo@example.com";
  const passwordHash = await bcrypt.hash("demo1234", 10);
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash }
  });
  console.log("Seeded demo user:", email, "password: demo1234");
}
main().finally(()=>prisma.$disconnect());
