import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FolderKanban,
  CheckSquare,
  BarChart3,
  Shield,
  Zap,
  Target,
  Clock,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/theme/mode-toggle";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">TaskFlow</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-rose-600 transition-colors">
              Features
            </Link>
            <Link
              href="#benefits"
              className="text-sm font-medium hover:text-rose-600 transition-colors">
              Benefits
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-rose-600 transition-colors">
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:text-rose-600 transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button size="sm" className="bg-rose-600 hover:bg-rose-700" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20" />
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center justify-items-center">
              <div className="space-y-8 max-w-xl text-center lg:text-left">
                <div className="space-y-4">
                  <Badge
                    variant="secondary"
                    className="bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200">
                    Team Collaboration Made Simple
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Manage Projects,
                    <span className="text-rose-600"> Empower Teams</span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                    Streamline your team's workflow with powerful project
                    management, task tracking, and interactive dashboards. From
                    tasks to subtasks, we've got your team covered.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-rose-600 hover:bg-rose-700"
                    asChild>
                    <Link href="/signup">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#demo">Watch Demo</Link>
                  </Button>
                </div>

                <div className="flex items-center space-x-6 text-sm text-muted-foreground justify-center lg:justify-start">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Free 14-day trial</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="TaskFlow Dashboard"
                    width={800}
                    height={600}
                    className="rounded-xl shadow-2xl border"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-rose-200 dark:bg-rose-900 rounded-full blur-3xl opacity-20" />
                <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-pink-200 dark:bg-pink-900 rounded-full blur-3xl opacity-20" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <Badge
                variant="secondary"
                className="bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200">
                Powerful Features
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold">
                Everything your team needs to succeed
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From project planning to task execution, our comprehensive suite
                of tools helps teams stay organized and productive.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-rose-100 dark:bg-rose-900 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-rose-600" />
                  </div>
                  <CardTitle>Team Collaboration</CardTitle>
                  <CardDescription>
                    Bring your team together with shared workspaces, real-time
                    updates, and seamless communication tools.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-rose-100 dark:bg-rose-900 flex items-center justify-center mb-4">
                    <FolderKanban className="h-6 w-6 text-rose-600" />
                  </div>
                  <CardTitle>Project Management</CardTitle>
                  <CardDescription>
                    Organize projects with intuitive boards, timelines, and
                    milestone tracking to keep everything on schedule.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-rose-100 dark:bg-rose-900 flex items-center justify-center mb-4">
                    <CheckSquare className="h-6 w-6 text-rose-600" />
                  </div>
                  <CardTitle>Task & Subtask Tracking</CardTitle>
                  <CardDescription>
                    Break down complex projects into manageable tasks and
                    subtasks with detailed progress tracking.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-rose-100 dark:bg-rose-900 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-rose-600" />
                  </div>
                  <CardTitle>Interactive Dashboards</CardTitle>
                  <CardDescription>
                    Visualize progress with beautiful charts, graphs, and
                    analytics for both individual and team performance.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-rose-100 dark:bg-rose-900 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-rose-600" />
                  </div>
                  <CardTitle>Role-Based Permissions</CardTitle>
                  <CardDescription>
                    Control access with granular permissions, ensuring team
                    members see only what they need to see.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-rose-100 dark:bg-rose-900 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-rose-600" />
                  </div>
                  <CardTitle>Progress Analytics</CardTitle>
                  <CardDescription>
                    Track team productivity with detailed analytics and insights
                    to optimize your workflow.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge
                    variant="secondary"
                    className="bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200">
                    Why Choose TaskFlow
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-bold">
                    Boost productivity by 40% with smart workflows
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Our platform is designed to eliminate bottlenecks and
                    streamline your team's workflow, so you can focus on what
                    matters most.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900 flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="h-4 w-4 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Lightning Fast Setup
                      </h3>
                      <p className="text-muted-foreground">
                        Get your team up and running in minutes, not hours. Our
                        intuitive interface requires no training.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900 flex items-center justify-center flex-shrink-0 mt-1">
                      <Target className="h-4 w-4 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Goal-Oriented Planning
                      </h3>
                      <p className="text-muted-foreground">
                        Set clear objectives and track progress with
                        milestone-based project planning and automated
                        reporting.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900 flex items-center justify-center flex-shrink-0 mt-1">
                      <Clock className="h-4 w-4 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Time Tracking & Insights
                      </h3>
                      <p className="text-muted-foreground">
                        Understand where time is spent with detailed analytics
                        and optimize your team's efficiency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Analytics Dashboard"
                  width={600}
                  height={500}
                  className="rounded-xl shadow-xl border"
                />
              </div>
            </div>
          </div>
        </section>

        {/* GitHub Section */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Explore My Work on GitHub
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the source code and contribute to our open-source
              projects.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-black to-gray-800 text-white hover:from-gray-900 hover:to-black flex items-center space-x-4 py-5 px-10 text-xl shadow-lg hover:shadow-xl"
                asChild>
                <Link href="https://github.com/IbatoLionDev" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-10 w-10">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 4.302 2.794 7.946 6.676 9.229.488.09.664-.212.664-.472 0-.233-.008-.85-.013-1.67-2.713.588-3.287-1.308-3.287-1.308-.444-1.127-1.084-1.427-1.084-1.427-.887-.606.067-.594.067-.594 1.003.07 1.53 1.03 1.53 1.03.872 1.495 2.287 1.063 2.846.814.09-.632.342-1.063.622-1.307-2.166-.246-4.442-1.083-4.442-4.823 0-1.065.38-1.935 1.03-2.617-.103-.247-.447-1.24.098-2.586 0 0 .84-.27 2.75 1.026a9.564 9.564 0 0 1 5 0c1.91-1.296 2.75-1.026 2.75-1.026.545 1.346.201 2.339.098 2.586.65.682 1.03 1.552 1.03 2.617 0 3.75-2.28 4.573-4.452 4.815.352.303.664.902.664 1.818 0 1.312-.012 2.37-.012 2.692 0 .262.174.566.67.47A9.753 9.753 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75z"
                    />
                  </svg>
                  <span>Visit GitHub</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-rose-600 to-pink-600 text-white">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
                Ready to transform your team's productivity?
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Join thousands of teams who have already streamlined their
                workflow with TaskFlow. Start your free trial today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-rose-600 hover:bg-gray-100"
                asChild>
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-rose-600 bg-transparent"
                asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>

            <p className="text-sm opacity-75">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>
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
                <span className="text-xl font-bold">TaskFlow</span>
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
              © {new Date().getFullYear()} TaskFlow. All rights reserved.
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
