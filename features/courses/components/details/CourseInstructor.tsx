"use client";

import { IconCheck } from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CourseInstructor() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
          Người biên soạn học liệu
        </h3>
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start px-1">
        <div className="flex flex-col items-center text-center md:text-left gap-4 shrink-0">
          <div className="relative">
            <Avatar className="size-28 border border-border shadow-xs">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="font-semibold text-foreground">GV</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 size-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs ring-2 ring-background z-10">
              <IconCheck size={12} stroke={3} />
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-foreground tracking-tight">Nguyễn Văn A</h4>
            <p className="text-[10px] font-bold text-primary uppercase tracking-wider">
              Chuyên gia hệ thống
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-6 w-full">
          <div className="relative pl-6 py-1 border-l-2 border-primary/40">
            <p className="text-sm text-muted-foreground/90 leading-relaxed italic font-medium">
              &quot;Sứ mệnh của tôi là giúp mọi người tiếp cận với kiến thức công nghệ một cách đơn giản nhất. Với hơn 15 năm làm việc tại các tập đoàn lớn, tôi tin rằng những kinh nghiệm thực chiến sẽ giúp ích cho lộ trình phát triển của bạn.&quot;
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="border border-border/60 rounded-lg bg-muted/20 px-4 py-3">
              <p className="text-xl font-bold text-foreground tracking-tight">15+</p>
              <p className="text-[10px] text-muted-foreground/80 uppercase tracking-wider font-semibold mt-1">
                Năm kinh nghiệm
              </p>
            </div>
            <div className="border border-border/60 rounded-lg bg-muted/20 px-4 py-3">
              <p className="text-xl font-bold text-foreground tracking-tight">5,000+</p>
              <p className="text-[10px] text-muted-foreground/80 uppercase tracking-wider font-semibold mt-1">
                Học viên
              </p>
            </div>
            <div className="border border-border/60 rounded-lg bg-muted/20 px-4 py-3">
              <p className="text-xl font-bold text-foreground tracking-tight">12</p>
              <p className="text-[10px] text-muted-foreground/80 uppercase tracking-wider font-semibold mt-1">
                Khóa học
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
