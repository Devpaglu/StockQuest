import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { auth } from '@clerk/nextjs/server'
import { redirect } from "next/navigation"

export default async function LandingPage() {
  const { userId } = await auth()
  if (userId) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 border-b">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold">StockQuest</span>
        </div>
        <div className="ml-auto flex gap-2">
          <Link href="/login">
            <Button variant="outline" className="rounded-full">
              Login
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="rounded-full bg-green-500 hover:bg-green-600">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Learn to Trade Stocks
                <span className="block bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                  While Having Fun
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Master the market through gamified learning, build your portfolio, and compete with friends in a
                risk-free environment.
              </p>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button className="h-12 px-8 bg-green-500 hover:bg-green-600 rounded-full">
                    Start Your Journey <span className="ml-2">→</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Why StockQuest?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="p-3 rounded-full bg-green-100 text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Learn By Doing</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Gain practical experience through interactive lessons and real-time market simulations.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M2 20h.01M7 20v-4" />
                    <path d="M12 20v-8" />
                    <path d="M17 20V8" />
                    <path d="M22 4v16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Risk-Free Trading</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Practice with virtual money before investing real funds in the market.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="p-3 rounded-full bg-purple-100 text-purple-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.95 1 4.8a.671.671 0 0 1-.656.954.69.69 0 0 1-.344-.1" />
                    <path d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603" />
                    <path d="M17 15a3.5 3.5 0 0 0-.025-4.975" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Gamified Experience</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Earn XP, complete challenges, and level up as you become a better investor.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 StockQuest. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
