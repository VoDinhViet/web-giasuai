"use client";

import * as React from "react";
import Link from "next/link";
import type { Route } from "next";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
  IconFileText,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import type { LessonPart } from "@/features/courses/types/lesson-part.type";
import type { PaginatedResponse } from "@/types/api";

interface LessonTheoryStepProps {
  courseId: string;
  lessonId: string;
  lessonParts: PaginatedResponse<LessonPart>;
  onNext: () => void;
}

export function LessonTheoryStep({
  courseId,
  lessonId,
  lessonParts,
  onNext,
}: LessonTheoryStepProps) {
  const [currentSessionIdx, setCurrentSessionIdx] = React.useState(0);
  const sessions = lessonParts.data;
  const session = sessions[currentSessionIdx];
  const isLastSession = currentSessionIdx === sessions.length - 1;

  const buildPageHref = (page: number) => {
    const params = new URLSearchParams({
      partsPage: `${page}`,
      partsLimit: `${lessonParts.pagination.limit}`,
    });

    return `/courses/${courseId}/learn/${lessonId}?${params.toString()}` as Route;
  };

  const previousPartsPage = lessonParts.pagination.previousPage;
  const nextPartsPage = lessonParts.pagination.nextPage;

  if (!session) {
    return (
      <div className="animate-in fade-in space-y-10 duration-500">
        <div className="rounded-xl border border-dashed border-zinc-200 p-10 text-center dark:border-zinc-800">
          <IconFileText className="mx-auto mb-4 text-zinc-300" size={42} />
          <h2 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
            Chưa có tài liệu
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
            Bài học này chưa có phần tài liệu để hiển thị.
          </p>
        </div>

        <div className="flex justify-end border-t border-zinc-100 pt-10 dark:border-zinc-800">
          <Button onClick={onNext}>
            Bắt đầu thực hành
            <IconChevronRight size={18} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in space-y-14 duration-500">
      <div className="flex gap-2">
        {sessions.map((item, idx) => (
          <div
            key={item.id}
            className={`h-1 flex-1 rounded-full ${
              idx <= currentSessionIdx ? "bg-primary" : "bg-zinc-100 dark:bg-zinc-800"
            }`}
          />
        ))}
      </div>

      <div className="space-y-5">
        <span className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-400">
          Tài liệu {currentSessionIdx + 1} / {sessions.length}
        </span>
        <h1 className="text-4xl font-black leading-tight tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          {session.title}
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-zinc-500">
          {session.partType} · Phần {session.position}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-100 bg-zinc-50/70 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white text-primary ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
              <IconFileText size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-widest text-zinc-400">
                {session.partType}
              </p>
              <p className="truncate text-base font-bold text-zinc-950 dark:text-zinc-50">
                {session.fileUrl}
              </p>
            </div>
          </div>

          <Button asChild className="shrink-0">
            <a href={session.fileUrl} target="_blank" rel="noreferrer">
              Mở tài liệu
              <IconDownload size={18} />
            </a>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-zinc-100 pt-10 dark:border-zinc-800">
        <Button
          variant="ghost"
          disabled={currentSessionIdx === 0}
          onClick={() => setCurrentSessionIdx((prev) => Math.max(prev - 1, 0))}
        >
          <IconChevronLeft size={16} />
          Quay lại
        </Button>

        {isLastSession ? (
          <Button onClick={onNext}>
            Bắt đầu thực hành
            <IconChevronRight size={18} />
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() =>
              setCurrentSessionIdx((prev) =>
                Math.min(prev + 1, sessions.length - 1),
              )
            }
          >
            Tài liệu tiếp theo
            <IconChevronRight size={18} />
          </Button>
        )}
      </div>

      {lessonParts.pagination.totalPages > 1 ? (
        <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-zinc-100 p-4 sm:flex-row dark:border-zinc-800">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Trang {lessonParts.pagination.currentPage} / {lessonParts.pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" disabled={!previousPartsPage} asChild={!!previousPartsPage}>
              {previousPartsPage ? (
                <Link href={buildPageHref(previousPartsPage)}>
                  <IconChevronLeft size={16} />
                  Trang trước
                </Link>
              ) : (
                <span>
                  <IconChevronLeft size={16} />
                  Trang trước
                </span>
              )}
            </Button>
            <Button variant="outline" disabled={!nextPartsPage} asChild={!!nextPartsPage}>
              {nextPartsPage ? (
                <Link href={buildPageHref(nextPartsPage)}>
                  Trang sau
                  <IconChevronRight size={16} />
                </Link>
              ) : (
                <span>
                  Trang sau
                  <IconChevronRight size={16} />
                </span>
              )}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
