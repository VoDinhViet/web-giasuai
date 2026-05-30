"use client";

import { IconChevronLeft } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { LessonQuiz } from "./LessonQuiz";

interface LessonQuizStepProps {
  onBack: () => void;
}

export function LessonQuizStep({ onBack }: LessonQuizStepProps) {
  return (
    <div className="animate-in fade-in space-y-12 duration-500">
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <h2 className="text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
          Bài tập củng cố
        </h2>
        <p className="text-lg leading-relaxed text-zinc-500">
          Vượt qua bài trắc nghiệm này để hoàn thành bài học.
        </p>
      </div>
      <div className="mx-auto max-w-3xl">
        <LessonQuiz />
      </div>
      <div className="border-t border-zinc-100 pt-10 dark:border-zinc-800">
        <Button variant="ghost" onClick={onBack}>
          <IconChevronLeft size={16} />
          Quay lại thực hành
        </Button>
      </div>
    </div>
  );
}
