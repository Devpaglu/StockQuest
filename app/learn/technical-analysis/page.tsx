// /app/learn/technical-analysis/page.tsx
"use client"; // Required for useState

import { useState } from "react"; // Import useState
import { SiteLayout } from "@/components/site-layout" // Assumed component
import { Badge } from "@/components/ui/badge" // Assumed component
import { Button } from "@/components/ui/button" // Assumed component
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card" // Assumed component
import { Progress } from "@/components/ui/progress" // Assumed component
import { ExternalLink, PlayCircle, ArrowLeft, CheckCircle, RotateCcw } from "lucide-react" // Added CheckCircle, RotateCcw
import Link from "next/link"

// Lesson data - updated for Technical Analysis
const lessons = [
    { id: 1, title: "Chart Patterns", description: "Learn to identify and interpret common chart patterns for trading decisions.", duration: "20 min", topics: [{ title: "Support and Resistance Levels", link: "https://youtu.be/r2LzjTUs3lo?si=UP2B-Z4POb053lCp" }, { title: "Head and Shoulders Pattern", link: "https://youtu.be/QBlGGL5cyt8?si=li71oZJuS1JBH53Z" }, { title: "Triangle Patterns", link: "https://youtu.be/U4qs-5uIxjc?si=EPphWijBrOk7Lf1w" }] },
    { id: 2, title: "Technical Indicators", description: "Master the use of technical indicators to analyze market trends and momentum.", duration: "25 min", topics: [{ title: "Moving Averages", link: "https://youtu.be/7ASY4PtZUTQ?si=j5WlFWW66aL07084" }, { title: "RSI and MACD", link: "https://youtu.be/hh3BKTFE1dc?si=KzewdM35g6Zzfikh" }, { title: "Bollinger Bands", link: "https://youtu.be/KTw4clbARE8?si=voZRJkfmZyppnuyd" }] },
    { id: 3, title: "Candlestick Analysis", description: "Understand how to read and interpret candlestick charts for market insights.", duration: "20 min", topics: [{ title: "Basic Candlestick Patterns", link: "https://youtu.be/tW13N4Hll88?si=K2CZqsCEfcPTZgDb" }, { title: "Doji Patterns", link: "https://youtu.be/Go-YkNHZwa4?si=kcl-8zDTpi6Tfee9" }, { title: "Multiple Candlestick Patterns", link: "https://youtu.be/yP83rD7DjTg?si=u_cBXKoEWX2brR7B" }] },
    { id: 4, title: "Volume Analysis", description: "Learn how trading volume can confirm trends and signal potential reversals.", duration: "15 min", topics: [{ title: "Volume Price Relationship", link: "https://youtu.be/IuCIjXMX1Ss?si=Y-z_CaWsMQYDpllm" }, { title: "On-Balance Volume (OBV)", link: "https://youtu.be/UfJ1HpzLmdk?si=pofZZZs2mRQzUJr-" }, { title: "Volume Profile Analysis", link: "https://youtu.be/CrHdBH6yBJ8?si=bYrLJfqb7BAyBrcS" }] },
];

export default function TechnicalAnalysisPage() {
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
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Technical Analysis</h1>
           {/* Optional Badge based on progress */}
           {progressPercentage === 100 ? (
             <Badge variant="default" className="px-3 py-1 text-xs bg-green-600 hover:bg-green-700 md:text-sm">Completed</Badge>
           ) : progressPercentage > 0 ? (
             <Badge variant="outline" className="px-3 py-1 text-xs md:text-sm">In Progress</Badge>
           ) : (
              <Badge variant="outline" className="px-3 py-1 text-xs md:text-sm">Not Started</Badge>
           )}
        </div>
        <p className="text-muted-foreground">Learn how to analyze stock charts, identify patterns, and use indicators.</p>
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
}