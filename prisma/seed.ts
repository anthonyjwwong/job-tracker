import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "awodev344@gmail.com" },
    update: {},
    create: {
      email: "awodev344@gmail.com",
      name: "Anthony Wong",
    },
  });

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@jobtracker.com" },
    update: {},
    create: {
      email: "demo@jobtracker.com",
      name: "Demo",
    },
  });

  await prisma.application.deleteMany({
    where: {
      userId: { in: [user.id, demoUser.id] },
    },
  });

  const demoApplications = [
    {
      company: "Stripe",
      role: "Frontend Engineer",
      url: "https://stripe.com/jobs",
      location: "New York, NY",
      workType: "HYBRID" as const,
      salaryMin: 120000,
      salaryMax: 150000,
      currentStatus: "INTERVIEW" as const,
    },
    {
      company: "Vercel",
      role: "Full Stack Developer",
      url: "https://vercel.com/careers",
      location: "Remote",
      workType: "REMOTE" as const,
      salaryMin: 130000,
      salaryMax: 160000,
      currentStatus: "APPLIED" as const,
    },
    {
      company: "linkedIn",
      role: "Web Developer",
      url: "",
      location: "Remote",
      workType: "REMOTE" as const,
      salaryMin: 130000,
      salaryMax: 160000,
      currentStatus: "OFFER" as const,
    },
    {
      company: "Linear",
      role: "Software Engineer",
      url: "https://linear.app/careers",
      location: "San Francisco, CA",
      workType: "ONSITE" as const,
      currentStatus: "SCREENING" as const,
    },
    {
      company: "Notion",
      role: "React Developer",
      url: "https://notion.so/careers",
      location: "Remote",
      workType: "REMOTE" as const,
      currentStatus: "WISHLIST" as const,
    },
    {
      company: "Figma",
      role: "Frontend Engineer",
      url: "https://figma.com/careers",
      location: "New York, NY",
      workType: "HYBRID" as const,
      currentStatus: "REJECTED" as const,
    },
    {
      company: "PlanetScale",
      role: "Developer Advocate",
      url: "https://planetscale.com/careers",
      location: "Remote",
      workType: "REMOTE" as const,
      currentStatus: "GHOSTED" as const,
    },
  ];

  const applications = [
    {
      company: "Stripe",
      role: "Frontend Engineer",
      url: "https://stripe.com/jobs",
      location: "New York, NY",
      workType: "HYBRID" as const,
      salaryMin: 120000,
      salaryMax: 150000,
      currentStatus: "INTERVIEW" as const,
    },
    {
      company: "Vercel",
      role: "Full Stack Developer",
      url: "https://vercel.com/careers",
      location: "Remote",
      workType: "REMOTE" as const,
      salaryMin: 130000,
      salaryMax: 160000,
      currentStatus: "APPLIED" as const,
    },
    {
      company: "Linear",
      role: "Software Engineer",
      url: "https://linear.app/careers",
      location: "San Francisco, CA",
      workType: "ONSITE" as const,
      currentStatus: "SCREENING" as const,
    },
    {
      company: "Notion",
      role: "React Developer",
      url: "https://notion.so/careers",
      location: "Remote",
      workType: "REMOTE" as const,
      currentStatus: "WISHLIST" as const,
    },
    {
      company: "Figma",
      role: "Frontend Engineer",
      url: "https://figma.com/careers",
      location: "New York, NY",
      workType: "HYBRID" as const,
      currentStatus: "REJECTED" as const,
    },
    {
      company: "PlanetScale",
      role: "Developer Advocate",
      url: "https://planetscale.com/careers",
      location: "Remote",
      workType: "REMOTE" as const,
      currentStatus: "GHOSTED" as const,
    },
  ];

  for (const app of applications) {
    const created = await prisma.application.create({
      data: {
        ...app,
        userId: user.id,
        statusEvents: {
          create: {
            status: app.currentStatus,
            note: "Initial status",
          },
        },
      },
    });
    console.log(`Created: ${created.company} — ${created.role}`);
  }
  for (const demoApp of demoApplications) {
    const created = await prisma.application.create({
      data: {
        ...demoApp,
        userId: demoUser.id,
        statusEvents: {
          create: {
            status: demoApp.currentStatus,
            note: "Initial status",
          },
        },
      },
    });
    console.log(`Created: ${created.company} — ${created.role}`);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
