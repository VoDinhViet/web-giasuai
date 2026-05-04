"use client";

import { useEffect } from "react";
import { IconRefresh, IconHome, IconAlertTriangle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="relative mb-8">
        {/* Decorative Ring */}
        <div className="absolute inset-[-10px] animate-pulse rounded-full bg-destructive/5" />
        <div className="absolute inset-[-20px] animate-ping rounded-full bg-destructive/5 duration-1000" />
        
        {/* Icon Container */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-destructive/10 text-destructive shadow-inner">
          <IconAlertTriangle size={48} stroke={2} className="drop-shadow-sm" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 max-w-lg">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase">
            Đã có lỗi xảy ra
          </h2>
          <div className="h-1 w-12 bg-destructive/20 mx-auto rounded-full" />
        </div>
        
        <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
          Chúng tôi thành thật xin lỗi vì sự cố này. Ứng dụng gặp một lỗi tạm thời và không thể hiển thị nội dung ngay lúc này.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          <Button
            onClick={() => reset()}
            variant="default"
            size="lg"
            className="h-14 px-8 text-base font-bold rounded-2xl gap-2 shadow-xl shadow-primary/20 active:scale-95 transition-all"
          >
            <IconRefresh size={20} />
            Thử lại
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            size="lg"
            className="h-14 px-8 text-base font-bold rounded-2xl gap-2 border-2 active:scale-95 transition-all"
          >
            <IconHome size={20} />
            Về trang chủ
          </Button>
        </div>
        
        {error.digest && (
          <div className="mt-8 py-2 px-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
             <p className="text-[10px] font-mono font-bold text-zinc-400 tracking-wider">
              MÃ LỖI: <span className="text-zinc-500">{error.digest}</span>
            </p>
          </div>
        )}
      </div>
      
      <p className="mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 dark:text-zinc-700">
        GIA SƯ AI &bull; HỆ THỐNG HỖ TRỢ
      </p>
    </div>
  );
}
