"use client";

import { IconChevronLeft } from "@tabler/icons-react";
import { LessonQuiz } from "./LessonQuiz";

interface LessonQuizStepProps {
  onBack: () => void;
}

export function LessonQuizStep({ onBack }: LessonQuizStepProps) {
  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-black tracking-tight text-zinc-900">Bài tập củng cố</h2>
        <p className="text-zinc-500 text-lg leading-relaxed">Vượt qua bài trắc nghiệm này để hoàn thành bài học.</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <LessonQuiz />
      </div>
      <div className="flex justify-start pt-12 border-t border-zinc-100">
        <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-2">
          <IconChevronLeft size={16} />
          Quay lại thực hành
        </button>
      </div>
    </div>
  );
}
