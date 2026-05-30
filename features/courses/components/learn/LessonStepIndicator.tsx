"use client";

import { cn } from "@/lib/utils";

interface LessonStepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

export function LessonStepIndicator({
  steps,
  currentStep,
  onStepClick,
}: LessonStepIndicatorProps) {
  return (
    <div className="no-scrollbar flex items-center gap-8 overflow-x-auto border-b border-zinc-100 pb-6 dark:border-zinc-800">
      {steps.map((step, idx) => {
        const isActive = currentStep === idx;

        return (
          <button
            key={step}
            type="button"
            onClick={() => onStepClick(idx)}
            className="group relative flex items-center gap-3 whitespace-nowrap outline-none"
          >
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-[10px] font-black transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-zinc-100 text-zinc-400 group-hover:text-zinc-600 dark:bg-zinc-900",
              )}
            >
              {idx + 1}
            </div>
            <span
              className={cn(
                "text-xs font-bold uppercase tracking-[0.14em] transition-colors",
                isActive
                  ? "text-primary"
                  : "text-zinc-400 group-hover:text-zinc-600",
              )}
            >
              {step}
            </span>
            {isActive ? (
              <div className="absolute -bottom-[25px] left-0 right-0 h-[3px] rounded-full bg-primary" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
