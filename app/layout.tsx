import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
import Chatbot from "@/components/Chatbot"



const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StockQuest - Learn to Trade Stocks While Having Fun",
  description:
    "Master the market through gamified learning, build your portfolio, and compete with friends in a risk-free environment.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Chatbot/>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}
