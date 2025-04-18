import { DashboardNav } from "@/components/dashboard-nav"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Search Stocks</h1>

        <div className="flex gap-2 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input type="search" placeholder="Search by company name or symbol..." className="pl-10 h-12" />
          </div>
          <Button className="h-12 px-6 bg-green-500 hover:bg-green-600">Search</Button>
        </div>

        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <Search className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Search for stocks</h2>
          <p className="text-gray-500 text-center max-w-md">
            Enter a company name or stock symbol to find stocks you're interested in.
          </p>
        </div>
      </main>
    </div>
  )
}
