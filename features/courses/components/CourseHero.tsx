"use client";

import { IconBook, IconLayoutDashboard, IconSearch } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CourseHeroProps {
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}

export function CourseHero({
  totalRecords,
}: CourseHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-zinc-900 px-8 py-16 dark:bg-white">
      {/* Decorative Background */}
      <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-white/5 to-transparent dark:from-black/5" />
      <div className="absolute -right-24 -top-24 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative z-10 space-y-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md dark:bg-black/10 dark:text-black">
            <IconLayoutDashboard size={12} className="mr-1.5" /> Quản trị viên
          </Badge>
          <Badge className="bg-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary backdrop-blur-md">
            <IconBook size={12} className="mr-1.5" /> {totalRecords} Khóa học
          </Badge>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight text-white dark:text-zinc-900 sm:text-5xl">
            Quản lý <span className="text-primary">Kho khóa học</span>
          </h1>
          <p className="text-lg font-medium leading-relaxed text-zinc-400 dark:text-zinc-500">
            Hệ thống quản lý học liệu trung tâm. Chỉnh sửa, cập nhật và tổ chức các chương trình đào tạo cho toàn bộ hệ thống GiasuAI.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="group relative flex-1">
            <IconSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-primary"
              size={18}
            />
            <Input
              placeholder="Tìm kiếm khóa học theo tên, mã hoặc từ khóa..."
              className="h-14 rounded-lg border-none bg-white/5 pl-12 text-base font-medium text-white placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-primary/50 dark:bg-black/5 dark:text-zinc-900"
            />
          </div>

          <Button asChild className="h-14 px-8 text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30">
            <Link href="/courses/create">
              <IconBook className="mr-2" size={18} /> Tạo khóa học mới
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
