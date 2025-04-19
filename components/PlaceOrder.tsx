"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Router } from "lucide-react"
import { useRouter } from "next/navigation";


const PlaceOrder = ({
  stock,
  currentPrice,
  balance,
}: {
  stock: any
  currentPrice: any
  balance: any
}) => {
    const router = useRouter();
  const [quantity, setQuantity] = useState(1)
  const [cost, setCost] = useState(currentPrice)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1
    setQuantity(value)
    setCost(value * currentPrice)
  }

  const buyOrder = async () => {
    await fetch("/api/order/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol: stock.symbol,
        quantity: quantity,
        price: currentPrice,
        balance: balance,
      }),
    })
  
    router.refresh()
  }
  

  const sellOrder = async () => {
    await fetch("/api/order/sell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol: stock.symbol,
        quantity: quantity,
        price: currentPrice,
        balance: balance,
      }),
    })
  
    router.refresh()
  }
  

  return (
    <div>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">Trade {stock.symbol}</h3>
          <p className="text-gray-500 mb-6">Buy or sell shares of {stock?.name}</p>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium mb-1">Current Price</div>
              <div className="text-xl font-bold">${currentPrice}</div>
            </div>

            <div>
              <div className="text-sm font-medium mb-1">Available Cash</div>
              <div className="text-xl font-bold">${balance}</div>
            </div>

            <div>
              <div className="text-sm font-medium mb-1">Quantity</div>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </div>

            <div>
              <div className="text-sm font-medium mb-1">Estimated Cost</div>
              <div className="text-xl font-bold">${cost}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button className="bg-green-500 hover:bg-green-600"
              onClick={buyOrder}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                Buy
              </Button>

              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={sellOrder}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                Sell
              </Button>
            </div>
          </div>

          {/* <div className="mt-8 p-4 bg-purple-100 rounded-lg flex items-start gap-3">
            <BookOpen className="h-5 w-5 text-purple-500 mt-0.5" />
            <div>
              <h4 className="font-bold text-purple-800">Learn while you trade</h4>
              <p className="text-sm text-purple-700 mb-2">
                Complete a lesson about Technology stocks and earn 50 XP + $500 bonus cash!
              </p>
              <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                Start Lesson
              </Button>
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
  )
}

export default PlaceOrder
