"use client";

import * as React from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconBook2,
  IconBuildingCommunity,
  IconCheck,
  IconSearch,
  IconSparkles,
} from "@tabler/icons-react";
import { toast } from "sonner";

import { useAuth } from "@/components/providers/auth-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { assignCourseToClass } from "@/features/classes/actions/assign-course-to-class";
import type { Course } from "@/features/classes/types/course.type";
import type { Class } from "@/types/class";
import { UserRole } from "@/types/user";

interface CourseAssignToClassPageProps {
  course: Course;
  classes: Class[];
}

export function CourseAssignToClassPage({
  course,
  classes,
}: CourseAssignToClassPageProps) {
  const { myUser } = useAuth();
  const canAssign = myUser?.role === UserRole.ADMIN || myUser?.role === UserRole.TEACHER;
  const [search, setSearch] = React.useState("");
  const [pendingClassId, setPendingClassId] = React.useState<string | null>(
    null,
  );

  const normalizedSearch = search.trim().toLowerCase();
  const filteredClasses = classes.filter((item) => {
    if (!normalizedSearch) return true;

    return [item.name, item.code, item.teacher?.fullName, item.teacher?.username]
      .filter(Boolean)
      .some((value) => value?.toLowerCase().includes(normalizedSearch));
  });

  const handleAssign = async (classId: string, className: string) => {
    if (!canAssign) {
      toast.error("Bạn không có quyền thực hiện thao tác này.");
      return;
    }

    setPendingClassId(classId);

    try {
      const result = await assignCourseToClass(classId, course.id);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(`${result.message} (${className})`);
    } finally {
      setPendingClassId(null);
    }
  };

  if (!isTeacher) {
    return (
      <div className="space-y-6 pb-16">
        <Button
          asChild
          variant="outline"
          className="h-10 rounded-xl border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-zinc-950"
        >
          <Link href={`/manage/courses/${course.courseId}`}>
            <IconArrowLeft size={16} className="mr-2" />
            {"Quay l\u1EA1i chi ti\u1EBFt kh\u00F3a h\u1ECDc"}
          </Link>
        </Button>

        <Card className="rounded-[2rem] border-dashed border-zinc-200 dark:border-zinc-800">
          <CardContent className="space-y-3 p-8">
            <p className="text-lg font-black text-zinc-950 dark:text-zinc-50">
              {"B\u1EA1n kh\u00F4ng c\u00F3 quy\u1EC1n th\u00EAm kh\u00F3a h\u1ECDc"}
            </p>
            <p className="text-sm font-medium leading-6 text-zinc-500 dark:text-zinc-400">
              {
                "Ch\u1EC9 t\u00E0i kho\u1EA3n gi\u00E1o vi\u00EAn m\u1EDBi c\u00F3 th\u1EC3 g\u00E1n kh\u00F3a h\u1ECDc v\u00E0o l\u1EDBp h\u1ECDc."
              }
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <Button
        asChild
        variant="outline"
        className="h-10 rounded-xl border-zinc-200 bg-white shadow-none dark:border-zinc-800 dark:bg-zinc-950"
      >
        <Link href={`/manage/courses/${course.courseId}`}>
          <IconArrowLeft size={16} className="mr-2" />
          {"Quay l\u1EA1i chi ti\u1EBFt kh\u00F3a h\u1ECDc"}
        </Link>
      </Button>

      <Card className="overflow-hidden rounded-[2rem] border-zinc-200/80 dark:border-zinc-800">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <IconSparkles size={22} />
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-zinc-400">
                {"G\u00E1n v\u00E0o l\u1EDBp h\u1ECDc"}
              </p>
              <h1 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 md:text-3xl">
                {course.title}
              </h1>
            </div>
          </div>

          <p className="max-w-3xl text-sm font-medium leading-6 text-zinc-500 dark:text-zinc-400">
            {
              "Ch\u1ECDn l\u1EDBp h\u1ECDc ph\u00F9 h\u1EE3p \u0111\u1EC3 th\u00EAm kh\u00F3a h\u1ECDc v\u00E0o ch\u01B0\u01A1ng tr\u00ECnh gi\u1EA3ng d\u1EA1y."
            }
          </p>
        </CardHeader>

        <CardContent className="grid gap-4 sm:grid-cols-3">
          <InfoPill
            label={"Tr\u1EA1ng th\u00E1i"}
            value={course.isPublished ? "C\u00F3 th\u1EC3 g\u00E1n" : "B\u1EA3n nh\u00E1p"}
            icon={<IconCheck size={14} />}
          />
          <InfoPill
            label={"M\u1EE9c \u0111\u1ED9"}
            value={course.level.replaceAll("_", " ")}
            icon={<IconBook2 size={14} />}
          />
          <InfoPill
            label={"L\u1EDBp c\u00F3 th\u1EC3 ch\u1ECDn"}
            value={classes.length.toString()}
            icon={<IconBuildingCommunity size={14} />}
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="relative max-w-xl">
          <IconSearch className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"T\u00ECm theo t\u00EAn l\u1EDBp, m\u00E3 l\u1EDBp ho\u1EB7c gi\u00E1o vi\u00EAn..."}
            className="h-11 rounded-xl border-zinc-200 bg-white pl-11 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          />
        </div>

        {filteredClasses.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {filteredClasses.map((classItem) => {
              const isPending = pendingClassId === classItem.id;
              return (
                <Card
                  key={classItem.id}
                  className="rounded-[1.5rem] border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <CardContent className="space-y-5 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={classItem.isActive ? "success" : "secondary"}
                            className="rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-widest"
                          >
                            {classItem.isActive ? "Đang mở" : "Tạm dừng"}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-widest"
                          >
                            {classItem.code}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-lg font-black tracking-tight text-zinc-950 dark:text-zinc-50">
                            {classItem.name}
                          </h3>
                          <p className="text-sm font-medium leading-6 text-zinc-500 dark:text-zinc-400">
                            {classItem.description || "Chưa có mô tả chi tiết."}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <MetaBox
                        label={"Giáo viên"}
                        value={
                          classItem.teacher?.fullName ||
                          classItem.teacher?.username ||
                          "Chưa phân công"
                        }
                      />
                      <MetaBox
                        label={"Học viên"}
                        value={`${classItem.studentCount || 0} người`}
                      />
                    </div>

                    <Button
                      className="h-11 w-full rounded-xl bg-primary text-sm font-bold shadow-lg shadow-primary/20"
                      onClick={() => handleAssign(classItem.id, classItem.name)}
                      disabled={isPending}
                    >
                      {isPending ? "Đang gán..." : "Thêm khóa học vào lớp"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="rounded-[1.5rem] border-dashed border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-10 text-center">
              <p className="text-lg font-black text-zinc-950 dark:text-zinc-50">
                {"Kh\u00F4ng t\u00ECm th\u1EA5y l\u1EDBp ph\u00F9 h\u1EE3p"}
              </p>
              <p className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {"H\u00E3y th\u1EED t\u00ECm theo m\u00E3 l\u1EDBp, t\u00EAn l\u1EDBp ho\u1EB7c gi\u00E1o vi\u00EAn."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function InfoPill({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900/60">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </p>
      <div className="mt-2 flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
        {icon}
        <span className="text-sm font-bold">{value}</span>
      </div>
    </div>
  );
}

function MetaBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-zinc-50 px-4 py-4 dark:bg-zinc-900/70">
      <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-bold text-zinc-700 dark:text-zinc-200">
        {value}
      </p>
    </div>
  );
}
