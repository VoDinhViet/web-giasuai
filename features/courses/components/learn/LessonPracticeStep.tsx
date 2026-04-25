"use client";

import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { LessonPlayer } from "./LessonPlayer";
import { LessonSimulation } from "./LessonSimulation";

interface LessonPracticeStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function LessonPracticeStep({ onNext, onBack }: LessonPracticeStepProps) {
  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div className="space-y-4">
        <h2 className="text-3xl font-black tracking-tight text-zinc-900">Bài giảng & Thực hành</h2>
        <p className="text-zinc-500 text-lg leading-relaxed">Xem hướng dẫn và áp dụng ngay vào môi trường mô phỏng bên dưới.</p>
      </div>
      
      <div className="space-y-20">
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">1. Video bài giảng</h3>
          <div className="rounded-2xl overflow-hidden border border-zinc-100 bg-zinc-50">
            <LessonPlayer title="Tổng quan về khóa học" />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">2. Mô phỏng Code</h3>
          <div className="border border-zinc-100 rounded-2xl overflow-hidden shadow-sm">
            <LessonSimulation />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-12 border-t border-zinc-100">
        <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-2">
          <IconChevronLeft size={16} />
          Quay lại lý thuyết
        </button>
        <Button onClick={onNext} className="rounded-full px-10 h-14 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest gap-3 shadow-lg shadow-zinc-100">
          Làm bài tập
          <IconChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
}
