"use client";

import * as React from "react";
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

const THEORY_SESSIONS = [
  {
    title: "Kiến trúc bài học",
    description:
      "Nắm phần kiến thức cốt lõi trước khi chuyển sang thực hành và kiểm tra.",
    items: [
      {
        title: "Mục tiêu",
        desc: "Hiểu khái niệm chính, cách áp dụng và các lỗi thường gặp.",
      },
      {
        title: "Cách học",
        desc: "Đọc từng phần, chuyển session khi đã nắm ý chính, sau đó thực hành.",
      },
    ],
  },
  {
    title: "Ứng dụng thực tế",
    description:
      "Liên hệ kiến thức trong bài với tình huống triển khai sản phẩm thật.",
    items: [
      {
        title: "Phân tích",
        desc: "Tách vấn đề thành các bước nhỏ và xác định đầu vào, đầu ra.",
      },
      {
        title: "Kiểm chứng",
        desc: "Tự kiểm tra kết quả bằng ví dụ nhỏ trước khi làm bài tập.",
      },
    ],
  },
];

interface LessonTheoryStepProps {
  onNext: () => void;
}

export function LessonTheoryStep({ onNext }: LessonTheoryStepProps) {
  const [currentSessionIdx, setCurrentSessionIdx] = React.useState(0);
  const session = THEORY_SESSIONS[currentSessionIdx];
  const isLastSession = currentSessionIdx === THEORY_SESSIONS.length - 1;

  return (
    <div className="animate-in fade-in space-y-14 duration-500">
      <div className="flex gap-2">
        {THEORY_SESSIONS.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 flex-1 rounded-full ${
              idx <= currentSessionIdx ? "bg-primary" : "bg-zinc-100 dark:bg-zinc-800"
            }`}
          />
        ))}
      </div>

      <div className="space-y-5">
        <span className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-400">
          Session {currentSessionIdx + 1} / {THEORY_SESSIONS.length}
        </span>
        <h1 className="text-4xl font-black leading-tight tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          {session.title}
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-zinc-500">
          {session.description}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {session.items.map((item) => (
          <div
            key={item.title}
            className="group space-y-3 border-l-2 border-zinc-100 py-2 pl-6 transition-colors hover:border-primary dark:border-zinc-800"
          >
            <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-950 dark:text-zinc-50">
              <IconArrowRight
                size={14}
                className="text-zinc-300 transition-transform group-hover:translate-x-1"
              />
              {item.title}
            </h4>
            <p className="leading-relaxed text-zinc-500">{item.desc}</p>
          </div>
        ))}
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
                Math.min(prev + 1, THEORY_SESSIONS.length - 1),
              )
            }
          >
            Session tiếp theo
            <IconChevronRight size={18} />
          </Button>
        )}
      </div>
    </div>
  );
}
