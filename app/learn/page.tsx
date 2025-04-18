import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, CheckCircle, LockIcon } from "lucide-react"

export default function LearnPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Learn to Trade</h1>
          <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-1 rounded-full">
            <BookOpen className="h-5 w-5" />
            <span className="font-semibold">1450 XP</span>
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold">
              6
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="overflow-hidden">
            <div className="h-3 bg-green-500"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Basics of Investing</h3>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
              </div>
              <p className="text-gray-500 mb-6">Learn the fundamentals of investing and how the stock market works.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <span className="text-sm font-medium">4/4 lessons</span>
                </div>
                <Button variant="outline" className="text-green-500 border-green-500 hover:bg-green-50">
                  Review
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-3 bg-purple-500"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Technical Analysis</h3>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">In Progress</Badge>
              </div>
              <p className="text-gray-500 mb-6">Learn how to analyze stock charts and identify patterns.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-500">2/4</span>
                  </div>
                  <span className="text-sm font-medium">2/4 lessons</span>
                </div>
                <Button className="bg-purple-500 hover:bg-purple-600">Continue</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-3 bg-gray-300"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Fundamental Analysis</h3>
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Locked</Badge>
              </div>
              <p className="text-gray-500 mb-6">Learn how to evaluate a company's financial health and potential.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <LockIcon className="h-4 w-4 text-gray-500" />
                  </div>
                  <span className="text-sm font-medium">0/4 lessons</span>
                </div>
                <Button variant="outline" disabled>
                  Unlock
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-4">Daily Challenges</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
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
                    className="h-6 w-6 text-green-500"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">Buy a stock in the Tech sector</h3>
                  <p className="text-gray-500 mb-4">Practice your trading skills by purchasing a technology stock.</p>
                  <Button className="bg-green-500 hover:bg-green-600">Complete for +50 XP</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
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
                    className="h-6 w-6 text-blue-500"
                  >
                    <path d="M2 20h.01M7 20v-4" />
                    <path d="M12 20v-8" />
                    <path d="M17 20V8" />
                    <path d="M22 4v16" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">Complete a Technical Analysis lesson</h3>
                  <p className="text-gray-500 mb-4">Continue your learning journey with the next lesson.</p>
                  <Button className="bg-blue-500 hover:bg-blue-600">Complete for +100 XP</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
