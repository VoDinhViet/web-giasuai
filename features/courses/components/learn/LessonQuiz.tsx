"use client";

import * as React from "react";
import { IconCheck, IconX, IconArrowRight, IconHelpCircle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const MOCK_QUESTIONS: Question[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  text: `Câu hỏi ${i + 1}: Thành phần nào trong Next.js được sử dụng để quản lý layout của trang?`,
  options: ["layout.tsx", "page.tsx", "route.ts", "loading.tsx"],
  correctAnswer: 0,
}));

export function LessonQuiz() {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const question = MOCK_QUESTIONS[currentIdx];

  const handleNext = () => {
    if (currentIdx < MOCK_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  return (
    <Card className="rounded-2xl border border-zinc-100 bg-white overflow-hidden shadow-sm">
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">BÀI KIỂM TRA</h3>
            <p className="text-2xl font-black text-zinc-900">Kiến thức bài học</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-zinc-900">{currentIdx + 1}</span>
            <span className="text-zinc-300 font-bold"> / {MOCK_QUESTIONS.length}</span>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-lg font-bold text-zinc-800 leading-relaxed">
            {question.text}
          </p>

          <div className="grid gap-3">
            {question.options.map((option, idx) => {
              const isCorrect = idx === question.correctAnswer;
              const isSelected = idx === selectedOption;
              
              return (
                <button
                  key={idx}
                  onClick={() => !isSubmitted && setSelectedOption(idx)}
                  className={cn(
                    "w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all text-left",
                    !isSubmitted && isSelected && "border-zinc-900 bg-zinc-50",
                    !isSubmitted && !isSelected && "border-zinc-50 hover:border-zinc-200 bg-white",
                    isSubmitted && isCorrect && "border-emerald-500 bg-emerald-50",
                    isSubmitted && isSelected && !isCorrect && "border-rose-500 bg-rose-50",
                    isSubmitted && !isSelected && !isCorrect && "opacity-30 border-zinc-50"
                  )}
                >
                  <span className={cn(
                    "font-bold transition-colors",
                    isSelected ? "text-zinc-900" : "text-zinc-500"
                  )}>{option}</span>
                  {isSubmitted && isCorrect && <IconCheck className="text-emerald-500" size={20} />}
                  {isSubmitted && isSelected && !isCorrect && <IconX className="text-rose-500" size={20} />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-black uppercase tracking-wider">
            <IconHelpCircle size={16} className="text-zinc-200" />
            <span>Chọn 1 câu trả lời đúng</span>
          </div>
          {!isSubmitted ? (
            <Button 
              disabled={selectedOption === null}
              onClick={() => setIsSubmitted(true)}
              className="rounded-full font-black text-[10px] uppercase tracking-widest px-10 h-12 bg-zinc-900 hover:bg-zinc-800 text-white shadow-xl shadow-zinc-100"
            >
              Gửi câu trả lời
            </Button>
          ) : (
            <Button onClick={handleNext} className="rounded-full font-black text-[10px] uppercase tracking-widest px-10 h-12 bg-zinc-900 hover:bg-zinc-800 text-white shadow-xl shadow-zinc-100 gap-2">
              Câu tiếp theo
              <IconArrowRight size={18} />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
