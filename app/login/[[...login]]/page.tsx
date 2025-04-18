"use client"

import { useState } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Logo } from "@/components/logo"
import { ChevronLeft } from "lucide-react"
import { SignIn, SignUp } from "@clerk/nextjs"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex h-16 items-center px-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <div className="mx-auto flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold">StockQuest</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome to StockQuest</h1>
            <p className="text-gray-500 mt-2">
              Your journey to becoming a stock trading master begins here.
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-4">
              <SignIn path="/login" fallbackRedirectUrl='/checkdb'/>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-4">
              <SignUp path="/login" fallbackRedirectUrl='/checkdb' />
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm text-gray-500">
            By continuing, you agree to StockQuest's{" "}
            <Link href="#" className="text-green-500 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-green-500 hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </main>
    </div>
  )
}
