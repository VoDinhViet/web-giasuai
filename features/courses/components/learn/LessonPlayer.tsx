"use client";

import {
  IconMaximize,
  IconPlayerPlay,
  IconSettings,
  IconVolume,
} from "@tabler/icons-react";

interface LessonPlayerProps {
  title: string;
}

export function LessonPlayer({ title }: LessonPlayerProps) {
  return (
    <div className="group relative aspect-video overflow-hidden rounded-2xl bg-zinc-950 shadow-2xl">
      <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-zinc-900 to-black">
        <button className="relative z-10 flex size-20 items-center justify-center rounded-full bg-white text-zinc-950 shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-transform hover:scale-105 active:scale-95">
          <IconPlayerPlay size={30} fill="currentColor" />
        </button>

        <div className="absolute left-6 top-6">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500">
            Now playing
          </span>
          <h3 className="text-lg font-bold tracking-tight text-white">{title}</h3>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 translate-y-4 bg-linear-to-t from-black/80 to-transparent p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="space-y-5">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/3 rounded-full bg-primary" />
          </div>
          <div className="flex items-center justify-between text-white/70">
            <div className="flex items-center gap-6">
              <IconPlayerPlay size={20} />
              <span className="text-xs font-bold tabular-nums">
                04:20 / 12:45
              </span>
              <IconVolume size={20} />
            </div>
            <div className="flex items-center gap-5">
              <IconSettings size={20} />
              <IconMaximize size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
