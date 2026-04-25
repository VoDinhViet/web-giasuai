"use client";

import { IconLock } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
}

interface Chapter {
  title: string;
  lessons: Lesson[];
}

interface LessonCurriculumsProps {
  curriculum: Chapter[];
  activeLessonId: string;
}

import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

export function LessonCurriculums({ curriculum, activeLessonId }: LessonCurriculumsProps) {
  return (
    <Accordion type="multiple" defaultValue={["item-0"]} className="w-full space-y-2">
      {curriculum.map((chapter, idx) => (
        <AccordionItem key={idx} value={`item-${idx}`} className="border-none">
          <AccordionTrigger className="hover:no-underline py-4 group">
            <div className="flex items-baseline gap-4 text-left">
              <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em] shrink-0">
                0{idx + 1}
              </span>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 leading-tight group-hover:text-zinc-600 transition-colors">
                {chapter.title}
              </h3>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="pb-6">
            <div className="ml-[1.1rem] pl-6 border-l border-zinc-100 space-y-6 pt-2">
              {chapter.lessons.map((lesson) => {
                const isActive = lesson.id === activeLessonId;
                return (
                  <div 
                    key={lesson.id} 
                    className={cn(
                      "relative group flex items-baseline justify-between gap-4 transition-colors",
                      lesson.isLocked ? "opacity-30 pointer-events-none" : "cursor-pointer"
                    )}
                  >
                    {/* Subtle Active Indicator Dot */}
                    {isActive && (
                      <div className="absolute -left-[1.85rem] top-[0.45rem] size-1.5 rounded-full bg-zinc-900" />
                    )}

                    <div className="flex flex-col gap-1">
                      <span className={cn(
                        "text-[13px] leading-snug transition-colors tracking-tight",
                        isActive ? "font-bold text-zinc-900" : "font-medium text-zinc-500 group-hover:text-zinc-800"
                      )}>
                        {lesson.title}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                          {lesson.duration}
                        </span>
                        {lesson.isCompleted && !isActive && (
                          <div className="size-1 rounded-full bg-emerald-500" />
                        )}
                      </div>
                    </div>

                    {lesson.isLocked && (
                      <IconLock size={12} className="text-zinc-300 shrink-0 mt-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
