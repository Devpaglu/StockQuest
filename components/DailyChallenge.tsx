"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DailyChallengeModal } from "@/components/daily-challenge-modal";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Challenge, getDailyChallenge, getTodayDateStringIST } from "@/components/challenges";

const DailyChallenge = () => {
  const [challengeState, setChallengeState] = useState<'loading' | 'pending' | 'completed'>('loading');
  const [dailyChallenge, setDailyChallenge] = useState<Challenge | null>(null);
  const [challengeResult, setChallengeResult] = useState<'correct' | 'incorrect' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        const today = getTodayDateStringIST();
        const completedDate = localStorage.getItem("dailyChallengeCompletedDate");
        const result = localStorage.getItem("dailyChallengeResult");

        if (completedDate === today && result) {
          setChallengeState("completed");
          setChallengeResult(result as 'correct' | 'incorrect');
        } else {
          const challenge = await getDailyChallenge(new Date());
          setDailyChallenge(challenge);
          setChallengeState("pending");
        }
      } catch (error) {
        console.error("Failed to load challenge:", error);
        setChallengeState("pending"); // Still allow retry
      }
    };

    loadChallenge();
  }, []);

  const handleChallengeSubmit = (isCorrect: boolean) => {
    const result = isCorrect ? "correct" : "incorrect";
    try {
      localStorage.setItem("dailyChallengeCompletedDate", getTodayDateStringIST());
      localStorage.setItem("dailyChallengeResult", result);
    } catch (error) {
      console.error("Failed to save result to localStorage:", error);
    }
    setChallengeResult(result);
    setChallengeState("completed");
    setIsModalOpen(false);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Daily Challenge</h2>
          <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
        </div>

        <div className="space-y-3">
          {challengeState === "loading" && (
            <div className="flex items-center justify-center text-gray-500">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading Challenge...
            </div>
          )}

          {challengeState === "pending" && dailyChallenge && (
            <>
              <p className="text-sm text-gray-600">Test your knowledge!</p>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600"
                onClick={() => setIsModalOpen(true)}
              >
                Take Today's Challenge
              </Button>

              {isModalOpen && (
                <DailyChallengeModal
                  challenge={dailyChallenge}
                  isOpen={isModalOpen}
                  onOpenChange={setIsModalOpen}
                  onSubmit={handleChallengeSubmit}
                />
              )}
            </>
          )}

          {challengeState === "completed" && (
            <div className="text-center p-4 border rounded-lg bg-gray-50">
              <p className="font-semibold mb-2">Challenge Completed Today!</p>
              {challengeResult === "correct" ? (
                <div className="flex items-center justify-center text-green-600">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  <span>You answered correctly!</span>
                </div>
              ) : challengeResult === "incorrect" ? (
                <div className="flex items-center justify-center text-red-600">
                  <XCircle className="mr-2 h-5 w-5" />
                  <span>You answered incorrectly. Try again tomorrow!</span>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Result not recorded.</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyChallenge;
