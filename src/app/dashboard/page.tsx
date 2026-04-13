import { auth } from "@/auth";
import { signOut } from "@/auth";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatusFilters from "@/components/dashboard/StatusFilters";
import ApplicationsTable from "@/components/dashboard/ApplicationsTable";

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
  });

  console.log("session:", session);
  console.log("applications:", applications);
  console.log("applications:", applications[0].appliedAt.toDateString());

  return (
    <div className="p-8">
      <DashboardHeader />
      <StatusFilters />
      <ApplicationsTable applications={applications} />

      <h1 className="text-xl font-semibold">Welcome, {session?.user?.name}</h1>
      <p className="text-gray-500 text-sm mt-1">{session?.user?.email}</p>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
        className="mt-4"
      >
        <button type="submit" className="text-sm text-red-500 hover:underline">
          Sign out
        </button>
      </form>
    </div>
  );
}
