"use client";

import type { Route } from "next";
import Link, { type LinkProps } from "next/link";
import { IconCertificate, IconChevronLeft, IconSettings } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface LessonHeaderProps {
  courseTitle: string;
  progress: number;
  backUrl: LinkProps<Route>["href"];
}

export function LessonHeader({
  courseTitle,
  progress,
  backUrl,
}: LessonHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/90 px-4 backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger className="md:hidden" />
        <Button variant="ghost" size="icon" asChild className="shrink-0 rounded-xl">
          <Link href={backUrl}>
            <IconChevronLeft size={20} />
          </Link>
        </Button>
        <div className="hidden h-8 w-px shrink-0 bg-border sm:block" />
        <div className="min-w-0">
          <h1 className="truncate text-sm font-bold text-foreground">
            {courseTitle}
          </h1>
          <div className="mt-0.5 flex items-center gap-3">
            <div className="hidden w-32 xs:block">
              <Progress value={progress} className="h-1" />
            </div>
            <span className="whitespace-nowrap text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              {progress}% hoàn thành
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="hidden rounded-xl font-bold md:flex"
        >
          <IconCertificate size={16} />
          <span>Chứng chỉ</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <IconSettings size={20} />
        </Button>
      </div>
    </header>
  );
}
