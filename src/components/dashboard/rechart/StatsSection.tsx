import { ApplicationWithEvents } from "@/components/dashboard/DashboardView";
type Props = {
  applications: ApplicationWithEvents[];
};
const StatsSection = ({ applications }: Props) => {
  const respondedCount = applications.filter(
    (app) =>
      app.currentStatus !== "APPLIED" && app.currentStatus !== "WISHLIST",
  ).length;

  const responseRate = Math.round((respondedCount / applications.length) * 100);

  const activeApplication = applications.filter(
    (app) =>
      app.currentStatus !== "ACCEPTED" &&
      app.currentStatus !== "REJECTED" &&
      app.currentStatus !== "GHOSTED",
  ).length;

  //1.For each application, find the appliedAt date
  // of the first status event that isn't applied
  // or wishlist
  //2. Calculate the difference in days between those two dates.

  const responseDifferences = applications
    .map((app) => {
      const firstResponse = app.statusEvents
        .filter(
          (event) => event.status !== "APPLIED" && event.status !== "WISHLIST",
        )
        .sort((a, b) => a.occurredAt.getTime() - b.occurredAt.getTime())[0];

      if (!firstResponse) return null;

      return (
        (firstResponse.occurredAt.getTime() - app.appliedAt.getTime()) /
        (1000 * 60 * 60 * 24)
      );
    })
    .filter((value): value is number => value !== null);

  const averageResponseDays =
    responseDifferences.length > 0
      ? responseDifferences.reduce((sum, days) => sum + days, 0) /
        responseDifferences.length
      : 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <div className="border flex-1 p-3 rounded-lg">
        <p className="text-sm">Total applications</p>
        <p className="font-bold text-2xl py-1">{applications.length}</p>
        <p className="text-sm text-gray-500">all time</p>
      </div>
      <div className="border flex-1 p-3 rounded-lg">
        <p className="text-sm">Response Rate</p>
        <p className="font-bold text-2xl py-1">{responseRate}%</p>
        <p className="text-sm text-gray-500">got a reply</p>
      </div>
      <div className="border flex-1 p-3 rounded-lg">
        <p className="text-sm ">Avg. time to reply</p>
        <p className="font-bold text-2xl py-1">
          {Math.round(averageResponseDays)}d
        </p>
        <p className="text-sm text-gray-500">from applied to</p>
      </div>
      <div className="border flex-1 p-3 rounded-lg">
        <p className="text-sm">Active </p>
        <p className="font-bold text-2xl py-1">{activeApplication}</p>
        <p className="text-sm text-gray-500">in progress</p>
      </div>
    </div>
  );
};

export default StatsSection;
