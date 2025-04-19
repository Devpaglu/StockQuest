"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TradeContext } from "./TradeContext"
import { useContext, useEffect, useState } from "react"

interface Trade {
  stockSymbol: string
  quantity: number
  priceAtTrade: number
  stock: {
    symbol: string
  }
}

interface User {
  trades: Trade[]
}

export default function TradedStocks() {
  const { setSelectedTrade } = useContext(TradeContext)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      const fun = async ()=>{
        try {
        const res = await fetch("http://localhost:3000/api/user")
        const data = await res.json()
        console.log(data)
        setUser(data)
      } catch (err) {
        console.error("Error fetching user data", err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fun();

  }, [])

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading your trades...</div>
  }

  if (!user || !user.trades) {
    return <div className="p-10 text-center text-red-500">Failed to load your trades.</div>
  }

  const tradingLevel =
    user.trades.length > 10 ? "Advanced" :
    user.trades.length > 3 ? "Intermediate" : "Beginner"

  return (
    <div className="min-h-screen flex flex-col px-4 md:px-10 py-6">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Your Trades</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                See your current performance and trade stats.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <InfoBox title="Total Assets" value={user.trades.length.toString()} />
            <InfoBox title="Trading Level" value={tradingLevel} />
            <InfoBox title="Total Value" value="Coming Soon" />
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Your Trades</h2>

      <div className="space-y-4">
        {user.trades.map((trade, index) => (
          <Card key={index} className="shadow-sm">
            <CardContent
              className="p-4 cursor-pointer"
              onClick={() => setSelectedTrade(trade)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gray-200 dark:bg-gray-700 w-10 h-10 rounded-md flex items-center justify-center font-bold text-gray-800 dark:text-white mr-4">
                    {trade.stockSymbol}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {trade.stockSymbol}
                    </div>
                    <div className="text-sm text-gray-500">
                      {trade.quantity} shares @ ${trade.priceAtTrade}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function InfoBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  )
}
