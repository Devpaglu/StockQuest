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
      trades: {
        include: {
          stock: true
        }
      }
    }
  })

  if (!user) return <div className="text-center text-gray-500 mt-10">User not found.</div>

  // Fetch latest stock prices and calculate gains
  const tradesWithGains = await Promise.all(
    user.trades.map(async (trade) => {
      const res = await fetch(`http://localhost:3000/api/stock/${trade.stock.symbol}/price`)
      const latestPrice = (await res.json())?.Price ?? 0
      const gain = (latestPrice - trade.priceAtTrade) * trade.quantity
      const percentageGain = ((gain / (trade.priceAtTrade * trade.quantity)) * 100).toFixed(2)

      return {
        ...trade,
        latestPrice,
        gain: gain.toFixed(2),
        percentageGain
      }
    })
  )

  const totalValue = tradesWithGains.reduce(
    (acc, trade) => acc + trade.latestPrice * trade.quantity,
    0
  )

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  })

  return (
    <div className="min-h-screen flex flex-col px-4 md:px-10 py-6">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Your Trades</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">See your current performance and trade stats.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="text-gray-500 text-sm">Total Value</div>
              <div className="text-2xl font-bold mt-1">{formatter.format(totalValue)}</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="text-gray-500 text-sm">Total Assets</div>
              <div className="text-2xl font-bold mt-1">{user.trades.length}</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="text-gray-500 text-sm">Trading Level</div>
              <div className="text-2xl font-bold mt-1">Intermediate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Your Trades</h2>

      <div className="space-y-4">
        {tradesWithGains.map((trade, i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gray-200 dark:bg-gray-700 w-10 h-10 rounded-md flex items-center justify-center font-bold text-gray-800 dark:text-white mr-4">
                    {trade.stock.symbol}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{trade.stock.symbol}</div>
                    <div className="text-sm text-gray-500">{trade.quantity} shares @ ₹{trade.priceAtTrade}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${parseFloat(trade.gain) >= 0 ? "text-green-500" : "text-red-500"}`}>
                    ₹{trade.gain}
                  </div>
                  <div className={`text-sm ${parseFloat(trade.percentageGain) >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {parseFloat(trade.percentageGain) >= 0 ? '+' : ''}
                    {trade.percentageGain}%
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
