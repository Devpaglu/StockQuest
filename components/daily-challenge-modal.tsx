"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
// Updated import path:
import { Challenge } from "@/components/challenges"; // <-- Changed path
import { CheckCircle, XCircle } from "lucide-react";

interface DailyChallengeModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (isCorrect: boolean) => void;
}

export function DailyChallengeModal({
  challenge,
  isOpen,
  onOpenChange,
  onSubmit,
}: DailyChallengeModalProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedOption === null) {
      setError("Please select an answer.");
      return;
    }
    setError(null);

    const isCorrect = selectedOption === challenge.correctAnswerIndex;
    onSubmit(isCorrect);

    setSelectedOption(null);
    // Parent handles closing via onOpenChange being called through Dialog's internals or Cancel button
  };

  const handleModalOpenChange = (open: boolean) => {
        onOpenChange(open); // Inform parent
        if (!open) {
            setSelectedOption(null);
            setError(null);
        }
  }

  // Defend against challenge being null/undefined during initial render phases
  if (!challenge) {
      return null; // Or a loading indicator within the dialog if preferred
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleModalOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Daily Challenge</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <p className="font-medium">{challenge.question}</p>
          <RadioGroup
            value={selectedOption !== null ? String(selectedOption) : undefined}
            onValueChange={(value) => {
              setSelectedOption(Number(value));
              setError(null);
            }}
            className="space-y-2"
          >
            {challenge.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={String(index)} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Submit Answer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}