"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IconBookUpload, IconStack2 } from "@tabler/icons-react";

interface CoursesLibraryHeroProps {
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}

export function CoursesLibraryHero({
  totalRecords,
  currentPage,
  totalPages,
}: CoursesLibraryHeroProps) {
  return (
    <Card className="relative overflow-hidden bg-primary text-primary-foreground">
      <CardContent className="relative flex flex-col gap-8 p-8 lg:flex-row lg:items-end lg:justify-between lg:p-12">
        <div className="max-w-3xl space-y-5">
          <Badge
            variant="secondary"
            className="bg-white/20 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground rounded-lg"
          >
            Thư viện nội dung
          </Badge>

          <div className="space-y-3">
            <h1 className="max-w-2xl text-3xl font-black tracking-tight capitalize  md:text-4xl">
              Thư viện nội dung
            </h1>
            <p className="max-w-2xl text-sm font-medium leading-6 text-white/80">
              Duyệt nhanh các khóa học đã xuất bản, xem thumbnail, thời lượng và
              mở chi tiết trước khi phân bổ vào từng lớp.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="border-white/10 bg-white/10">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-xl bg-white/20 p-2 text-white">
                <IconStack2 size={18} />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-white/60">
                  Tổng mục trong kho
                </p>
                <p className="mt-1 text-xl font-black text-white">
                  {totalRecords.toLocaleString("vi-VN")}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/10">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-xl bg-white/20 p-2 text-white">
                <IconBookUpload size={18} />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-white/60">
                  Kệ hiện tại
                </p>
                <p className="mt-1 text-xl font-black text-white">
                  {currentPage}/{totalPages}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
