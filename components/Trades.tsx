import React from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp } from "lucide-react"
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

const Trades = async() => {
     const { userId, redirectToSignIn } = await auth()
      if (!userId) return redirectToSignIn()
    
      const user = await prisma.user.findFirst({
        where: {
          clerkId: userId
        },
        include: {
          portfolio: true,
          trades: {
            include: {
              stock: true
            }
          }
        }
      })
    
      if (!user) return <div>User not found.</div>
  return (
    <div className="min-h-screen flex flex-col w-1/2">
    <main className="flex-1 container mx-auto px-4 py-8">

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

export default Trades