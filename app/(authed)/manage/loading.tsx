import { IconLoader2 } from "@tabler/icons-react";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-16 w-16 animate-ping rounded-full bg-primary/20" />
        <div className="relative rounded-full bg-background p-4 shadow-xl border border-zinc-200 dark:border-zinc-800">
          <IconLoader2 className="h-8 w-8 animate-spin text-primary" stroke={3} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          Đang tải dữ liệu...
        </p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          Gia sư AI
        </p>
      </div>
    </div>
  );
}
