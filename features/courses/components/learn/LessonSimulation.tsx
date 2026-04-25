"use client";

import * as React from "react";
import { IconCode, IconPlayerPlay, IconEye } from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function LessonSimulation() {
  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-zinc-950 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="size-3 rounded-full bg-rose-500" />
          <div className="size-3 rounded-full bg-amber-500" />
          <div className="size-3 rounded-full bg-emerald-500" />
          <div className="h-4 w-px bg-zinc-800 mx-2" />
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
            MÔ PHỎNG TƯƠNG TÁC
          </span>
        </div>
        <Button variant="ghost" size="xs" className="text-zinc-400 hover:text-white gap-2">
          <IconPlayerPlay size={14} />
          <span>Run</span>
        </Button>
      </div>

      <div className="flex h-[400px]">
        {/* Code Editor Mock */}
        <div className="flex-1 border-r border-zinc-800 p-4 font-mono text-sm overflow-y-auto">
          <div className="space-y-1">
            <p className="text-emerald-400">{"<div class=\"card\">"}</p>
            <p className="text-zinc-400 ml-4">{"<h1>Hello Gia Su AI</h1>"}</p>
            <p className="text-zinc-400 ml-4">{"<p>Học lập trình thật dễ dàng!</p>"}</p>
            <p className="text-emerald-400">{"</div>"}</p>
            <br />
            <p className="text-amber-400">{".card {"}</p>
            <p className="text-zinc-400 ml-4">{"padding: 2rem;"}</p>
            <p className="text-zinc-400 ml-4">{"border-radius: 1rem;"}</p>
            <p className="text-zinc-400 ml-4">{"background: linear-gradient(to right, #3b82f6, #2563eb);"}</p>
            <p className="text-zinc-400 ml-4">{"color: white;"}</p>
            <p className="text-amber-400">{"}"}</p>
          </div>
        </div>

        {/* Preview Mock */}
        <div className="flex-1 bg-white flex items-center justify-center p-8">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl text-center space-y-2 transform hover:scale-105 transition-transform">
             <h1 className="text-xl font-bold">Hello Gia Su AI</h1>
             <p className="text-sm opacity-90">Học lập trình thật dễ dàng!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
