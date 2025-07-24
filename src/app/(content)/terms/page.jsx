import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Main content */}
      <main className="flex-1 py-20 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge
            variant="secondary"
            className="bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200 mb-6">
            Terms and Conditions
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-12 max-w-4xl mx-auto text-center">
            Terms of Service
          </h1>
          <article className="space-y-6 text-muted-foreground text-lg">
            <p>
              Welcome to LionProyectsFlow. By using our platform, you agree to
              comply with and be bound by the following terms and conditions.
              Please read them carefully.
            </p>
            <p>
              1. Use of Service: You agree to use LionProyectsFlow for lawful
              purposes only and not to engage in any activity that may harm the
              platform or its users.
            </p>
            <p>
              2. Account Responsibility: You are responsible for maintaining the
              confidentiality of your account information and for all activities
              that occur under your account.
            </p>
            <p>
              3. Intellectual Property: All content and materials on
              LionProyectsFlow are the property of their respective owners and
              are protected by intellectual property laws.
            </p>
            <p>
              4. Privacy: Your use of the platform is also governed by our
              Privacy Policy, which explains how we collect, use, and protect
              your information.
            </p>
            <p>
              5. Limitation of Liability: LionProyectsFlow is provided "as is"
              without warranties of any kind. We are not liable for any damages
              arising from the use of the platform.
            </p>
            <p>
              6. Changes to Terms: We reserve the right to modify these terms at
              any time. Continued use of the platform constitutes acceptance of
              the updated terms.
            </p>
            <p>
              If you have any questions about these terms, please contact us at{" "}
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
