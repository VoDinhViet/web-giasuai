"use client";

import { IconLock, IconCheck, IconPlayerPlay } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { 
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

/* ─── Types ─────────────────────────────────────────────────────────────── */

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

/* ─── Sub-Components ────────────────────────────────────────────────────── */

const ChapterHeader = ({ index, title }: { index: number; title: string }) => (
  <div className="flex items-center gap-2 px-2 mb-2">
    <span className="text-[10px] font-bold text-zinc-300 dark:text-zinc-700 uppercase tracking-tighter">
      {index + 1 < 10 ? `0${index + 1}` : index + 1}
    </span>
    <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-tight dark:text-zinc-100">
      {title}
    </h3>
  </div>
);

const LessonItem = ({ 
  lesson, 
  isActive 
}: { 
  lesson: Lesson; 
  isActive: boolean 
}) => (
  <SidebarMenuSubItem className="px-1">
    <SidebarMenuSubButton
      isActive={isActive}
      className={cn(
        "h-auto py-2.5 px-3 rounded-md transition-all duration-200 border",
        lesson.isLocked ? "opacity-30 pointer-events-none" : "cursor-pointer",
        isActive 
          ? "bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900 shadow-sm" 
          : "bg-white border-zinc-100 text-zinc-600 hover:bg-zinc-100 hover:border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
      )}
    >
      <div className="flex flex-col gap-0.5 min-w-0 pr-2">
        <div className="flex items-center gap-2">
          {isActive ? (
            <IconPlayerPlay size={10} stroke={3} className="fill-current" />
          ) : (
            lesson.isCompleted && <IconCheck size={12} stroke={3} className="text-emerald-500" />
          )}
          <span className={cn(
            "text-[12.5px] leading-snug transition-colors tracking-tight line-clamp-1",
            isActive ? "font-bold" : "font-semibold"
          )}>
            {lesson.title}
          </span>
        </div>
        <span className={cn(
          "text-[10px] font-medium",
          isActive ? "text-white/60 dark:text-zinc-900/60" : "text-zinc-400"
        )}>
          {lesson.duration}
        </span>
      </div>

      {lesson.isLocked && !isActive && (
        <IconLock size={12} stroke={1.5} className="ml-auto text-zinc-300" />
      )}
    </SidebarMenuSubButton>
  </SidebarMenuSubItem>
);

/* ─── Main Component ────────────────────────────────────────────────────── */

export function LessonCurriculums({ curriculum, activeLessonId }: LessonCurriculumsProps) {
  return (
    <SidebarGroup className="p-0">
      <SidebarGroupContent>
        <SidebarMenu className="gap-4">
          {curriculum.map((chapter, idx) => (
            <SidebarMenuItem key={idx}>
              <ChapterHeader index={idx} title={chapter.title} />
              
              <SidebarMenuSub className="ml-0 border-none space-y-0.5">
                {chapter.lessons.map((lesson) => (
                  <LessonItem 
                    key={lesson.id} 
                    lesson={lesson} 
                    isActive={lesson.id === activeLessonId} 
                  />
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
