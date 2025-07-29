import Link from "next/link";
import { CheckSquare } from "lucide-react";

export function ContentFooter() {
  return (
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
              Empowering teams to achieve more through better collaboration and
              project management.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="#features"
                className="block text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link
                href="#benefits"
                className="block text-muted-foreground hover:text-foreground">
                Benefits
              </Link>
              <Link
                href="#more"
                className="block text-muted-foreground hover:text-foreground">
                More
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
            © {new Date().getFullYear()} LionProyectsFlow. All rights reserved.
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
  );
}
