import Link from "next/link";
import { CheckSquare } from "lucide-react";
import { ModeToggle } from "@/components/theme/mode-toggle";

export function ContentNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">LionProyectsFlow</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/#features"
            className="text-sm font-medium hover:text-rose-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#benefits"
            className="text-sm font-medium hover:text-rose-600 transition-colors"
          >
            Benefits
          </Link>
          <Link
            href="/#more"
            className="text-sm font-medium hover:text-rose-600 transition-colors"
          >
            More
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-rose-600 transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Link
            href="/sign-in"
            className="text-sm font-medium hover:text-rose-600 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded text-sm font-medium"
          >
            Sign Up
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
