"use client";

import React from "react";
import { 
  IconUsers, 
  IconCopy,
  TablerIcon,
  IconClock,
  IconBook2
} from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { ClassDetailStats } from "../../types/class-stats.type";

interface StatItem {
  label: string;
  value: string;
  sub: string;
  icon: TablerIcon;
  color: string;
  bgColor: string;
  trend?: string;
  action?: () => void;
}

interface ClassStatsGridProps {
  stats: ClassDetailStats;
}

export function ClassStatsGrid({ stats }: ClassStatsGridProps) {
  const handleCopyInvite = () => {
    navigator.clipboard.writeText(`${window.location.origin}/join/${stats.inviteCode}`);
    toast.success("Đã sao chép link mời thành công");
  };

  const displayStats: StatItem[] = [
    { 
      label: "Sĩ số học viên", 
      value: `${stats.studentCount}`, 
      sub: "Học sinh tham gia", 
      icon: IconUsers, 
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      trend: "Đang hoạt động"
    },
    { 
      label: "Số lượng khóa học", 
      value: `${stats.courseCount}`, 
      sub: "Khóa học được gán", 
      icon: IconBook2, 
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      trend: "Chương trình"
    },
    { 
      label: "Mã mời lớp học", 
      value: stats.inviteCode, 
      sub: "Bấm vào thẻ để sao chép link", 
      icon: IconCopy, 
      color: "text-primary",
      bgColor: "bg-primary/10",
      action: handleCopyInvite,
      trend: "Mã mời"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {displayStats.map((item, idx) => (
        <Card 
          key={idx} 
          className={cn(
            "relative overflow-hidden border-none bg-white dark:bg-zinc-950 p-6 shadow-sm ring-1 ring-zinc-200/50 dark:ring-zinc-800/50 transition-all duration-300",
            item.action && "cursor-pointer hover:ring-primary/40 hover:shadow-md hover:-translate-y-0.5"
          )}
          onClick={item.action}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className={cn("rounded-lg p-2.5", item.bgColor)}>
                <item.icon size={20} className={item.color} />
              </div>
              {item.trend && (
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md bg-zinc-50 dark:bg-zinc-900 text-zinc-400 border border-zinc-100 dark:border-zinc-800">
                  {item.trend}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                {item.value}
              </h3>
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">
                {item.label}
              </p>
            </div>

             <div className="flex items-center gap-1.5 pt-1 border-t border-zinc-50 dark:border-zinc-900">
                <IconClock size={12} className="text-zinc-400" />
                <span className="text-[10px] font-bold text-zinc-400">{item.sub}</span>
             </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
