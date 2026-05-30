"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { LessonPlayer } from "./LessonPlayer";
import { LessonSimulation } from "./LessonSimulation";

interface LessonPracticeStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function LessonPracticeStep({
  onNext,
  onBack,
}: LessonPracticeStepProps) {
  return (
    <div className="animate-in fade-in space-y-12 duration-500">
      <div className="space-y-3">
        <h2 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
          Bài giảng và thực hành
        </h2>
        <p className="text-lg leading-relaxed text-zinc-500">
          Xem hướng dẫn và áp dụng ngay vào môi trường mô phỏng bên dưới.
        </p>
      </div>

      <div className="space-y-12">
        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
            1. Video bài giảng
          </h3>
          <LessonPlayer title="Tổng quan bài học" />
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
            2. Mô phỏng tương tác
          </h3>
          <LessonSimulation />
        </section>
      </div>

      <div className="flex items-center justify-between border-t border-zinc-100 pt-10 dark:border-zinc-800">
        <Button variant="ghost" onClick={onBack}>
          <IconChevronLeft size={16} />
          Quay lại lý thuyết
        </Button>
        <Button onClick={onNext}>
          Làm bài tập
          <IconChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
}
