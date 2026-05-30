"use client";

import { IconPlayerPlay } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

export function LessonSimulation() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-950 shadow-sm dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="size-3 rounded-full bg-rose-500" />
          <div className="size-3 rounded-full bg-amber-500" />
          <div className="size-3 rounded-full bg-emerald-500" />
          <div className="mx-2 h-4 w-px bg-zinc-800" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            Mô phỏng tương tác
          </span>
        </div>
        <Button variant="ghost" size="xs" className="text-zinc-400 hover:text-white">
          <IconPlayerPlay size={14} />
          Run
        </Button>
      </div>

      <div className="grid min-h-[360px] md:grid-cols-2">
        <div className="border-b border-zinc-800 p-4 font-mono text-sm md:border-b-0 md:border-r">
          <div className="space-y-1">
            <p className="text-emerald-400">{"<div class=\"card\">"}</p>
            <p className="ml-4 text-zinc-400">{"<h1>Hello GiaSuAI</h1>"}</p>
            <p className="ml-4 text-zinc-400">{"<p>Hoc lap trinh de dang</p>"}</p>
            <p className="text-emerald-400">{"</div>"}</p>
            <br />
            <p className="text-amber-400">{".card {"}</p>
            <p className="ml-4 text-zinc-400">{"padding: 2rem;"}</p>
            <p className="ml-4 text-zinc-400">{"border-radius: 1rem;"}</p>
            <p className="ml-4 text-zinc-400">{"background: #2563eb;"}</p>
            <p className="text-amber-400">{"}"}</p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white p-8">
          <div className="space-y-2 rounded-2xl bg-blue-600 p-8 text-center text-white shadow-xl">
            <h1 className="text-xl font-bold">Hello GiaSuAI</h1>
            <p className="text-sm opacity-90">Hoc lap trinh de dang</p>
          </div>
        </div>
      </div>
    </div>
  );
}
