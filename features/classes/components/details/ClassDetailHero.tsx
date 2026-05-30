"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconCalendarEvent,
  IconPlus,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";

import { Class } from "../../types/class.type";

interface ClassDetailHeroProps {
  classData: Class;
}

export function ClassDetailHero({ classData }: ClassDetailHeroProps) {
  return (
    <section className="rounded-xl border border-white/10 bg-zinc-950 p-6 text-white shadow-lg shadow-slate-900/10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="glass" size="icon" asChild>
              <Link href="/manage/classes">
                <IconArrowLeft size={16} />
              </Link>
            </Button>

            <Badge
              variant={classData.isActive ? "success" : "destructive"}
              className={cn(
                classData.isActive
                  ? "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20"
                  : "bg-destructive/15 text-red-200 ring-destructive/20",
              )}
            >
              {classData.isActive ? "Lớp học đang mở" : "Tạm dừng"}
            </Badge>

            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/45">
              {classData.code || "--"}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
              {classData.name}
            </h1>
            <p className="max-w-3xl whitespace-pre-wrap text-sm font-medium leading-relaxed text-white/65 md:text-base">
              {classData.description || "--"}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <HeroMetaItem
              icon={<IconUsers size={16} />}
              label="Học viên"
              value={`${classData.studentCount || 0} học viên tham gia`}
            />
            <HeroMetaItem
              icon={<IconCalendarEvent size={16} />}
              label="Ngày tạo"
              value={formatDate(classData.createdAt)}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-60 lg:grid-cols-1">
          <Button>
            <IconPlus size={18} />
            Mời thêm học sinh
          </Button>
          <Button variant="glass">
            <IconSettings size={18} />
            Cấu hình lớp học
          </Button>
        </div>
      </div>
    </section>
  );
}

interface HeroMetaItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function HeroMetaItem({ icon, label, value }: HeroMetaItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
      <span className="flex size-8 items-center justify-center rounded-lg bg-white/10 text-primary">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/45">
          {label}
        </p>
        <p className="truncate font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
