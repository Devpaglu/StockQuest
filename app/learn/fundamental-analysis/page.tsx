// /app/learn/fundamental-analysis/page.tsx
"use client"; // Required for useState

import { useState } from "react"; // Import useState
import { Badge } from "@/components/ui/badge" // Assumed component
import { Button } from "@/components/ui/button" // Assumed component
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card" // Assumed component
import { Progress } from "@/components/ui/progress" // Assumed component
import { ExternalLink, PlayCircle, ArrowLeft, CheckCircle, RotateCcw } from "lucide-react" // Added CheckCircle, RotateCcw
import Link from "next/link"
import { SiteLayout } from "@/components/site-layout";

// Lesson data - updated for Fundamental Analysis
const lessons = [
    { id: 1, title: "Financial Statements", description: "Learn how to analyze company financial statements to evaluate investment potential.", duration: "30 min", topics: [{ title: "Balance Sheet Analysis", link: "https://youtu.be/pflmPkogzCw?si=bgTbYgGBMYjvMoB6" }, { title: "Income Statement Breakdown", link: "https://youtu.be/hrSUq4wcd0g?si=6LpxuR4QJpqU9p9A" }, { title: "Cash Flow Statement Insights", link: "https://youtu.be/b41Jo8CtQec?si=E9-jlczHnvR_8NmS" }] },
    { id: 2, title: "Valuation Metrics", description: "Understand key valuation metrics to determine if a stock is overvalued or undervalued.", duration: "25 min", topics: [{ title: "Price-to-Earnings (P/E) Ratio", link: "https://youtu.be/ccLPqIzh0CU?si=jJwbM19i_DjrYvxD" }, { title: "Price-to-Book (P/B) Ratio", link: "https://youtu.be/-6Z1ISvWq1U?si=qH43PTJ54ybeBhrh" }, { title: "Discounted Cash Flow (DCF)", link: "https://youtu.be/Ey1pFRfbgho?si=T96U4GgBw44o0-EB" }] },
    { id: 3, title: "Industry Analysis", description: "Learn how to evaluate industry trends and competitive positioning.", duration: "20 min", topics: [{ title: "Porter's Five Forces", link: "https://youtu.be/Dfp23xSqpdk?si=bCrGpIHns3JO12Wn" }, { title: "SWOT Analysis", link: "https://youtu.be/I_6AVRGLXGA?si=dslAH0cb_p5UvzWW" }, { title: "Market Share Analysis", link: "https://youtu.be/sx8sBN2prAE?si=knI9uO83fiO8NAtL" }] },
    { id: 4, title: "Economic Indicators", description: "Understand how macroeconomic factors influence stock performance and valuations.", duration: "15 min", topics: [{ title: "GDP and Economic Growth", link: "https://youtu.be/YO6bMfkiAEw?si=zAqGyKJ1I2rgmvgr" }, { title: "Interest Rates and Inflation", link: "https://youtu.be/R8VBRCs2jTU?si=Rf5PQ6EpA0dWvRmZ" }, { title: "Employment Data", link: "https://youtu.be/DPMpgYtOrZ8?si=tLpUGv9nnDzwuFSN" }] },
];


export default function FundamentalAnalysisPage() {
 // State to track completed lesson IDs
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<number>>(new Set());

  const totalLessons = lessons.length;
  const completedLessons = completedLessonIds.size;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0; // Rounded percentage

  // Function to toggle lesson completion status
  const toggleLessonCompletion = (lessonId: number) => {
    setCompletedLessonIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId); // Mark as incomplete
      } else {
        newSet.add(lessonId); // Mark as complete
      }
      return newSet;
    });
  };


  return (
    <SiteLayout> {/* Assumed component */}
      <div className="mb-6 md:mb-8">
         <Button variant="outline" size="sm" asChild className="mb-4">
           <Link href="/learn">
             <ArrowLeft className="w-4 h-4 mr-2" />
             Back to Learning Path
           </Link>
        </Button>
        <div className="flex flex-col items-start justify-between gap-2 mb-3 md:flex-row md:items-center md:gap-4">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Fundamental Analysis</h1>
          {/* Optional Badge based on progress */}
           {progressPercentage === 100 ? (
             <Badge variant="default" className="px-3 py-1 text-xs bg-green-600 hover:bg-green-700 md:text-sm">Completed</Badge>
           ) : progressPercentage > 0 ? (
             <Badge variant="outline" className="px-3 py-1 text-xs md:text-sm">In Progress</Badge>
           ) : (
              <Badge variant="outline" className="px-3 py-1 text-xs md:text-sm">Not Started</Badge>
           )}
        </div>
        <p className="text-muted-foreground">Learn how to evaluate a company's financial health and intrinsic value.</p>
         {/* Progress Bar - reflects state */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex-1">
            <Progress value={progressPercentage} className="h-2 bg-muted" />
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
            <span>{completedLessons}/{totalLessons} lessons completed ({progressPercentage}%)</span>
          </div>
        </div>
      </div>

      {/* Lesson Cards Grid - Updated to match BasicsOfInvestingPage layout */}
       <div className="grid gap-4 md:gap-6 md:grid-cols-2"> {/* Changed grid layout */}
        {lessons.map((lesson) => {
           const isCompleted = completedLessonIds.has(lesson.id);
           return (
              <Card key={lesson.id} className={`flex flex-col overflow-hidden border bg-card ${isCompleted ? 'border-green-400' : 'border-border'}`}>
                <CardHeader className="relative pb-2">
                   {/* Completion Badge */}
                   {isCompleted && (
                     <div className="absolute right-4 top-4">
                       <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-300 md:text-sm">
                         <CheckCircle className="w-3 h-3 mr-1" />
                         Completed
                       </Badge>
                     </div>
                   )}
                  <CardTitle className="pr-16 text-lg font-semibold md:text-xl md:pr-20">{lesson.title}</CardTitle>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <PlayCircle className="w-4 h-4 mr-1" />
                    {lesson.duration} lesson
                  </div>
                </CardHeader>
                <CardContent className="flex-grow pt-2 pb-4 md:pt-3 md:pb-5">
                  <p className="mb-3 text-sm md:mb-4 text-muted-foreground">{lesson.description}</p>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Topics:</h3>
                    <ul className="space-y-1.5">
                      {lesson.topics.map((topic, index) => (
                        <li key={index} className="text-sm">
                          <Link
                            href={topic.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-foreground hover:text-primary transition-colors group"
                          >
                            <ExternalLink className="w-3 h-3 mr-1.5 shrink-0 group-hover:text-primary" />
                            <span className="truncate">{topic.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className={`px-4 py-3 border-t md:px-6 md:py-4 ${isCompleted ? 'bg-green-50/50' : 'bg-muted/30'}`}>
                  {/* Toggle Button */}
                   <Button
                      variant={isCompleted ? "secondary" : "default"}
                      size="sm"
                      className="w-full"
                      onClick={() => toggleLessonCompletion(lesson.id)}
                   >
                     {isCompleted ? (
                       <>
                         <RotateCcw className="w-4 h-4 mr-2" /> Mark as Incomplete
                       </>
                     ) : (
                       <>
                         <CheckCircle className="w-4 h-4 mr-2" /> Mark as Completed
                       </>
                     )}
                   </Button>
                </CardFooter>
              </Card>
           )}
        )}
      </div>
    </SiteLayout>
  )
}// /app/learn/fundamental-analysis/page.tsx
