import { auth } from "@/auth";
import { signOut } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="p-8">
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
