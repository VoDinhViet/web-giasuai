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

interface Lesson {
  title: string;
  duration: string;
  type: string;
  isFree: boolean;
}

interface Chapter {
  title: string;
  lessons: Lesson[];
}

interface CourseCurriculumProps {
  curriculum: Chapter[];
}

export function CourseCurriculum({ curriculum }: CourseCurriculumProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="h-5 w-1 bg-primary rounded-full" />
            <h3 className="text-sm font-black capitalize tracking-[0.15em]">
              Nội dung học tập
            </h3>
          </div>
          <p className="text-[13px] font-medium text-muted-foreground ml-4">
            Tổng cộng {curriculum.length} chương •{" "}
            {curriculum.reduce((acc, c) => acc + c.lessons.length, 0)} bài học
          </p>
        </div>
        <Button>
          <IconArrowsMaximize size={14} stroke={2.5} />
          Mở rộng tất cả
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {curriculum.map((chapter, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border-b border-border/50 last:border-none"
          >
            <AccordionTrigger className="hover:no-underline py-5 px-2 group">
              <div className="flex items-center gap-4 text-left">
                <div className="size-9 rounded-xl bg-muted flex items-center justify-center shrink-0 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  <IconBook2 size={20} />
                </div>
                <div>
                  <p className="font-bold text-[15px] text-foreground group-hover:text-primary transition-colors">
                    {chapter.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {chapter.lessons.length} Bài học
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 px-2">
              <div className="space-y-1">
                {chapter.lessons.map((lesson, j) => (
                  <div
                    key={j}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-muted-foreground group-hover:text-primary transition-colors">
                        {lesson.type === "video" ? (
                          <IconPlayerPlay size={16} stroke={2.5} />
                        ) : lesson.type === "quiz" ? (
                          <IconHelpCircle size={16} stroke={2.5} />
                        ) : (
                          <IconFileText size={16} stroke={2.5} />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {lesson.title}
                        </span>
                        {lesson.isFree && (
                          <Badge
                            variant="secondary"
                            className="h-4 px-1.5 text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-600 border-none rounded-md"
                          >
                            Học thử
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground font-medium">
                        {lesson.duration}
                      </span>
                      {!lesson.isFree && (
                        <IconLock size={14} className="text-muted-foreground/40" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
