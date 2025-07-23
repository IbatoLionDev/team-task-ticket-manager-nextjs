import { Badge } from "@/components/ui/badge";
import { CheckSquare } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme/mode-toggle";

export default function PrivacyPage() {
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
            Privacy Policy
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-12 max-w-4xl mx-auto text-center">
            Privacy Policy
          </h1>
          <div className="space-y-6 text-muted-foreground text-lg">
            <p>
              At LionProyectsFlow, we are committed to protecting your privacy
              and ensuring the security of your personal information. This
              Privacy Policy explains how we collect, use, and safeguard your
              data when you use our platform.
            </p>
            <p>
              1. Information Collection: We collect information you provide
              directly to us, such as account details and project data, as well
              as usage data to improve our services.
            </p>
            <p>
              2. Use of Information: Your information is used to provide,
              maintain, and improve LionProyectsFlow, communicate with you, and
              ensure a secure experience.
            </p>
            <p>
              3. Data Sharing: We do not sell your personal information. We may
              share data with trusted service providers who assist in operating
              our platform under strict confidentiality agreements.
            </p>
            <p>
              4. Data Security: We implement industry-standard security measures
              to protect your data from unauthorized access, alteration, or
              disclosure.
            </p>
            <p>
              5. Your Rights: You have the right to access, correct, or delete
              your personal information. Contact us at{" "}
              <a
                href="mailto:ibatoliondev@gmail.com"
                className="text-rose-600 hover:underline">
                ibatoliondev@gmail.com
              </a>{" "}
              for any privacy-related requests.
            </p>
            <p>
              6. Changes to this Policy: We may update this Privacy Policy
              periodically. Continued use of the platform constitutes acceptance
              of any changes.
            </p>
          </div>
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
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link
                href="#"
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
