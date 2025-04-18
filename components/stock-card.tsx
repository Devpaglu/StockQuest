import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

interface StockCardProps {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  trending?: boolean
}

export function StockCard({ symbol, name, price, change, changePercent, trending }: StockCardProps) {
  const isPositive = change >= 0

  return (
    <Link href={`/stocks/${symbol}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-1">
            <div className="font-bold text-lg">{symbol}</div>
            {isPositive ? (
              <div className="text-green-500 flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
              </div>
            ) : (
              <div className="text-red-500 flex items-center">
                <ArrowDown className="h-4 w-4 mr-1" />
              </div>
            )}
          </div>
          <div className="text-gray-500 text-sm mb-2">{name}</div>
          <div className="flex justify-between items-end">
            <div className="font-bold text-xl">${price.toFixed(2)}</div>
            <div className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? "+" : ""}
              {change.toFixed(2)} ({isPositive ? "+" : ""}
              {changePercent.toFixed(2)}%)
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
