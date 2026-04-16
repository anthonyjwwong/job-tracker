import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatSalary } from "@/lib/formatters";
import ApplicationTabs from "@/components/dashboard/ApplicationTabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/ui/StatusBadge";
import ApplicationDeleteBtn from "@/components/dashboard/ApplicationDeleteBtn";
import ApplicationEditBtn from "@/components/dashboard/ApplicationEditBtn";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const app = await prisma.application.findUnique({
    where: { id },
    include: {
      statusEvents: { orderBy: { occurredAt: "desc" } },
      notes: { orderBy: { createdAt: "desc" } },
      contacts: true,
    },
  });

  if (!app) notFound();
  console.log("APP: ", app);
  // console.log("Status Event", app?.salaryMax);
  // console.log("Note", app?.notes);
  // console.log("Contact", app?.contacts);
  return (
    <div>
      <Button asChild>
        <Link href="/dashboard">
          <ArrowLeft /> All applications
        </Link>
      </Button>

      <div className="mt-10 flex md:justify-between">
        {/* Left side of Application Page */}
        <div className="grid p-4">
          <div>
            <h1 className="text-3xl">{app?.company}</h1>
          </div>

          <div className="md:flex gap-2">
            <p className="text-sm mt-1">{app?.role} </p>
            <span className="hidden md:inline">.</span>
            <p className="text-sm mt-1">{app?.location}</p>
            <span className="hidden md:inline">.</span>
            <p className="text-sm mt-1">{app?.workType} </p>
            <span className="hidden md:inline">.</span>
            <p className="text-sm mt-1">
              {!app?.salaryMin && !app?.salaryMax
                ? "Not Available"
                : `${formatSalary(app?.salaryMin)} - ${formatSalary(app?.salaryMax)}`}
            </p>
          </div>
        </div>
        {/* Right side of Application Page */}
        <div className="flex flex-col p-4 md:flex-row md:mt-4 gap-2">
          <ApplicationEditBtn app={app} />
          <ApplicationDeleteBtn appId={app.id} />
        </div>
      </div>

      <div className="flex flex-col px-2 justify-between md:flex-row">
        {/* Left Column - Dynamic Timeline*/}
        <div className="mt-10">
          <ApplicationTabs app={app} />
        </div>
        {/* Right Column - Static Detail Card*/}
        <div className="mt-10">
          <Card className="p-10">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Status</span>
                  <StatusBadge status={app.currentStatus} />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">
                    Work type
                  </span>
                  <span className="text-sm">{app.workType ?? "—"}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Applied</span>
                  <span className="text-sm">
                    {app.appliedAt.toDateString()}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Salary</span>
                  <span className="text-sm">
                    {app.salaryMin && app.salaryMax
                      ? `$${app.salaryMin.toLocaleString()} – $${app.salaryMax.toLocaleString()}`
                      : "—"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-10">
                <span className="text-xs text-muted-foreground">Job URL</span>
                {app.url ? (
                  <a
                    href={app.url}
                    target="_blank"
                    className="text-sm text-blue-600 hover:underline truncate"
                  >
                    {app.url}
                  </a>
                ) : (
                  <span className="text-sm">—</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Page;
