"use client"

import * as React from "react"
import { BookOpenCheck, Sparkles } from "lucide-react"

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
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import type { CourseCurriculum } from "../../types/curriculum"

type CourseLearningSidebarProps = {
  curriculum: CourseCurriculum
}

export function CourseLearningSidebar({
  curriculum,
}: CourseLearningSidebarProps) {
  const lessons = curriculum.sections.flatMap(
    (section) => section.lessons || []
  )
  const completedLessonCount = 1
  const currentLessonCode =
    lessons.find((lesson) => lesson.status === "PUBLISHED")?.code ??
    lessons[0]?.code

  const totalLessons = curriculum.sections.reduce(
    (acc, section) => acc + (section.lessons?.length || 0),
    0
  )

  const completionRate =
    totalLessons > 0
      ? Math.round((completedLessonCount / totalLessons) * 100)
      : 0

  return (
    <Sidebar variant="sidebar">
      <SidebarHeader className="shrink-0 border-b border-sidebar-border px-4 py-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex min-w-0 items-center gap-3 px-1">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
                <BookOpenCheck className="size-5" />
              </span>
              <div className="min-w-0">
                <span className="block truncate text-[10px] leading-3 font-bold tracking-wider text-muted-foreground uppercase">
                  {curriculum.code}
                </span>
                <span className="mt-0.5 block truncate text-sm leading-5 font-bold text-sidebar-foreground">
                  {curriculum.name}
                </span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-6 px-4 py-5">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/30 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-[13px] font-bold text-sidebar-foreground">
                    Tiến độ khóa học
                  </h2>
                  <p className="mt-0.5 text-[10px] leading-4 text-muted-foreground">
                    {completedLessonCount}/{totalLessons} bài đã xong
                  </p>
                </div>
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-sidebar-primary/10 text-sidebar-primary">
                  <Sparkles className="size-3.5" />
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-end justify-between gap-3">
                  <p className="text-2xl font-bold text-sidebar-foreground">
                    {completionRate}%
                  </p>
                  <p className="pb-0.5 text-[10px] font-semibold text-muted-foreground">
                    {totalLessons} bài học
                  </p>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sidebar-accent">
                  <div
                    className="h-full rounded-full bg-sidebar-primary"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="space-y-4">
          {(() => {
            let lessonCounter = 0
            return curriculum.sections.map((section) => (
              <SidebarGroup key={section.id} className="p-0">
                <SidebarGroupLabel className="px-3 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                  {section.title}
                </SidebarGroupLabel>
                <SidebarGroupContent className="mt-1.5">
                  <SidebarMenu className="gap-1">
                    {section.lessons?.map((lesson) => {
                      lessonCounter++
                      const lessonNumber = lessonCounter
                      const active = lesson.code === currentLessonCode
                      const isLocked = lesson.status === "LOCKED"

                      return (
                        <SidebarMenuItem key={lesson.id}>
                          <SidebarMenuButton
                            isActive={active}
                            disabled={isLocked}
                            className={cn(
                              "h-auto p-2.5 text-[13px] font-semibold",
                              active &&
                                "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                            )}
                          >
                            <div className="flex w-full min-w-0 items-start gap-2.5">
                              <span
                                className={cn(
                                  "flex size-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold",
                                  active
                                    ? "border-sidebar-primary-foreground/20 bg-sidebar-primary-foreground/10 text-sidebar-primary-foreground"
                                    : "border-sidebar-border bg-sidebar-accent/50 text-muted-foreground"
                                )}
                              >
                                {lessonNumber}
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="truncate leading-5 font-semibold">
                                  {lesson.title}
                                </p>
                                <div className="mt-1 flex items-center gap-1.5 text-[10px] leading-3 text-muted-foreground">
                                  <span>{lesson.type}</span>
                                  <span>·</span>
                                  <span>{lesson.durationMinutes} phút</span>
                                  {isLocked && (
                                    <>
                                      <span>·</span>
                                      <span className="text-[9px] font-bold tracking-wider text-destructive uppercase">
                                        Khóa
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))
          })()}
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
