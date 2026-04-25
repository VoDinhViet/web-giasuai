"use client";

import React from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconCalendarEvent,
  IconPlus,
  IconSettings,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Class } from "../../types/class.type";

interface ClassDetailHeroProps {
  classData: Class;
}

export function ClassDetailHero({ classData }: ClassDetailHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-zinc-950 px-8 py-12 text-white shadow-xl">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />

      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-8 w-8 rounded-md bg-white/10 text-white hover:bg-white/20"
            >
              <Link href="/manage/classes">
                <IconArrowLeft size={16} />
              </Link>
            </Button>
            <Badge
              variant="secondary"
              className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-none font-bold"
            >
              Lớp học đang mở
            </Badge>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
              {classData.code}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black md:text-5xl tracking-tight leading-tight">
              {classData.name}
            </h1>
            <p className="max-w-2xl text-zinc-300 font-medium leading-relaxed text-sm md:text-base whitespace-pre-wrap">
              {classData.description || "Lớp học này chưa có mô tả chi tiết."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <Avatar
                    key={i}
                    className="h-7 w-7 border-2 border-zinc-950 rounded-md"
                  >
                    <AvatarFallback className="bg-zinc-800 text-[10px] rounded-md">
                      HS
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs font-bold text-zinc-100">
                {classData.studentCount} Học viên tham gia
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
              <IconCalendarEvent size={16} className="text-primary" />
              Bắt đầu: 15/01/2024
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col min-w-[240px]">
          <Button size="lg">
            <IconPlus size={18} />
            Mời thêm học sinh
          </Button>
          <Button variant="secondary" size="lg">
            <IconSettings size={18} />
            Cấu hình lớp học
          </Button>
        </div>
      </div>
    </div>
  );
}
