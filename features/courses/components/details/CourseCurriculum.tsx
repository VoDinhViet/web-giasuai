"use client";

import {
  IconBook2,
  IconPlayerPlay,
  IconHelpCircle,
  IconFileText,
  IconLock,
  IconArrowsMaximize,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type { CourseLesson } from "@/features/courses/types/course-lesson.type";
import type { CourseSectionWithLessons } from "@/features/courses/types/course-section.type";

interface CourseCurriculumProps {
  sections: CourseSectionWithLessons[];
}

export function CourseCurriculum({ sections }: CourseCurriculumProps) {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Nội dung học tập
          </h3>
          <p className="text-xs text-muted-foreground font-medium pl-0.5">
            Tổng cộng {sections.length} chương •{" "}
            {sections.reduce((acc, s) => acc + s.lessons.length, 0)} bài học
          </p>
        </div>
        <Button variant="outline" size="sm" className="rounded-lg border-border/80 hover:bg-muted/50 shadow-xs text-xs font-semibold gap-1.5 self-start sm:self-auto h-8 px-3">
          <IconArrowsMaximize size={13} className="text-muted-foreground" />
          Mở rộng tất cả
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {sections.map((section, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border-b border-border/60 last:border-none"
          >
            <AccordionTrigger className="hover:no-underline py-4 px-1 group">
              <div className="flex items-center gap-3 text-left">
                <div className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-200">
                  <IconBook2 size={16} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {section.title}
                  </p>
                  <p className="text-[10px] font-medium text-muted-foreground mt-0.5">
                    {section.lessons.length} Bài học
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 px-1">
              <div className="space-y-1 pt-1">
                {section.lessons.map((lesson: CourseLesson, j: number) => {
                  const isQuiz = lesson.title.toLowerCase().includes("thực hành") || lesson.title.toLowerCase().includes("bài tập");
                  const isVideo = !isQuiz;

                  return (
                    <div
                      key={j}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/65 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                          {isVideo ? (
                            <IconPlayerPlay size={14} stroke={2} />
                          ) : isQuiz ? (
                            <IconHelpCircle size={14} stroke={2} />
                          ) : (
                            <IconFileText size={14} stroke={2} />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                            {lesson.title}
                          </span>
                          {lesson.isPreview && (
                            <Badge
                              variant="secondary"
                              className="h-4.5 px-1.5 text-[9px] font-semibold bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-none rounded-md tracking-wide cursor-default"
                            >
                              Học thử
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground font-medium">
                          {lesson.durationMinutes ? `${lesson.durationMinutes} phút` : "--"}
                        </span>
                        {!lesson.isPreview && (
                          <div className="text-muted-foreground/40">
                            <IconLock size={13} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
