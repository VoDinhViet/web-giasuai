"use client";

import { cn } from "@/lib/utils";

interface LessonStepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

export function LessonStepIndicator({ steps, currentStep, onStepClick }: LessonStepIndicatorProps) {
  return (
    <div className="flex items-center gap-12 mb-20 border-b border-zinc-100 pb-6 overflow-x-auto no-scrollbar">
      {steps.map((step, idx) => {
        const isActive = currentStep === idx;
        return (
          <button
            key={idx}
            onClick={() => onStepClick(idx)}
            className="group relative flex items-center gap-4 transition-all duration-500 outline-none whitespace-nowrap"
          >
            {/* Index Glow Circle */}
            <div className={cn(
              "size-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500",
              isActive 
                ? "bg-primary text-white shadow-xl shadow-primary/20 scale-110" 
                : "bg-zinc-50 text-zinc-300 group-hover:bg-zinc-100 group-hover:text-zinc-500"
            )}>
              {idx + 1}
            </div>

            <span className={cn(
              "text-xs font-bold uppercase tracking-[0.15em] transition-all duration-500",
              isActive 
                ? "text-primary translate-x-1" 
                : "text-zinc-400 group-hover:text-zinc-600"
            )}>
              {step}
            </span>

            {/* Vibrant Primary Indicator */}
            {isActive && (
              <div className="absolute -bottom-[25px] left-0 right-0 h-[3px] bg-primary rounded-full shadow-[0_4px_12px_rgba(var(--primary),0.3)] animate-in fade-in zoom-in duration-700" />
            )}
          </button>
        );
      })}
    </div>
  );
}
