"use client";

import * as React from "react";
import { IconCheck, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5 bg-zinc-100/50 p-1 rounded-2xl border border-zinc-200/50 backdrop-blur-sm">
      {steps.map((step, idx) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <React.Fragment key={step.id}>
            <div
              className={cn(
                "flex items-center gap-2.5 px-4 py-1.5 rounded-xl transition-all duration-500",
                isActive 
                  ? "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200" 
                  : "text-zinc-400"
              )}
            >
              <div
                className={cn(
                  "size-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500",
                  isCompleted ? "bg-emerald-500 text-white" : 
                  isActive ? "bg-zinc-900 text-white" : 
                  "bg-zinc-200 text-zinc-500"
                )}
              >
                {isCompleted ? <IconCheck size={12} stroke={4} /> : step.id}
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-500",
                isActive ? "opacity-100" : "opacity-40"
              )}>
                {step.title}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <IconChevronRight size={14} className="text-zinc-300 mx-0.5 opacity-50" stroke={3} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
