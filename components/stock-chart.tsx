"use client"

import { useEffect, useState } from "react"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface PriceData {
  date: string
  price: number
}

interface StockChartProps {
  symbol: string
  priceHistory: PriceData[]
}

export default function StockChart({ symbol, priceHistory }: StockChartProps) {
  const [chartData, setChartData] = useState<PriceData[]>([])
  const [range, setRange] = useState<"1W" | "1M">("1W")

  useEffect(() => {
    const now = new Date()
    const startDate = new Date()

    if (range === "1W") {
      startDate.setDate(now.getDate() - 7)
    } else {
      startDate.setMonth(now.getMonth() - 1)
    }

    const filtered = priceHistory.filter(
      (item) => new Date(item.date) >= startDate
    )

    setChartData(filtered)
  }, [priceHistory, range])

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })

  const stroke = "hsl(var(--primary))"
  const fill = "hsla(var(--primary), 0.2)"

  return (
    <Card className="w-full overflow-hidden my-3">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>{symbol} - Price Chart</CardTitle>
        <ToggleGroup
          type="single"
          value={range}
          onValueChange={(val) => val && setRange(val as "1W" | "1M")}
        >
          <ToggleGroupItem value="1W">1W</ToggleGroupItem>
          <ToggleGroupItem value="1M">1M</ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={stroke} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={stroke} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />
                <YAxis
                  tickFormatter={formatCurrency}
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent formatter={(v) => formatCurrency(Number(v))} />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={stroke}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
