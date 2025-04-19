import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { StockCard } from "@/components/stock-card"
import { ArrowUpRight } from "lucide-react"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { prisma } from '@/lib/prisma'


export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/login')
  }

  const user = await prisma.user?.findFirst({
    where: {
      clerkId: userId
    },
    include: {
      portfolio: true,
      trades: true
    }
  })

  const stocks = await prisma.stock?.findMany()

  // ✅ Fetch prices for all stocks before rendering
  const stocksWithPrices = await Promise.all(
    stocks.map(async (stock) => {
      const res = await fetch(`http://localhost:3000/api/stock/${stock.symbol}/price`)
      const latestPrice = (await res.json())?.Price
      return {
        ...stock,
        latestPrice: latestPrice ?? 0
      }
    })
  )

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Welcome back,!</h1>
            <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-1 rounded-full">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
                <path d="M11 12 5.12 2.2" />
                <path d="m13 12 5.88-9.8" />
                <path d="M8 7h8" />
                <circle cx="12" cy="19" r="3" />
              </svg>
              <span className="font-semibold">{user?.XP}</span>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold">
                6
              </div>
            </div>
          </div>
          <p className="text-gray-500">Ready to continue your trading journey?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Portfolio Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Portfolio Value</h2>
                <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold">₹{user?.portfolio?.value.toFixed(2)}</div>
                <div className="text-sm text-green-500 font-medium">
                  ₹{user?.portfolio?.change} ({(((user?.portfolio?.change ?? 1) / (user?.portfolio?.value ?? 1)) * 100).toFixed(2)}%) today
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Progress */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Learning Progress</h2>
                <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <div className="space-y-3">
                <div className="text-xl font-bold">2 of 8 modules</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Challenge */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Daily Challenge</h2>
                <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 22V8" />
                  <path d="m5 12 7-4 7 4" />
                  <path d="M5 3h14" />
                  <path d="M5 8h14" />
                </svg>
              </div>
              <div className="space-y-3">
                <div className="text-xl font-bold">Buy a stock in the Tech sector</div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Complete for +50 XP</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trending Stocks */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending Stocks</h2>
          <Link href="/search" className="text-green-500 hover:text-green-600 flex items-center">
            View All
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stocksWithPrices.map((stock) => (
            <StockCard
              key={stock.symbol}
              symbol={stock.symbol}
              name={stock.name}
              price={stock.latestPrice}
              trending={true}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
