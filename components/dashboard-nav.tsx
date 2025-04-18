"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home, Clock, BookOpen, User, Search, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export function DashboardNav() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
          <Logo />
          <span>StockQuest</span>
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search stocks..."
              className="w-full rounded-full bg-gray-100 pl-8 focus-visible:ring-green-500"
            />
          </div>

          <nav className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className={`flex flex-col items-center gap-1 text-sm ${
                pathname === "/dashboard" ? "text-green-500" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              href="/portfolio"
              className={`flex flex-col items-center gap-1 text-sm ${
                pathname === "/portfolio" ? "text-green-500" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Clock className="h-5 w-5" />
              <span>Portfolio</span>
            </Link>
            <Link
              href="/learn"
              className={`flex flex-col items-center gap-1 text-sm ${
                pathname === "/learn" ? "text-green-500" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span>Learn</span>
            </Link>
            <Link
              href="/profile"
              className={`flex flex-col items-center gap-1 text-sm ${
                pathname === "/profile" ? "text-green-500" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          </nav>

          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
