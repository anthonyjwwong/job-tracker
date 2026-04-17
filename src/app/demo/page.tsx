import DashboardView from "@/components/dashboard/DashboardView";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DemoPage() {
  const DEMO_USER_ID = "cmo1fwhz10000skutrglbeb4d";

  const applications = await prisma.application.findMany({
    where: {
      userId: DEMO_USER_ID,
    },
    orderBy: {
      appliedAt: "desc",
    },
    include: { statusEvents: true },
  });
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <Button asChild>
        <Link href="/">
          <ArrowLeft /> Back to Home
        </Link>
      </Button>

      <h1 className="text-xl mt-4 font-semibold">Welcome, Demo User</h1>
      <p className="text-gray-500 text-sm mt-1 mb-4">Demo</p>

      <DashboardView applications={applications} isDemo={true} />
    </div>
  );
}
