"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-8">{children}</div>
      </main>
    </div>
   )
}