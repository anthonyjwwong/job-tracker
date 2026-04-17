import { auth } from "@/auth";
import { signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const name = session?.user?.name;
  const parts = name?.trim().split(" ").filter(Boolean) || [];
  const initials =
    parts.length === 0
      ? "?"
      : parts.length === 1
        ? parts[0][0]
        : parts[0][0] + parts[parts.length - 1][0];

  const formatted = initials.toUpperCase();

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="border-b bg-white">
        <div className="max-w-5xl mx-auto flex justify-between px-3  items-center h-14">
          <h1 className="mt-1 font-semibold text-sm cursor-pointer">
            Job Tracker
          </h1>
          <p className="mt-1 text-sm text-gray-500 cursor-pointer">Dashboard</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-700">
                {formatted}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>{name}</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <form
                    action={async () => {
                      "use server";
                      await signOut({ redirectTo: "/login" });
                    }}
                    className="w-full"
                  >
                    <button
                      type="submit"
                      className="w-full text-sm text-red-500 hover:underline"
                    >
                      Sign out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
        {children}
      </main>
      <Separator />
      <footer>
        <div className="py-4 px-4 flex max-w-4xl mx-auto justify-between">
          <p className="text-[12px] text-gray-400">©2025 JobTracker</p>
          <p className="text-[12px] text-gray-400">Built by A.W - GitHub</p>
        </div>
      </footer>
    </div>
  );
}
