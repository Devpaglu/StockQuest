import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp } from "lucide-react"
import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/lib/prisma'

export default async function PortfolioPage() {
  const { userId, redirectToSignIn } = await auth()
  if (!userId) return redirectToSignIn()

  const user = await prisma.user.findFirst({
    where: {
      clerkId: userId
    },
    include: {
      portfolio:{
        include:{
          stockPortfolio:true
        }
      },
      trades: {
        include: {
          stock: true
        }
      }
    }
  })

  if (!user) return <div>User not found.</div>

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium text-gray-500">Your Portfolio</h2>
                <p className="text-sm text-gray-500">Track your investments and performance</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-gray-500 text-sm">Total Value</div>
              <div className="text-4xl font-bold mt-1">₹{user.portfolio?.value ?? 0}</div>
              <div className="flex items-center text-green-500 text-sm font-medium mt-1">
                <ArrowUp className="h-4 w-4 mr-1" />
                ${user.portfolio?.change} today
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-gray-500 text-sm">Assets</div>
                <div className="text-2xl font-bold mt-1">{user.trades.length}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-gray-500 text-sm">Trading Level</div>
                <div className="text-2xl font-bold mt-1">Intermediate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">Your Holdings</h2>

        <div className="space-y-4">
          {user.trades.map(async(trade, i) => {
            const res = await fetch(`http://localhost:3000/api/stock/${trade.stockSymbol}/price`)
            const latestPrice = (await res.json())?.Price
            const gain = (latestPrice - trade.priceAtTrade)*(trade.quantity)

            return (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="bg-gray-200 dark:bg-gray-700 w-10 h-10 rounded-md flex items-center justify-center font-bold mr-3">
                      {trade.stock.symbol}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold">{trade.stock.symbol}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        {trade.quantity} shares
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{gain.toFixed(2)}</div>
                      <div className="text-green-500 text-sm">+{((gain / trade.priceAtTrade) * 100).toFixed(2)}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
