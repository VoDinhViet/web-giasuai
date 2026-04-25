"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconBook, IconSearch } from "@tabler/icons-react";
import { useQueryStates } from "nuqs";
import { toast } from "sonner";

import { useAuth } from "@/components/providers/auth-provider";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types/user";
import { courseAssignParamsSchema } from "@/features/classes/params/course-assign-params";
import { assignCourseToClass } from "../../actions/assign-course-to-class";
import type { CoursesResponse } from "../../types/course.type";
import { CourseAssignItem } from "./CourseAssignItem";

interface ClassAssignCoursePageProps {
  classId: string;
  coursesData: CoursesResponse;
  assignedCourseIds: string[];
}

export function ClassAssignCoursePage({
  classId,
  coursesData,
  assignedCourseIds,
}: ClassAssignCoursePageProps) {
  const router = useRouter();
  const { myUser } = useAuth();
  const isTeacher = myUser?.role === UserRole.TEACHER;
  const [{ q: search, page }, setParams] = useQueryStates(
    courseAssignParamsSchema,
    {
      shallow: false,
    },
  );

  const [assigningId, setAssigningId] = React.useState<string | null>(null);
  const [localAssignedIds, addAssignedId] = React.useOptimistic(
    assignedCourseIds,
    (state, courseId: string) =>
      state.includes(courseId) ? state : [...state, courseId],
  );

  const handleAssign = async (courseId: string, courseTitle: string) => {
    if (!isTeacher) {
      toast.error("Chỉ giáo viên mới có thể thêm khóa học vào lớp.");
      return;
    }

    setAssigningId(courseId);
    try {
      const result = await assignCourseToClass(classId, courseId);
      if (result.success) {
        toast.success(`Đã thêm: ${courseTitle}`);
        addAssignedId(courseId);
        router.refresh();
      } else {
        toast.error(result.message || "Không thể thêm khóa học");
      }
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setAssigningId(null);
    }
  };

  const totalPages = coursesData.pagination?.totalPages || 0;

  if (!isTeacher) {
    return (
      <div className="w-full animate-in fade-in space-y-6 pb-20">
        <div className="flex items-center gap-2 text-zinc-400">
          <Link
            href={`/manage/classes/${classId}?tab=courses`}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tight transition-colors hover:text-primary"
          >
            <IconArrowLeft size={16} stroke={2.5} />
            Quay lại lớp học
          </Link>
        </div>

        <div className="rounded-[2rem] border border-dashed border-zinc-200 p-8 dark:border-zinc-800">
          <p className="text-lg font-black text-zinc-900 dark:text-zinc-50">
            Bạn không có quyền thêm khóa học
          </p>
          <p className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Chỉ tài khoản giáo viên mới có thể gán khóa học vào lớp học.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in space-y-8 pb-20 duration-500">
      <div className="space-y-6 border-b border-zinc-100 pb-6 dark:border-zinc-800/50">
        <div className="space-y-1">
          <div className="mb-2 flex items-center gap-2 text-zinc-400">
            <Link
              href={`/manage/classes/${classId}?tab=courses`}
              className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tight transition-colors hover:text-primary"
            >
              <IconArrowLeft size={16} stroke={2.5} />
              Quay lại lớp học
            </Link>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Thêm khóa học vào lớp
          </h1>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Chọn các khóa học phù hợp từ thư viện để xây dựng chương trình giảng
            dạy cho lớp học này.
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-2 md:flex-row md:items-center">
          <div className="group relative w-full max-w-md">
            <IconSearch className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Tìm kiếm khóa học theo tên..."
              value={search || ""}
              onChange={(e) => setParams({ q: e.target.value || null, page: 1 })}
              className="h-12 w-full rounded-2xl border-zinc-200 bg-white pl-11 transition-all focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-900/50"
            />
          </div>
        </div>
      </div>

      <div className="min-h-[400px]">
        {coursesData.data.length === 0 ? (
          <div className="space-y-6 py-40 text-center">
            <div className="mx-auto flex size-20 items-center justify-center rounded-[2rem] bg-zinc-50 text-zinc-200 dark:bg-zinc-900 dark:text-zinc-800">
              <IconBook size={40} />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-zinc-900 dark:text-zinc-50">
                Không tìm thấy khóa học
              </p>
              <p className="text-xs font-medium text-zinc-400">
                Hãy thử thay đổi từ khóa tìm kiếm của bạn.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {coursesData.data.map((course) => (
                <CourseAssignItem
                  key={course.id}
                  course={course}
                  classId={classId}
                  isAssigning={assigningId === course.id}
                  isAlreadyAssigned={localAssignedIds.includes(course.id)}
                  onAssign={handleAssign}
                />
              ))}
            </div>

            {totalPages > 1 ? (
              <div className="flex justify-center border-t border-zinc-50 pt-8 dark:border-zinc-900/50">
                <Pagination>
                  <PaginationContent className="gap-2">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setParams({ page: Math.max(1, (page || 1) - 1) })
                        }
                        className={cn(
                          "cursor-pointer rounded-xl transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",
                          (page || 1) === 1 && "pointer-events-none opacity-30",
                        )}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNumber) => (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            onClick={() => setParams({ page: pageNumber })}
                            isActive={(page || 1) === pageNumber}
                            className={cn(
                              "cursor-pointer rounded-xl transition-all",
                              (page || 1) === pageNumber
                                ? "scale-110 bg-primary font-bold text-white"
                                : "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                            )}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setParams({
                            page: Math.min(totalPages, (page || 1) + 1),
                          })
                        }
                        className={cn(
                          "cursor-pointer rounded-xl transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",
                          (page || 1) === totalPages &&
                            "pointer-events-none opacity-30",
                        )}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
