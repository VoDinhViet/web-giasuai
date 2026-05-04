"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { LessonCurriculums } from "./LessonCurriculums";

interface LessonNavigationProps {
  curriculum: any[];
  activeLessonId: string;
}

export function LessonNavigation({ curriculum, activeLessonId }: LessonNavigationProps) {
  return (
    <Sidebar collapsible="none" className="w-[300px] border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <SidebarHeader className="p-5 pb-2">
        <h2 className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
          Nội dung học tập
        </h2>
        <p className="text-[10px] text-zinc-400 font-medium mt-1 uppercase tracking-wider">
          Curriculum
        </p>
      </SidebarHeader>
      <SidebarContent className="p-3 no-scrollbar">
        <LessonCurriculums curriculum={curriculum} activeLessonId={activeLessonId} />
      </SidebarContent>
    </Sidebar>
  );
}
