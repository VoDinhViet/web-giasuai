"use client";

import { useEffect } from "react";
import { IconRefresh, IconHome, IconAlertCircle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import "./globals.css";

export default function GlobalError({
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
    <html lang="vi" className="h-full">
      <body className="h-full antialiased font-sans bg-background text-foreground selection:bg-destructive/10 selection:text-destructive">
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 bg-background">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[160px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-destructive/5 blur-[160px] rounded-full animate-pulse delay-1000" />
          </div>

          <div className="relative flex flex-col items-center max-w-md w-full gap-10 text-center">
            <div className="relative flex items-center justify-center">
              {/* Animated Rings */}
              <div className="absolute h-32 w-32 animate-ping rounded-full bg-destructive/10 duration-1000" />
              <div className="absolute h-40 w-40 animate-ping rounded-full bg-destructive/5 duration-1000 delay-300" />
              
              {/* Icon Container */}
              <div className="relative flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-destructive shadow-[0_20px_50px_-12px_rgba(239,68,68,0.4)] rotate-12 transition-all hover:rotate-0 hover:scale-110 duration-500">
                <IconAlertCircle className="h-12 w-12 text-white" stroke={2.5} />
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase">
                Hệ thống gặp sự cố
              </h1>
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 mt-2">
                <div className="h-full w-full bg-destructive/20" />
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mt-2">
                Đã có lỗi nghiêm trọng xảy ra khiến ứng dụng không thể tiếp tục. Chúng tôi đã ghi nhận sự cố và đang nỗ lực khắc phục.
              </p>
              
              {error.digest && (
                <div className="mt-4 px-4 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <p className="text-[10px] font-mono font-bold text-zinc-400 tracking-wider">
                    SỰ CỐ ID: <span className="text-destructive/70">{error.digest}</span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <Button
                onClick={() => reset()}
                variant="default"
                size="lg"
                className="w-full h-16 text-lg font-bold rounded-2xl shadow-2xl shadow-primary/20 gap-3 group active:scale-95 transition-all"
              >
                <IconRefresh className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                Thử lại ngay
              </Button>
              <Button
                onClick={() => (window.location.href = "/")}
                variant="outline"
                size="lg"
                className="w-full h-16 text-lg font-bold rounded-2xl gap-3 border-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-95 transition-all"
              >
                <IconHome className="w-6 h-6" />
                Trang chủ
              </Button>
            </div>

            <div className="flex flex-col items-center gap-2 mt-4">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 dark:text-zinc-700">
                GIA SƯ AI &bull; TRÍ TUỆ VIỆT
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
