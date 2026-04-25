"use client";

import React from "react";
import { 
  IconDotsVertical,
  IconQrcode,
  IconChartBar,
  IconDownload,
  IconMail,
  IconPhone,
  IconCertificate,
  IconMessage
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Class } from "../../types/class.type";
import { ClassDetailStats } from "../../types/class-stats.type";
import { ClassDetailHero } from "./ClassDetailHero";
import { ClassStatsGrid } from "./ClassStatsGrid";
import { ClassDetailTabs } from "./ClassDetailTabs";
import { InstructorCard } from "./InstructorCard";

interface ClassDetailClientPageProps {
  classId: string;
  initialData: Class;
  stats: ClassDetailStats;
}

export function ClassDetailClientPage({ 
  classId, 
  initialData: classData,
  stats 
}: ClassDetailClientPageProps) {
  return (
    <div className="space-y-8 pb-12">
      <ClassDetailHero classData={classData} />

      <div className="grid gap-6">
        <ClassStatsGrid stats={stats} />
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Main Content (8/12) */}
        <div className="lg:col-span-8 space-y-6">
          <ClassDetailTabs classId={classId} />
        </div>

        {/* Sidebar (4/12) */}
        <div className="lg:col-span-4 space-y-6">
          <InstructorCard 
            teacher={classData.teacher} 
            description={classData.description ?? undefined} 
          />

          <Card className="border-none shadow-none ring-1 ring-zinc-200 dark:ring-zinc-800 rounded-[2rem] p-8 bg-zinc-950 text-white text-center space-y-6">
             <div className="p-4 bg-white rounded-3xl mx-auto w-fit shadow-2xl shadow-white/10">
               <IconQrcode size={120} className="text-zinc-950" />
             </div>
             <div className="space-y-2">
               <p className="text-base font-black">Mã QR tham gia lớp</p>
               <p className="text-xs text-zinc-500 font-bold leading-relaxed px-4">
                 Quét mã để học sinh tham gia lớp học ngay lập tức với mã mời: <span className="text-white font-black">{stats.inviteCode}</span>
               </p>
             </div>
             <Button variant="outline" className="w-full rounded-2xl border-zinc-800 bg-white/5 font-black hover:bg-white/10 h-12 gap-2">
               <IconDownload size={18} /> Tải mã QR (HD)
             </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
