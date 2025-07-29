import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <AlertCircle className="text-rose-600 mb-6" size={96} />
        <h1 className="text-6xl font-bold tracking-tight mb-4 text-rose-600">
          404
        </h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-lg text-muted-foreground max-w-md mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Button size="lg" className="bg-rose-600 hover:bg-rose-700" asChild>
          <Link href="/">
            Go back home
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </main>
    </div>
  );
}
