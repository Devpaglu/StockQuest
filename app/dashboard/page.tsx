import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { StockCard } from "@/components/stock-card"
import { ArrowUpRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Welcome back, Alex Morgan!</h1>
            <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-1 rounded-full">
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
                className="h-5 w-5"
              >
                <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
                <path d="M11 12 5.12 2.2" />
                <path d="m13 12 5.88-9.8" />
                <path d="M8 7h8" />
                <circle cx="12" cy="19" r="3" />
              </svg>
              <span className="font-semibold">1450 XP</span>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold">
                6
              </div>
            </div>
          </div>
          <p className="text-gray-500">Ready to continue your trading journey?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Portfolio Value</h2>
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
                  className="h-5 w-5 text-green-500"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold">$15732.40</div>
                <div className="text-sm text-green-500 font-medium">+$234.56 (+1.51%) today</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Learning Progress</h2>
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
                  className="h-5 w-5 text-purple-500"
                >
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

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Daily Challenge</h2>
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
                  className="h-5 w-5 text-blue-500"
                >
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

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending Stocks</h2>
          <Link href="/search" className="text-green-500 hover:text-green-600 flex items-center">
            View All
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StockCard
            symbol="AAPL"
            name="Apple Inc."
            price={187.68}
            change={1.25}
            changePercent={0.67}
            trending={true}
          />
          <StockCard
            symbol="MSFT"
            name="Microsoft Corporation"
            price={408.47}
            change={3.22}
            changePercent={0.79}
            trending={true}
          />
          <StockCard
            symbol="GOOGL"
            name="Alphabet Inc."
            price={174.23}
            change={-0.89}
            changePercent={-0.51}
            trending={true}
          />
          <StockCard
            symbol="AMZN"
            name="Amazon.com Inc."
            price={186.93}
            change={2.34}
            changePercent={1.27}
            trending={true}
          />
          <StockCard
            symbol="TSLA"
            name="Tesla, Inc."
            price={175.34}
            change={-5.28}
            changePercent={-2.92}
            trending={true}
          />
          <StockCard
            symbol="NFLX"
            name="Netflix, Inc."
            price={638.78}
            change={12.45}
            changePercent={1.99}
            trending={true}
          />
          <StockCard
            symbol="META"
            name="Meta Platforms, Inc."
            price={503.22}
            change={8.34}
            changePercent={1.69}
            trending={true}
          />
          <StockCard
            symbol="NVDA"
            name="NVIDIA Corporation"
            price={950.25}
            change={25.13}
            changePercent={2.72}
            trending={true}
          />
        </div>
      </main>
    </div>
  )
}
