"use client";

import * as React from "react";
import { IconArrowRight, IconCheck, IconHelpCircle, IconX } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const QUESTIONS = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  text: `Câu hỏi ${index + 1}: Đâu là ý chính của bài học này?`,
  options: [
    "Hiểu khái niệm và áp dụng từng bước",
    "Bỏ qua lý thuyết và làm nhanh",
    "Chỉ xem video không thực hành",
    "Không cần kiểm tra kết quả",
  ],
  correctAnswer: 0,
}));

export function LessonQuiz() {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const question = QUESTIONS[currentIdx];

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  return (
    <Card className="overflow-hidden rounded-2xl border-zinc-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="space-y-8 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Bài kiểm tra
            </h3>
            <p className="text-2xl font-black text-zinc-950 dark:text-zinc-50">
              Kiến thức bài học
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-zinc-950 dark:text-zinc-50">
              {currentIdx + 1}
            </span>
            <span className="font-bold text-zinc-300"> / {QUESTIONS.length}</span>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-lg font-bold leading-relaxed text-zinc-800 dark:text-zinc-100">
            {question.text}
          </p>

          <div className="grid gap-3">
            {question.options.map((option, idx) => {
              const isCorrect = idx === question.correctAnswer;
              const isSelected = idx === selectedOption;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => !isSubmitted && setSelectedOption(idx)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl border-2 p-5 text-left transition-colors",
                    !isSubmitted && isSelected && "border-primary bg-primary/5",
                    !isSubmitted &&
                      !isSelected &&
                      "border-zinc-100 bg-white hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950",
                    isSubmitted && isCorrect && "border-emerald-500 bg-emerald-50",
                    isSubmitted && isSelected && !isCorrect && "border-rose-500 bg-rose-50",
                    isSubmitted && !isSelected && !isCorrect && "opacity-40",
                  )}
                >
                  <span className="font-bold text-zinc-700 dark:text-zinc-100">
                    {option}
                  </span>
                  {isSubmitted && isCorrect ? (
                    <IconCheck className="text-emerald-500" size={20} />
                  ) : null}
                  {isSubmitted && isSelected && !isCorrect ? (
                    <IconX className="text-rose-500" size={20} />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-zinc-400">
            <IconHelpCircle size={16} className="text-zinc-300" />
            <span>Chọn 1 câu trả lời đúng</span>
          </div>
          {!isSubmitted ? (
            <Button
              disabled={selectedOption === null}
              onClick={() => setIsSubmitted(true)}
            >
              Gửi câu trả lời
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Câu tiếp theo
              <IconArrowRight size={18} />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
