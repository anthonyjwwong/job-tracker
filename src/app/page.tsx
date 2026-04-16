import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, ChartBar, Clock5, SquareKanban } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <div className="max-w-5xl mx-auto flex px-4 py-4 justify-between">
          <h1 className="font-bold md:text-xl md:mt-2">JobTrackr</h1>
          <div className="flex gap-2">
            <Button
              asChild
              size="xs"
              variant="outline"
              className="md:text-sm md:px-4 md:py-4 rounded-sm"
            >
              <a
                href="https://github.com/anthonyjwwong"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github <ArrowRight />
              </a>
            </Button>
            <Button
              asChild
              size="xs"
              className="md:text-sm md:px-4 md:py-4 rounded-sm"
            >
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </header>
      <Separator />
      <div>
        <div className="py-16 px-12 text-center md:py-24">
          <div className="border w-fit m-auto px-2 py-1 rounded-2xl">
            <p className="text-sm md:text-lg">Open Source Portfolio project</p>
          </div>
          <div className=" mt-10 md:mt-12">
            <p className="text-3xl md:text-4xl font-bold">
              Track every application.
            </p>
            <p className="text-3xl md:text-4xl font-bold md:mt-2">
              Land your next role.
            </p>
          </div>
          <div className="mt-6 md:mt-10">
            <p className="md:text-xl md:px-10">
              A clean, fast job application tracker with kanban board,
              analytics, and contact management.
            </p>
          </div>
          <div className="mt-6 md:mt-10">
            <Button
              asChild
              variant="outline"
              className="rounded-sm mr-1 font-bold md:text-lg md:px-10 py-6"
            >
              <Link href="/demo">Try Demo</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-sm font-bold md:text-lg md:px-10 py-6"
            >
              <Link href="/login">Sign in with Google</Link>
            </Button>
          </div>
        </div>
      </div>
      <Separator />
      <div className="py-12 max-w-5xl mx-auto md:py-16">
        <h2 className="text-center text-sm font-bold text-gray-500">
          FEATURES
        </h2>
        <div className="md:flex mx-2 gap-1">
          <div className="shadow-sm rounded-lg border mx-14 my-8 p-10 md:mx-6 md:px-4 ">
            <h3 className="text-center font-bold mb-2">Kanban Board</h3>
            <SquareKanban className="mx-auto md:mt-4 " color="#6699CC" />
            <p className="text-center md:pt-4">
              Drag and drop applications across status columns with optimistic
              UI updates.
            </p>
          </div>
          <div className=" shadow-sm rounded-lg border mx-14  my-8 p-10 md:mx-4 md:px-4">
            <h3 className="text-center font-bold mb-2">Application Tracking</h3>
            <ChartBar className="mx-auto md:mt-4" color="#74c365" />
            <p className="text-center md:pt-4">
              Log every job with status history, contacts, notes, and salary
              details
            </p>
          </div>
          <div className=" shadow-sm rounded-lg border mx-14  my-8 p-10 md:mx-4 md:px-4">
            <h3 className="text-center font-bold mb-2">Stats & Analytics</h3>
            <Clock5 className="mx-auto md:mt-4" color="#AF69EE" />
            <p className="text-center md:pt-4">
              Response rates, average reply time, and a break down of
              application by status
            </p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="max-w-5xl mx-auto py-10 md:py-16">
        <h2 className="text-center text-sm font-bold text-gray-500">
          BUILT WITH
        </h2>
        <div className="md:mb-10 grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-10 text-center mt-10 md:mt-14 text-sm md:text-lg">
          <p className="border rounded-2xl py-1 px-2 ">Next.js 15</p>
          <p className="border rounded-2xl py-1 px-2 ">TypeScript</p>
          <p className="border rounded-2xl py-1 px-2">Prisma</p>
          <p className="border rounded-2xl py-1 px-2 ">NextAuth v5</p>
          <p className="border rounded-2xl py-1 px-2">shadcn/ui</p>
          <p className="border rounded-2xl py-1 px-2 ">PostgreSQL</p>
          <p className="border rounded-2xl py-1 px-2 ">Tailwind CSS</p>
          <p className="border rounded-2xl py-1 px-2">Recharts</p>
        </div>
      </div>
      <Separator />
      <footer>
        <div className="max-w-5xl mx-auto py-6 flex justify-between px-6 md:py-8">
          <p className="mt-2 text-gray-400">Built By Anthony W.</p>
          <Button asChild className="rounded-sm">
            <a
              href="https://github.com/anthonyjwwong"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github <ArrowRight />
            </a>
          </Button>
        </div>
      </footer>
    </>
  );
}
