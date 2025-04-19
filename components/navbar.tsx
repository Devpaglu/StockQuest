"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Home, BarChart2, BookOpen, Sun } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center mr-4 space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">StockQuest</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search stocks..."
              className="w-full rounded-full bg-muted pl-8 md:w-[300px] lg:w-[300px]"
            />
          </div>

          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className={`flex items-center text-sm font-medium ${pathname === "/" ? "text-foreground" : "text-muted-foreground"}`}
            >
              <Home className="mr-1 h-4 w-4" />
              Home
            </Link>
            <Link
              href="/portfolio"
              className={`flex items-center text-sm font-medium ${pathname === "/portfolio" ? "text-foreground" : "text-muted-foreground"}`}
            >
              <BarChart2 className="mr-1 h-4 w-4" />
              Portfolio
            </Link>
            <Link
              href="/"
              className={`flex items-center text-sm font-medium ${pathname === "/" ? "text-primary" : "text-primary"}`}
            >
              <BookOpen className="mr-1 h-4 w-4" />
              Learn
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground">
              <Sun className="h-4 w-4" />
              <span className="sr-only">Toggle theme</span>
            </button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}