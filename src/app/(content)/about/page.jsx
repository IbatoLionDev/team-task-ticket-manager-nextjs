import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
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
    </div>
  );
}
