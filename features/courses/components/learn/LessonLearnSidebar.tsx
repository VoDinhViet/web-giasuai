"use client";

import Link from "next/link";
import type { Route } from "next";
import {
  IconBook2,
  IconCheck,
  IconClock,
  IconLock,
  IconPlayerPlay,
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export interface LessonLearnSidebarLesson {
  id: string;
  title: string;
  durationText: string;
  position: number;
  isCompleted: boolean;
  isLocked: boolean;
}

export interface LessonLearnSidebarChapter {
  id: string;
  title: string;
  totalLessons: number;
  totalDurationText?: string;
  lessons: LessonLearnSidebarLesson[];
}

interface LessonLearnSidebarProps {
  courseId: string;
  curriculum: LessonLearnSidebarChapter[];
  activeLessonId: string;
  totalLessons: number;
  totalDurationText?: string;
}

export function LessonLearnSidebar({
  courseId,
  curriculum,
  activeLessonId,
  totalLessons,
  totalDurationText,
}: LessonLearnSidebarProps) {
  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
    >
      <SidebarHeader className="border-b border-zinc-200 p-5 dark:border-zinc-800">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <IconBook2 size={20} />
          </div>
          <div className="min-w-0 space-y-1">
            <h2 className="text-[13px] font-black uppercase tracking-[0.16em] text-primary">
              Nội dung học tập
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-zinc-500">
              <span>{totalLessons} bài học</span>
              {totalDurationText ? (
                <span className="inline-flex items-center gap-1">
                  <IconClock size={12} />
                  {totalDurationText}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {curriculum.map((chapter, index) => (
          <SidebarGroup key={chapter.id} className="px-2 py-3">
            <SidebarGroupLabel className="h-auto items-start px-1 pb-2 text-[10px] leading-5">
              <span className="mr-2 text-zinc-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="line-clamp-2">{chapter.title}</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1 px-0">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    size="sm"
                    className="h-8 cursor-default text-[11px] text-zinc-500 hover:bg-transparent hover:text-zinc-500"
                  >
                    <IconBook2 size={14} />
                    <span>
                      {chapter.totalLessons} bài
                      {chapter.totalDurationText
                        ? ` • ${chapter.totalDurationText}`
                        : ""}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuSub className="ml-3 border-l border-zinc-200 pl-3 dark:border-zinc-800">
                  {chapter.lessons.map((lesson) => (
                    <LessonLearnSidebarItem
                      key={lesson.id}
                      courseId={courseId}
                      lesson={lesson}
                      isActive={lesson.id === activeLessonId}
                    />
                  ))}
                </SidebarMenuSub>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

function LessonLearnSidebarItem({
  courseId,
  lesson,
  isActive,
}: {
  courseId: string;
  lesson: LessonLearnSidebarLesson;
  isActive: boolean;
}) {
  const href = `/courses/${courseId}/learn/${lesson.id}` as Route;

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        asChild={!lesson.isLocked}
        isActive={isActive}
        className={cn(
          "h-auto min-h-12 items-start rounded-lg px-3 py-2",
          isActive &&
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
          lesson.isLocked && "cursor-not-allowed opacity-50",
        )}
      >
        {lesson.isLocked ? (
          <LessonItemContent lesson={lesson} isActive={isActive} />
        ) : (
          <Link href={href}>
            <LessonItemContent lesson={lesson} isActive={isActive} />
          </Link>
        )}
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

function LessonItemContent({
  lesson,
  isActive,
}: {
  lesson: LessonLearnSidebarLesson;
  isActive: boolean;
}) {
  return (
    <>
      <div
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold",
          isActive
            ? "border-primary-foreground/30 bg-primary-foreground/15 text-primary-foreground"
            : "border-zinc-200 bg-white text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950",
        )}
      >
        {isActive ? (
          <IconPlayerPlay size={11} fill="currentColor" />
        ) : lesson.isCompleted ? (
          <IconCheck size={12} className="text-emerald-500" />
        ) : lesson.isLocked ? (
          <IconLock size={11} />
        ) : (
          lesson.position
        )}
      </div>
      <span className="min-w-0 flex-1 space-y-1">
        <span className="line-clamp-2 text-[13px] font-semibold leading-5">
          {lesson.title}
        </span>
        <span
          className={cn(
            "block text-[11px] font-medium",
            isActive ? "text-primary-foreground/70" : "text-zinc-400",
          )}
        >
          {lesson.durationText || "Chưa có thời lượng"}
        </span>
      </span>
    </>
  );
}
