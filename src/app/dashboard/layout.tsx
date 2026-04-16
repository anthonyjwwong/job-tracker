import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const name = session?.user?.name;
  const parts = name?.trim().split(" ").filter(Boolean) || [];
  const initials =
    parts.length === 1 ? parts[0][0] : parts[0][0] + parts[parts.length - 1][0];

  const formatted = initials.toUpperCase();

  return (
    <div>
      <nav className="border-b bg-white">
        <div className="max-w-5xl mx-auto flex justify-between px-3  items-center h-14">
          <h1 className="mt-1 font-semibold text-sm cursor-pointer">
            Job Tracker
          </h1>
          <p className="mt-1 text-sm text-gray-500 cursor-pointer">Dashboard</p>
          <div className="cursor-pointer w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-700">
            {formatted}
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
