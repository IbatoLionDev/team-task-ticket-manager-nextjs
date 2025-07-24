import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
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
          <article className="space-y-6 text-muted-foreground text-lg">
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
              <Link
                href="mailto:ibatoliondev@gmail.com"
                className="text-rose-600 hover:underline">
                ibatoliondev@gmail.com
              </Link>{" "}
              for any privacy-related requests.
            </p>
            <p>
              6. Changes to this Policy: We may update this Privacy Policy
              periodically. Continued use of the platform constitutes acceptance
              of any changes.
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}
