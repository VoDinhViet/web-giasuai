"use client";

import { LessonCurriculums } from "./LessonCurriculums";

interface LessonNavigationProps {
  curriculum: any[];
  activeLessonId: string;
}

export function LessonNavigation({ curriculum, activeLessonId }: LessonNavigationProps) {
  return (
    <aside className="w-[320px] h-full border-r border-zinc-100 hidden lg:block overflow-y-auto bg-white shrink-0">
      <div className="py-10 px-8">
        <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-8 text-zinc-400">
          Nội dung học tập
        </h2>
        <LessonCurriculums curriculum={curriculum} activeLessonId={activeLessonId} />
      </div>
    </aside>
  );
}
