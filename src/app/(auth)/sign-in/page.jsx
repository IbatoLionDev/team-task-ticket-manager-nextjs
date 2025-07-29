"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useClientForm } from "@/hooks/useClientForm";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/environments";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { fields, handleChange, handleSubmit, error, loading } = useClientForm({
    url: `${API_BASE}/login`,
    onSuccess: () => router.push("/dashboard"),
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username or email below to login
          </CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="identifier">Username or Email</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="you@example.com"
                value={fields.identifier || ""}
                onChange={(e) => handleChange("identifier", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={fields.password || ""}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <CardFooter className="flex flex-col gap-2 mt-6">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in…" : "Login"}
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
