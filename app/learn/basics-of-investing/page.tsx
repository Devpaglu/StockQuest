"use client";

import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, PlayCircle, ArrowLeft, CheckCircle, RotateCcw } from "lucide-react";
import Link from "next/link";

const lessons = [
    { id: 1, title: "Introduction to Investing", description: "Learn the fundamentals of investing and why it's important for your financial future.", duration: "18 min", topics: [{ title: "What is Investing?", link: "https://youtu.be/Epzr8azlxp8?si=xOozBpq3qTxaagsl" }, { title: "Types of Investment Vehicles", link: "https://youtu.be/WOCGvtP2I8M?si=c1Diaa2zbiJc99O4" }, { title: "Setting Investment Goals", link: "https://youtu.be/9xUBeTcDV-I?si=4j0t7YfauPHxyI1w" }] },
    { id: 2, title: "Risk and Return", description: "Understand the relationship between risk and return in different investment strategies.", duration: "20 min", topics: [{ title: "Understanding Risk Tolerance", link: "https://youtu.be/L91FRxNkglk?si=lhiQPpyAjhtvWqdr" }, { title: "Diversification Strategies", link: "https://youtu.be/ZDExLnS9IC0?si=3GVT1wgp6OF62f4A" }, { title: "Measuring Investment Returns", link: "https://youtu.be/TXoWg7ADz6Y?si=aWe3coGlWT_Umcol" }] },
    { id: 3, title: "Stock Market Basics", description: "Get familiar with how the stock market works and how to start investing in stocks.", duration: "25 min", topics: [{ title: "How Stock Markets Function", link: "https://youtu.be/p7HKvqRI_Bo?si=jsfqaYcCqjSGxaYZ" }, { title: "Reading Stock Quotes", link: "https://youtu.be/rbMyfXqnFx8?si=EfbTjw4XRRop7GUI" }, { title: "Market Indices Explained", link: "https://youtu.be/LxI12aUaabc?si=pgBBU0xPGqCZLx2P" }] },
    { id: 4, title: "Building Your First Portfolio", description: "Learn how to create a balanced investment portfolio that aligns with your goals.", duration: "32 min", topics: [{ title: "Asset Allocation Principles", link: "https://youtu.be/Z4ZK5UsCD1k?si=oM8Q1AGynhABZ87K" }, { title: "Long-term vs Short-term Investing", link: "https://youtu.be/l3_QY7UM8B0?si=c7ehKDe7rDqeuzCM" }, { title: "Rebalancing Strategies", link: "https://youtu.be/1d9G7Tvh9sQ?si=r8Kt-7W9QYzHyebv" }] },
];

export default function BasicsOfInvestingPage() {
    const [completedLessonIds, setCompletedLessonIds] = useState<Set<number>>(new Set());

    const totalLessons = lessons.length;
    const completedLessons = completedLessonIds.size;
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    const toggleLessonCompletion = (lessonId: number) => {
        setCompletedLessonIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(lessonId)) {
                newSet.delete(lessonId);
            } else {
                newSet.add(lessonId);
            }
            return newSet;
        });
    };

    return (
        <SiteLayout>
            <div className="mb-6 md:mb-8">
                <Button variant="outline" size="sm" asChild className="mb-4">
                    <Link href="/learn">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Learning Path
                    </Link>
                </Button>
                <div className="flex flex-col items-start justify-between gap-2 mb-3 md:flex-row md:items-center md:gap-4">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Basics of Investing</h1>
                    {progressPercentage === 100 ? (
                        <Badge variant="default" className="px-3 py-1 text-xs bg-green-600 hover:bg-green-700 md:text-sm">Completed</Badge>
                    ) : progressPercentage > 0 ? (
                        <Badge variant="outline" className="px-3 py-1 text-xs md:text-sm">In Progress</Badge>
                    ) : (
                        <Badge variant="outline" className="px-3 py-1 text-xs md:text-sm">Not Started</Badge>
                    )}
                </div>
                <p className="text-muted-foreground">Learn the fundamentals of investing and how the stock market works.</p>
                <div className="flex items-center gap-4 mt-4">
                    <div className="flex-1">
                        <Progress value={progressPercentage} className="h-2 bg-muted" />
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                        <span>{completedLessons}/{totalLessons} lessons completed ({progressPercentage}%)</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                {lessons.map((lesson) => {
                    const isCompleted = completedLessonIds.has(lesson.id);
                    return (
                        <Card key={lesson.id} className={`flex flex-col overflow-hidden border bg-card ${isCompleted ? 'border-green-400' : 'border-border'}`}>
                            <CardHeader className="relative pb-2">
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
                    );
                })}
            </div>
        </SiteLayout>
    );
}
