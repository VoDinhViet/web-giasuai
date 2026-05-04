import { IconLoader2 } from "@tabler/icons-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-24 w-24 animate-ping rounded-full bg-primary/10" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-2xl shadow-primary/40">
            <IconLoader2 className="h-8 w-8 animate-spin text-white" stroke={3} />
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-1.5">
          <h2 className="text-xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50">
            GIA SƯ AI
          </h2>
          <div className="h-1 w-24 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full w-1/2 animate-shimmer bg-primary" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-2">
            Đang khởi tạo hệ thống
          </p>
        </div>
      </div>
    </div>
  );
}
