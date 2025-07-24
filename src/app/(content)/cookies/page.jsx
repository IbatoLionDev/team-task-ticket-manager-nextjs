import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function CookiesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Main content */}
      <main className="flex-1 py-20 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge
            variant="secondary"
            className="bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200 mb-6">
            Cookies Policy
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-12 max-w-4xl mx-auto text-center">
            Cookies Policy
          </h1>
          <article className="space-y-6 text-muted-foreground text-lg">
            <p>
              LionProyectsFlow uses cookies to enhance your experience on our
              platform. Cookies are small data files stored on your device that
              help us provide personalized content and improve functionality.
            </p>
            <p>
              1. Types of Cookies: We use essential cookies necessary for the
              operation of the platform, as well as analytics cookies to
              understand user behavior and improve our services.
            </p>
            <p>
              2. Cookie Management: You can control and manage cookies through
              your browser settings. Please note that disabling certain cookies
              may affect the functionality of the platform.
            </p>
            <p>
              3. Third-Party Cookies: We may use cookies from trusted
              third-party services to provide additional features and analytics.
            </p>
            <p>
              4. Changes to this Policy: We may update this Cookies Policy from
              time to time. Continued use of the platform constitutes acceptance
              of any changes.
            </p>
            <p>
              For any questions regarding our use of cookies, please contact us
              at{" "}
              <Link
                href="mailto:ibatoliondev@gmail.com"
                className="text-rose-600 hover:underline">
                ibatoliondev@gmail.com
              </Link>
              .
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}
