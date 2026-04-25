"use client";

import { IconCheck } from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CourseInstructor() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-5 w-1 bg-primary rounded-full" />
        <h3 className="text-sm font-black capitalize tracking-[0.15em]">
          Giảng viên hướng dẫn
        </h3>
      </div>
      <div className="flex flex-col md:flex-row gap-12 items-start px-2">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 shrink-0">
          <div className="relative">
            <Avatar className="size-36 border-4 border-background shadow-xl ring-1 ring-border">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>GV</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg ring-4 ring-background">
              <IconCheck size={18} stroke={3} />
            </div>
          </div>
          <div className="space-y-1.5">
            <h4 className="text-xl font-bold text-foreground">Nguyễn Văn A</h4>
            <p className="text-xs font-bold text-primary uppercase tracking-[0.15em]">
              Chuyên gia hệ thống
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-10">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
            <p className="text-[17px] text-muted-foreground leading-relaxed pl-8 italic font-medium">
              "Sứ mệnh của tôi là giúp mọi người tiếp cận với kiến thức công nghệ một cách đơn giản nhất. Với hơn 15 năm làm việc tại các tập đoàn lớn, tôi tin rằng những kinh nghiệm thực chiến sẽ giúp ích cho lộ trình phát triển của bạn."
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-12">
            <div>
              <p className="text-2xl font-black text-foreground tracking-tight">15+</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-black mt-1">
                Năm kinh nghiệm
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-foreground tracking-tight">5,000+</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-black mt-1">
                Học viên
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-foreground tracking-tight">12</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-black mt-1">
                Khóa học
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
