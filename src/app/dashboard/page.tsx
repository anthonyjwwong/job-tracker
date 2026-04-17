import { auth } from "@/auth";
import { signOut } from "@/auth";

import DashboardView from "@/components/dashboard/DashboardView";

import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();

  const applications = await prisma.application.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      appliedAt: "desc",
    },
    include: { statusEvents: true },
  });

  return (
    <div className="md:p-8">
      <DashboardView applications={applications} />
    </div>
  );
}
