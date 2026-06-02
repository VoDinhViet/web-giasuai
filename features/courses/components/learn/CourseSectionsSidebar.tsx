"use client";

import Link from "next/link";
import type { Route } from "next";
import { useParams } from "next/navigation";
import { IconBook2, IconLock, IconPlayerPlay } from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { CourseLesson } from "@/features/courses/types/course-lesson.type";
import type { CourseSectionWithLessons } from "@/features/courses/types/course-section.type";

interface CourseSectionsSidebarProps {
  courseId: string;
  courseSections: CourseSectionWithLessons[];
  totalLessons: number;
}

export function CourseSectionsSidebar({
  courseId,
  courseSections,
  totalLessons,
}: CourseSectionsSidebarProps) {
  const params = useParams();
  const activeLessonId = params.lessonId as string;

  const renderSectionTitle = (title: string) => {
    const parts = title.split(/[:\-]/);
    if (parts.length > 1) {
      const prefix = parts[0].trim();
      const mainTitle = parts.slice(1).join(":").trim();
      return (
        <div className="flex w-full flex-col gap-1 pr-2 text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">
            {prefix}
          </span>
          <span className="text-[12px] font-bold uppercase leading-4 text-sidebar-foreground/55">
            {mainTitle}
          </span>
        </div>
      );
    }
    return (
      <span className="text-[12px] font-bold uppercase leading-4 text-sidebar-foreground/55">
        {title}
      </span>
    );
  };

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-sidebar-border/40">
      <SidebarHeader className="border-b border-sidebar-border/30 p-4">
        <div className="flex items-center gap-3 rounded-lg px-1 py-1.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
            <IconBook2 className="size-5" />
          </div>
          <div className="min-w-0 space-y-1">
            <h2 className="truncate text-sm font-bold text-sidebar-foreground">
              Nội dung học tập
            </h2>
            <span className="block text-xs font-semibold text-sidebar-foreground/55">
              {totalLessons} bài học lý thuyết
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        {getSortedSections(courseSections).map((section) => (
          <SidebarGroup key={section.id} className="py-3 first:pt-1">
            <SidebarGroupLabel className="h-auto min-h-9 select-none px-0 py-1.5 leading-relaxed">
              {renderSectionTitle(section.title)}
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-1">
              <SidebarMenu className="gap-2 px-0">
                <SidebarMenuSub className="mx-3 gap-2 border-l border-sidebar-border/45 py-1.5 pl-4">
                  {getSortedLessons(section.lessons).map((lesson) => (
                    <CourseLessonItem
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

interface CourseLessonItemProps {
  courseId: string;
  lesson: CourseLesson;
  isActive: boolean;
}

function CourseLessonItem({
  courseId,
  lesson,
  isActive,
}: CourseLessonItemProps) {
  const isLocked = false;
  const href = `/courses/${courseId}/learn/${lesson.id}` as Route;

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        asChild={!isLocked}
        isActive={isActive}
        size="sm"
        className={cn(
          "my-0.5 h-9 w-full justify-start gap-2.5 rounded-lg px-3 text-sidebar-foreground/80",
          "hover:bg-sidebar-accent/40 hover:text-sidebar-foreground",
          "data-[active=true]:rounded-l-none data-[active=true]:border-l-2 data-[active=true]:border-primary data-[active=true]:bg-primary/15 data-[active=true]:pl-2.5 data-[active=true]:font-bold data-[active=true]:text-primary"
        )}
      >
        {isLocked ? (
          <LessonItemContent lesson={lesson} isActive={isActive} isLocked />
        ) : (
          <Link href={href} className="w-full flex items-center gap-2.5">
            <LessonItemContent lesson={lesson} isActive={isActive} />
          </Link>
        )}
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

interface LessonItemContentProps {
  lesson: CourseLesson;
  isActive: boolean;
  isLocked?: boolean;
}

function LessonItemContent({
  lesson,
  isActive,
  isLocked = false,
}: LessonItemContentProps) {
  const Icon = isLocked ? IconLock : isActive ? IconPlayerPlay : IconBook2;

  return (
    <>
      <Icon
        className={cn(
          "size-4 shrink-0",
          isActive ? "text-primary" : "text-sidebar-foreground/55",
        )}
      />
      <span className="truncate text-[13px] leading-relaxed">
        {lesson.title}
      </span>
    </>
  );
}

function getSortedSections(courseSections: CourseSectionWithLessons[]) {
  return [...courseSections].sort((a, b) => a.position - b.position);
}

function getSortedLessons(lessons: CourseLesson[]) {
  return [...lessons].sort((a, b) => a.position - b.position);
}
