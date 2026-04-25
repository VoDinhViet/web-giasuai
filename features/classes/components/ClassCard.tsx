"use client";

import React from "react";
import Link from "next/link";
import { IconArrowRight, IconEdit } from "@tabler/icons-react";

import { Class } from "@/types/class";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { InfoItem } from "@/components/shared/InfoItem";
import { formatDate } from "@/lib/utils";

import { EditClassDialog } from "./EditClassDialog";
import { CLASS_STATUS_LABEL } from "../constants/class.constant";

interface ClassCardProps {
  classData: Class;
}

export function ClassCard({ classData }: ClassCardProps) {
  const thumbnailSrc =
    classData.thumbnail ||
    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop";
  const status = classData.isActive ? "active" : "inactive";
  const description = classData.description || "";

  return (
    <Card
      variant="flat"
      size="none"
      className="group h-full transition-all duration-500 hover:shadow-xl"
    >
      <div className="relative w-full overflow-hidden rounded-t-lg">
        <AspectRatio ratio={16 / 9}>
          <img
            src={thumbnailSrc}
            alt={classData.name}
            className="h-full w-full object-cover brightness-[0.7] grayscale-[0.2] transition-all duration-700 ease-in-out group-hover:brightness-100 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        </AspectRatio>

        <CardAction className="absolute right-3 top-3 z-10">
          <Badge
            variant={classData.isActive ? "success" : "secondary"}
            className="h-5 rounded-md border-none bg-white/10 px-2 text-[9px] font-bold uppercase tracking-widest text-white ring-1 ring-white/20 backdrop-blur-xl"
          >
            {CLASS_STATUS_LABEL[status]}
          </Badge>
        </CardAction>
      </div>

      <CardHeader className="px-4 pb-0 pt-4">
        <CardTitle className="line-clamp-1 text-[15px] font-black leading-tight tracking-tight text-zinc-900 transition-colors group-hover:text-primary dark:text-zinc-50">
          {classData.name}
        </CardTitle>
        <CardDescription className="mt-0.5 line-clamp-1 whitespace-normal break-words text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
          {description || "Chưa có mô tả chi tiết."}
        </CardDescription>
      </CardHeader>

      <div className="grid flex-1 content-start grid-cols-2 gap-x-2 gap-y-3.5 px-4 py-5">
        <InfoItem label="Mã lớp" value={classData.code || "CLS-UNSET"} />
        <InfoItem
          label="Giảng viên"
          value={
            classData.teacher?.fullName ||
            classData.teacher?.username ||
            "Chưa phân công"
          }
        />
        <InfoItem label="Sĩ số" value={`${classData.studentCount || 0} học sinh`} />
        <InfoItem label="Ngày tạo" value={formatDate(classData.createdAt)} />
      </div>

      <CardFooter className="mt-auto flex gap-2 px-4 pb-4">
        <EditClassDialog
          classData={classData}
          trigger={
            <Button
              variant="ghost"
              size="sm"
              className="h-9 flex-1 rounded-lg border-zinc-200 text-[11px] font-bold text-zinc-600 transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary dark:border-zinc-800 dark:text-zinc-400"
            >
              <IconEdit size={14} className="mr-1.5" />
              Sửa
            </Button>
          }
        />

        <Button
          size="sm"
          className="group/btn h-9 flex-1 rounded-lg bg-primary text-[11px] font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
          asChild
        >
          <Link href={`/manage/classes/${classData.id}`}>
            Chi tiết
            <IconArrowRight
              size={14}
              className="ml-1.5 transition-transform group-hover/btn:translate-x-0.5"
            />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
