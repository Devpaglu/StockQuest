import { DashboardNav } from "@/components/dashboard-nav" // Assumed component
import { Card, CardContent } from "@/components/ui/card" // Assumed component
import { Button } from "@/components/ui/button" // Assumed component
import { Badge } from "@/components/ui/badge" // Assumed component
import { BookOpen, PlayCircleIcon } from "lucide-react" // Removed LockIcon
import Link from "next/link"

export default function LearnPage() {
  // Note: Progress for each module shown here (0/4) would ideally update
  // based on persistent state later, but visually they start unlocked.
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNav /> {/* Assumed component */}

      <main className="container flex-1 px-4 py-8 mx-auto">
        <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
          <h1 className="text-3xl font-bold tracking-tight">Learn to Trade</h1>
          <div className="flex items-center gap-2 px-4 py-1 text-sm rounded-full bg-purple-100 text-purple-800 md:text-base">
            <BookOpen className="w-4 h-4 md:h-5 md:w-5" />
            <span className="font-semibold">0 XP</span>
            {/* Optional level indicator */}
          </div>
        </div>

        {/* Learning Modules - All Unlocked */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Basics of Investing Card */}
          <Card className="overflow-hidden border border-border bg-card">
            <div className="h-1.5 md:h-2 bg-muted" /> {/* 0% progress */}
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col items-start justify-between gap-2 mb-3 md:flex-row md:items-center md:gap-4">
                <h3 className="text-lg font-bold md:text-xl">Basics of Investing</h3>
                {/* Changed from Locked/Completed to Not Started */}
                <Badge variant="outline" className="text-xs md:text-sm">Not Started</Badge>
              </div>
              <p className="mb-4 text-sm text-muted-foreground md:mb-6 md:text-base">
                Learn the fundamentals of investing and how the stock market works.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="flex items-center justify-center w-6 h-6 rounded-full md:w-8 md:h-8 bg-muted">
                    <PlayCircleIcon className="w-4 h-4 text-muted-foreground md:h-5 md:w-5" />
                  </div>
                  {/* State here should reflect actual module progress eventually */}
                  <span className="text-xs font-medium md:text-sm">0/4 lessons</span>
                </div>
                 <Button asChild size="sm">
                  <Link href="/learn/basics-of-investing">Start</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Technical Analysis Card - Now Unlocked */}
          <Card className="overflow-hidden border border-border bg-card">
            <div className="h-1.5 md:h-2 bg-muted" /> {/* 0% progress */}
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col items-start justify-between gap-2 mb-3 md:flex-row md:items-center md:gap-4">
                <h3 className="text-lg font-bold md:text-xl">Technical Analysis</h3>
                 {/* Changed from Locked to Not Started */}
                <Badge variant="outline" className="text-xs md:text-sm">Not Started</Badge>
              </div>
              <p className="mb-4 text-sm text-muted-foreground md:mb-6 md:text-base">
                Learn how to analyze stock charts and identify patterns.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full md:w-8 md:h-8 bg-muted">
                     <PlayCircleIcon className="w-4 h-4 text-muted-foreground md:h-5 md:w-5" />
                  </div>
                   {/* State here should reflect actual module progress eventually */}
                  <span className="text-xs font-medium md:text-sm">0/4 lessons</span>
                </div>
                 {/* Changed from disabled Unlock to active Start */}
                 <Button asChild size="sm">
                  <Link href="/learn/technical-analysis">Start</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Fundamental Analysis Card - Now Unlocked */}
          <Card className="overflow-hidden border border-border bg-card">
             <div className="h-1.5 md:h-2 bg-muted" /> {/* 0% progress */}
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col items-start justify-between gap-2 mb-3 md:flex-row md:items-center md:gap-4">
                <h3 className="text-lg font-bold md:text-xl">Fundamental Analysis</h3>
                 {/* Changed from Locked to Not Started */}
                <Badge variant="outline" className="text-xs md:text-sm">Not Started</Badge>
              </div>
              <p className="mb-4 text-sm text-muted-foreground md:mb-6 md:text-base">
                Learn how to evaluate a company's financial health and potential.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full md:w-8 md:h-8 bg-muted">
                     <PlayCircleIcon className="w-4 h-4 text-muted-foreground md:h-5 md:w-5" />
                  </div>
                   {/* State here should reflect actual module progress eventually */}
                  <span className="text-xs font-medium md:text-sm">0/4 lessons</span>
                </div>
                 {/* Changed from disabled Unlock to active Start */}
                <Button asChild size="sm">
                  <Link href="/learn/fundamental-analysis">Start</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Challenges Section (Remains the same) */}
        <h2 className="mb-4 text-2xl font-bold">Daily Challenges</h2>
         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* ... (Challenge cards remain unchanged) ... */}
           <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-500"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold">Buy a stock in the Tech sector</h3>
                  <p className="mb-4 text-gray-500">Practice your trading skills by purchasing a technology stock.</p>
                  <Button className="bg-green-500 hover:bg-green-600">Complete for +50 XP</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-500"><path d="M2 20h.01M7 20v-4" /><path d="M12 20v-8" /><path d="M17 20V8" /><path d="M22 4v16" /></svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold">Complete a Technical Analysis lesson</h3>
                  <p className="mb-4 text-gray-500">Continue your learning journey with the next lesson.</p>
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