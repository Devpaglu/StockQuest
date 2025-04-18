"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
export default function PortfolioPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log("User ID:", user.id);
    }
  }, [isLoaded, isSignedIn, user]);
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
              <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-1 rounded-full ml-auto">
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

            <div className="mt-6">
              <div className="text-gray-500 text-sm">Total Value</div>
              <div className="text-4xl font-bold mt-1">$15732.40</div>
              <div className="flex items-center text-green-500 text-sm font-medium mt-1">
                <ArrowUp className="h-4 w-4 mr-1" />
                $234.56 (+1.51%) today
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-gray-500 text-sm">Assets</div>
                <div className="text-2xl font-bold mt-1">4</div>
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
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="bg-gray-200 dark:bg-gray-700 w-10 h-10 rounded-md flex items-center justify-center font-bold mr-3">
                  AA
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="font-bold">AAPL</div>
                    <div className="text-sm text-gray-500 ml-2">Apple Inc.</div>
                  </div>
                  <div className="flex items-center text-sm">
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
                      className="h-4 w-4 mr-1 text-gray-500"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                    10 shares
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">$1876.80</div>
                  <div className="text-green-500 text-sm">+24.50%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="bg-gray-200 dark:bg-gray-700 w-10 h-10 rounded-md flex items-center justify-center font-bold mr-3">
                  MS
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="font-bold">MSFT</div>
                    <div className="text-sm text-gray-500 ml-2">Microsoft Corporation</div>
                  </div>
                  <div className="flex items-center text-sm">
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
                      className="h-4 w-4 mr-1 text-gray-500"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                    5 shares
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">$2042.35</div>
                  <div className="text-green-500 text-sm">+16.64%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="bg-gray-200 dark:bg-gray-700 w-10 h-10 rounded-md flex items-center justify-center font-bold mr-3">
                  TS
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="font-bold">TSLA</div>
                    <div className="text-sm text-gray-500 ml-2">Tesla, Inc.</div>
                  </div>
                  <div className="flex items-center text-sm">
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
                      className="h-4 w-4 mr-1 text-gray-500"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                    8 shares
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">$1402.72</div>
                  <div className="text-red-500 text-sm">-7.93%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
