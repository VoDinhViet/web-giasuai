"use client";

import Link from "next/link";
import Image from "next/image";
import {
  IconLayoutGrid,
  IconClock,
  IconCircleCheck,
  IconEye,
  IconTag,
  IconPlus,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Course } from "../../types/course.type";

interface CourseAssignItemProps {
  course: Course;
  classId: string;
  isAssigning: boolean;
  isAlreadyAssigned?: boolean;
  onAssign: (id: string, title: string) => Promise<void>;
}

export function CourseAssignItem({
  course,
  isAssigning,
  isAlreadyAssigned,
  onAssign,
}: CourseAssignItemProps) {
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(course.price);

  return (
    <Card
      size="none"
      className={cn(
        "h-full overflow-hidden transition-all duration-300",
        isAssigning && "opacity-60 pointer-events-none grayscale-[0.5]",
        isAlreadyAssigned && "bg-zinc-50/50 dark:bg-zinc-900/10"
      )}
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800/50">
        {course.thumbnailUrl ? (
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              !isAlreadyAssigned && "group-hover:scale-110"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-300 dark:text-zinc-700">
            <IconLayoutGrid size={48} stroke={1} />
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          <Badge
            variant="secondary"
            className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm"
          >
            {course.level.replace("_", " ")}
          </Badge>
        </div>

        {course.price > 0 && !isAlreadyAssigned && (
          <div className="absolute bottom-3 right-3">
            <Badge className="bg-primary text-white border-none shadow-md text-[10px] font-bold px-3 py-1 rounded-full">
              {formattedPrice}
            </Badge>
          </div>
        )}
        
        {isAlreadyAssigned && (
          <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
             <Badge className="bg-emerald-500 text-white border-none shadow-xl text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                Đã thêm
             </Badge>
          </div>
        )}
      </div>

      <CardHeader className="p-4 space-y-2">
        <CardTitle className={cn(
          "text-base font-bold leading-tight line-clamp-2 min-h-[2.5rem] transition-colors",
          isAlreadyAssigned ? "text-zinc-400 dark:text-zinc-600" : "text-zinc-900 dark:text-zinc-50"
        )}>
          {course.title}
        </CardTitle>
        {course.shortDescription && (
          <CardDescription className="text-xs text-zinc-500 font-medium leading-relaxed line-clamp-2 min-h-[2rem]">
            {course.shortDescription}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="px-4 pb-4 mt-auto">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 text-zinc-500">
            <IconClock size={12} stroke={2} />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {course.estimatedDurationMinutes}m
            </span>
          </div>
          {course.isPublished && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border border-emerald-100/50 dark:border-emerald-500/20">
              <IconCircleCheck size={12} stroke={2} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Sẵn sàng
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0 flex items-center gap-2">
        <Button asChild variant="secondary" size="icon" className="rounded-xl">
          <Link href={`/manage/courses/${course.id}`} target="_blank">
            <IconEye size={18} stroke={2} />
          </Link>
        </Button>
        <Button
          onClick={() => onAssign(course.id, course.title)}
          disabled={isAssigning || isAlreadyAssigned}
          variant={isAlreadyAssigned ? "outline" : "default"}
          className={cn(
            "flex-1 gap-2 uppercase font-bold rounded-xl transition-all",
            isAlreadyAssigned && "bg-emerald-50/50 text-emerald-600 border-emerald-100 hover:bg-emerald-50/50 cursor-default"
          )}
        >
          {isAssigning ? (
            <Spinner className="size-3.5" />
          ) : isAlreadyAssigned ? (
            <>
              <IconCircleCheck size={16} stroke={3} />
              <span>Đã trong lớp</span>
            </>
          ) : (
            <>
              <IconPlus size={16} stroke={3} />
              <span>Thêm vào lớp</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
