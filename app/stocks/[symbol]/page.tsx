import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StockChart } from "@/components/stock-chart"
import { BookOpen } from "lucide-react"

interface StockPageProps {
  params: {
    symbol: string
  }
}

export default function StockPage({ params }: StockPageProps) {
  const { symbol } = params

  // Mock data for the example
  const stockData = {
    AAPL: {
      name: "Apple Inc.",
      price: 187.68,
      change: 1.25,
      changePercent: 0.67,
      marketCap: "2950.00B",
      volume: "52.35M",
      peRatio: "30.50",
      dividendYield: "0.60%",
      sector: "Technology",
      description:
        "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
    },
  }

  const stock = stockData[symbol as keyof typeof stockData] || {
    name: "Unknown Stock",
    price: 0,
    change: 0,
    changePercent: 0,
    marketCap: "N/A",
    volume: "N/A",
    peRatio: "N/A",
    dividendYield: "N/A",
    sector: "N/A",
    description: "No information available for this stock.",
  }

  const isPositive = stock.change >= 0

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-3xl font-bold">{symbol}</div>
            <div
              className={`text-sm font-medium px-3 py-1 rounded-full ${isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {isPositive ? "+" : ""}
              {stock.changePercent.toFixed(2)}%
            </div>
          </div>
          <div className="text-xl text-gray-700 dark:text-gray-300">{stock.name}</div>
          <div className="flex items-baseline gap-2 mt-2">
            <div className="text-4xl font-bold">${stock.price.toFixed(2)}</div>
            <div className={`text-lg font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? "+" : ""}
              {stock.change.toFixed(2)}
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-4">Price Chart</h2>
              <StockChart />
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Button variant="outline" className="rounded-full">
                1D
              </Button>
              <Button variant="outline" className="rounded-full">
                1W
              </Button>
              <Button variant="outline" className="rounded-full">
                1M
              </Button>
              <Button variant="outline" className="rounded-full">
                3M
              </Button>
              <Button variant="secondary" className="rounded-full bg-green-500 text-white hover:bg-green-600">
                1Y
              </Button>
              <Button variant="outline" className="rounded-full">
                5Y
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-1">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="financials" className="flex-1">
                  Financials
                </TabsTrigger>
                <TabsTrigger value="news" className="flex-1">
                  News
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Company Overview</h3>
                    <p className="text-gray-500 mb-4">Key information about {stock.name}</p>

                    <p className="mb-6">{stock.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <h4 className="text-lg font-bold mb-4">Key Statistics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Market Cap</span>
                            <span className="font-medium">${stock.marketCap}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Volume</span>
                            <span className="font-medium">{stock.volume}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">P/E Ratio</span>
                            <span className="font-medium">{stock.peRatio}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Dividend Yield</span>
                            <span className="font-medium">{stock.dividendYield}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Sector</span>
                            <span className="font-medium">{stock.sector}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold mb-4">Performance</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-500">Today</span>
                              <span className="text-green-500">+0.67%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "20%" }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-500">1 Month</span>
                              <span className="text-green-500">+8.2%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "40%" }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-500">1 Year</span>
                              <span className="text-green-500">+32.7%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "65%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financials" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Financial Information</h3>
                    <p className="text-gray-500">Coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="news" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Latest News</h3>
                    <p className="text-gray-500">Coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Trade {symbol}</h3>
                <p className="text-gray-500 mb-6">Buy or sell shares of {stock.name}</p>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Current Price</div>
                    <div className="text-xl font-bold">${stock.price.toFixed(2)}</div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-1">Available Cash</div>
                    <div className="text-xl font-bold">$10,000.00</div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-1">Quantity</div>
                    <Input type="number" min="1" defaultValue="1" />
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-1">Estimated Cost</div>
                    <div className="text-xl font-bold">${stock.price.toFixed(2)}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-green-500 hover:bg-green-600">
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
                    <Button className="bg-red-500 hover:bg-red-600">
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

                <div className="mt-8 p-4 bg-purple-100 rounded-lg flex items-start gap-3">
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
