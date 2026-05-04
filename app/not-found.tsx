"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconHome, IconSearch, IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-700">
      <div className="relative mb-8">
        {/* Large Background 404 */}
        <h1 className="text-[12rem] md:text-[16rem] font-black text-zinc-100 dark:text-zinc-900/40 leading-none select-none tracking-tighter">
          404
        </h1>
        {/* Floating Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-[2.5rem] bg-primary text-white shadow-[0_25px_60px_-15px_rgba(var(--primary),0.5)] animate-bounce duration-[3000ms] group-hover:scale-110 transition-transform">
              <IconSearch size={48} stroke={2.5} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 max-w-xl">
        <div className="space-y-3">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase">
            Trang không tồn tại
          </h2>
          <div className="h-1.5 w-20 bg-primary/20 mx-auto rounded-full" />
          <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg md:text-xl leading-relaxed">
            Rất tiếc, đường dẫn bạn truy cập không đúng hoặc trang này đã được di chuyển sang địa chỉ khác.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
          <Button
            asChild
            variant="default"
            size="lg"
            className="h-16 px-10 text-lg font-bold rounded-2xl gap-3 shadow-2xl shadow-primary/20 active:scale-95 transition-all cursor-pointer"
          >
            <Link href="/">
              <IconHome size={24} />
              Trang chủ
            </Link>
          </Button>
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="lg"
            className="h-16 px-10 text-lg font-bold rounded-2xl gap-3 border-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-95 transition-all"
          >
            <IconArrowLeft size={24} />
            Quay lại
          </Button>
        </div>
      </div>

      <div className="mt-24 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 text-zinc-300 dark:text-zinc-700">
          <div className="h-px w-12 bg-current" />
          <p className="text-[10px] font-black uppercase tracking-[0.5em]">
            GIA SƯ AI &bull; TRÍ TUỆ VIỆT
          </p>
          <div className="h-px w-12 bg-current" />
        </div>
      </div>
    </div>
  );
}
