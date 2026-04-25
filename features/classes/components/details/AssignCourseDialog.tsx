"use client";

import * as React from "react";
import useSWR from "swr";
import { IconSearch, IconPlus, IconSparkles, IconCheck, IconBook, IconLayoutGrid, IconClock, IconCircleCheck } from "@tabler/icons-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { getCourses } from "../../actions/get-courses";
import { assignCourseToClass } from "../../actions/assign-course-to-class";
import type { Course } from "../../types/course.type";
import { cn } from "@/lib/utils";

interface AssignCourseDialogProps {
  classId: string;
  onSuccess?: () => void;
}

export function AssignCourseDialog({ classId, onSuccess }: AssignCourseDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [isAssigning, setIsAssigning] = React.useState<string | null>(null);

  const { data, isLoading } = useSWR(
    open ? "available-courses" : null,
    () => getCourses({ limit: 100, page: 1 })
  );

  const filteredCourses = data?.data.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleAssign = async (courseId: string, courseTitle: string) => {
    setIsAssigning(courseId);
    try {
      const result = await assignCourseToClass(classId, courseId);
      if (result.success) {
        toast.success(`Đã gán "${courseTitle}" vào chương trình học`);
        onSuccess?.();
        // Optional: Keep open if they want to add more, but user usually wants to add one at a time
        // setOpen(false); 
      } else {
        toast.error(result.message || "Không thể thêm khóa học");
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsAssigning(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-black text-[11px] uppercase tracking-[0.2em] px-8 h-12 gap-3 shadow-2xl shadow-zinc-200 transition-all hover:scale-105 active:scale-95"
        >
          <IconPlus size={18} stroke={3} />
          Thêm khóa học
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl rounded-[3rem] p-0 border-none shadow-2xl bg-white overflow-hidden">
        <div className="flex flex-col h-[700px]">
          {/* Header Section with Gradient Background */}
          <div className="p-10 bg-zinc-50 border-b border-zinc-100">
            <DialogHeader className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-3xl bg-white shadow-xl shadow-zinc-200/50 flex items-center justify-center text-zinc-900 border border-zinc-50">
                    <IconSparkles size={28} />
                  </div>
                  <div className="space-y-1">
                    <DialogTitle className="text-3xl font-black tracking-tight text-zinc-900">
                      Chọn khóa học
                    </DialogTitle>
                    <p className="text-zinc-500 text-sm font-medium">
                      Xây dựng chương trình giảng dạy cho lớp học của bạn.
                    </p>
                  </div>
                </div>
                <Badge className="bg-zinc-900 text-white border-none px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {filteredCourses.length} Khóa học
                </Badge>
              </div>
              
              <div className="relative">
                <IconSearch className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
                <Input
                  placeholder="Tìm theo tên khóa học hoặc nội dung..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-16 rounded-[2rem] border-none bg-white pl-14 shadow-2xl shadow-zinc-100/50 text-base font-medium placeholder:text-zinc-300 focus-visible:ring-2 focus-visible:ring-zinc-900 transition-all"
                />
              </div>
            </DialogHeader>
          </div>

          {/* List Section */}
          <div className="flex-1 min-h-0">
            <ScrollArea className="h-full">
              <div className="p-10">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-32 gap-4">
                    <Spinner className="size-8 text-zinc-900" />
                    <p className="text-zinc-400 text-xs font-black uppercase tracking-widest">Đang tải thư viện...</p>
                  </div>
                ) : filteredCourses.length === 0 ? (
                  <div className="text-center py-32 space-y-4">
                    <div className="size-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto text-zinc-200">
                       <IconBook size={40} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-black text-xl text-zinc-900">Không tìm thấy kết quả</p>
                      <p className="text-zinc-400 text-sm font-medium">Hệ thống không tìm thấy khóa học nào khớp với tìm kiếm.</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredCourses.map((course) => {
                      const assigning = isAssigning === course.courseId;
                      return (
                        <div 
                          key={course.courseId}
                          className={cn(
                            "group flex items-center justify-between p-6 rounded-[2rem] border border-zinc-100 hover:border-zinc-900 hover:bg-zinc-50 transition-all duration-300",
                            assigning && "opacity-50 pointer-events-none"
                          )}
                        >
                          <div className="flex items-center gap-6">
                            {/* Thumbnail Placeholder/Icon */}
                            <div className="size-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-500 overflow-hidden relative">
                              <IconLayoutGrid size={24} />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <h4 className="font-black text-lg text-zinc-900 tracking-tight">
                                  {course.title}
                                </h4>
                                <Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                                  {course.level.replace('_', ' ')}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center gap-4 text-zinc-400">
                                <div className="flex items-center gap-1.5">
                                  <IconClock size={14} />
                                  <span className="text-[10px] font-bold uppercase tracking-wider">{course.estimatedDurationMinutes} phút</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <IconCircleCheck size={14} className="text-emerald-500" />
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Sẵn sàng</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <Button
                            onClick={() => handleAssign(course.courseId, course.title)}
                            disabled={!!isAssigning}
                            className={cn(
                              "rounded-full font-black text-[10px] uppercase tracking-widest px-8 h-12 shadow-none transition-all duration-300",
                              assigning 
                                ? "bg-zinc-100 text-zinc-400" 
                                : "bg-zinc-900 hover:bg-zinc-800 text-white hover:scale-105"
                            )}
                          >
                            {assigning ? (
                              <Spinner className="size-4" />
                            ) : (
                              <>
                                <IconPlus size={16} stroke={3} className="mr-2" />
                                Chọn gán
                              </>
                            )}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Footer Decoration */}
          <div className="p-6 bg-zinc-50/50 border-t border-zinc-100 text-center">
             <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em]">GiasuAI Learning Management System</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
