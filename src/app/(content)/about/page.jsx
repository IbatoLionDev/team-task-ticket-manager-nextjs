import { Badge } from "@/components/ui/badge";
import { CheckSquare } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme/mode-toggle";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">LionProyectsFlow</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/#features"
              className="text-sm font-medium hover:text-rose-600 transition-colors">
              Features
            </Link>
            <Link
              href="/#benefits"
              className="text-sm font-medium hover:text-rose-600 transition-colors">
              Benefits
            </Link>
            <Link
              href="/#more"
              className="text-sm font-medium hover:text-rose-600 transition-colors">
              More
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium hover:text-rose-600 transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              href="/sign-in"
              className="text-sm font-medium hover:text-rose-600 transition-colors">
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded text-sm font-medium">
              Sign Up
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 py-20 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge
            variant="secondary"
            className="bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200 mb-6">
            About Me
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-12 max-w-4xl mx-auto text-center">
            Roberto Ibarra Hernández
          </h1>
          <article className="space-y-6 text-muted-foreground text-lg">
            <p>
              Hello, I am Roberto Ibarra Hernández, a graduate in Computer
              Science Engineering from the University of Computer Sciences (UCI)
              in Havana, Cuba. Although I do not yet have experience in real
              projects, I have a strong willingness to learn and a remarkable
              ability to quickly adapt to various technologies.
            </p>
            <p>
              My main area of expertise is web development. Additionally, I have
              skills in video editing, which complements my profile and allows
              me to present information in a creative and interactive way.
              Beyond monetary aspects, my goal is to establish myself in the
              community and contribute as much value as possible. I firmly
              believe in the power of collaboration and innovation in the field
              of technology.
            </p>
            <p>
              Besides my passion for programming, I also have a YouTube channel
              dedicated to anime, where I apply my video editing skills. I
              believe this diversity of interests allows me to bring a unique
              perspective to my work.
            </p>
            <p>
              If you wish to get in touch with me, you can send me an email at{" "}
              <Link
                href="mailto:ibatoliondev@gmail.com"
                className="text-rose-600 hover:underline">
                ibatoliondev@gmail.com
              </Link>
              . I am open to collaboration opportunities and always willing to
              learn something new.
            </p>
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600">
                  <CheckSquare className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">LionProyectsFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering teams to achieve more through better collaboration
                and project management.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-2 text-sm">
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground">
                  Features
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground">
                  Integrations
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground">
                  API
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <div className="space-y-2 text-sm">
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground">
                  About
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-sm">
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground">
                  Status
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-foreground">
                  Security
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} LionProyectsFlow. All rights
              reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-muted-foreground hover:text-foreground">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
