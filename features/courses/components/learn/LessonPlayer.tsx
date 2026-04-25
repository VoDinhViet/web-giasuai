"use client";

import { IconPlayerPlay, IconVolume, IconSettings, IconMaximize } from "@tabler/icons-react";

interface LessonPlayerProps {
  title: string;
}

export function LessonPlayer({ title }: LessonPlayerProps) {
  return (
    <div className="aspect-video relative group bg-zinc-950 overflow-hidden shadow-2xl">
      {/* Video Placeholder with Vibrant Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        
        {/* Play Button: Now with Vibrant Gradient and Glow */}
        <button className="relative size-24 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 transition-all duration-500 group/play z-10">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover/play:opacity-100 transition-opacity duration-500" />
          <IconPlayerPlay size={32} className="relative z-20 group-hover/play:text-white transition-colors duration-500" />
          <div className="absolute -inset-4 rounded-full border border-white/10 animate-pulse" />
        </button>

        {/* Floating Title */}
        <div className="absolute top-8 left-8">
           <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-2 block">Now Playing</span>
           <h3 className="text-white font-bold text-xl tracking-tight">{title}</h3>
        </div>
      </div>

      {/* Controls: Modern & Immersive */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
        <div className="space-y-6">
          {/* Progress Bar: Vibrant Gradient */}
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer group/progress relative">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            <div className="absolute left-[33%] top-1/2 -translate-y-1/2 size-4 bg-white rounded-full scale-0 group-hover/progress:scale-100 transition-transform shadow-xl" />
          </div>

          <div className="flex items-center justify-between text-white/70">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <IconPlayerPlay size={20} className="hover:text-white cursor-pointer transition-colors" />
                <span className="text-xs font-bold tabular-nums">04:20 / 12:45</span>
              </div>
              <div className="flex items-center gap-3 group/volume cursor-pointer">
                <IconVolume size={20} className="group-hover:text-white transition-colors" />
                <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-white" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <IconSettings size={20} className="hover:text-white cursor-pointer transition-colors rotate-0 hover:rotate-90 duration-500" />
              <IconMaximize size={20} className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
