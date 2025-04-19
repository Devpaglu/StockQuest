import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

interface StockCardProps {
  symbol: string
  name: string
  price: number
  change?: number
  changePercent?: number
  trending?: boolean
}

export function StockCard({ symbol, name, price, change, changePercent, trending }: StockCardProps) {
  const isPositive = change?(change >= 0):0

  return (
    <Link href={`/stocks/${symbol}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-1">
            <div className="font-bold text-lg">{symbol}</div>
          </div>
          <div className="text-gray-500 text-sm mb-2">{name}</div>
          <div className="flex justify-between items-end">
            <div className="font-bold text-xl">${price.toFixed(2)}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
