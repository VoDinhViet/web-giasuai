"use client";

import * as React from "react";
import useSWR from "swr";
import { IconSearch, IconPlus, IconUser } from "@tabler/icons-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUsers } from "@/features/users/actions/get-users";
import { getClassStudents } from "../../actions/get-class-students";
import { assignStudentToClass } from "../../actions/assign-student-to-class";
import { UserRole } from "@/types/user";

interface AddStudentDialogProps {
  classId: string;
  onSuccess?: () => void;
}

export function AddStudentDialog({ classId, onSuccess }: AddStudentDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [isAssigning, setIsAssigning] = React.useState<string | null>(null);

  const { data: studentsData, isLoading: isLoadingClassStudents, mutate: mutateClassStudents } = useSWR(
    open ? ["class-students", classId] : null,
    () => getClassStudents(classId, { limit: 100 })
  );

  const { data: allUsersData, isLoading: isLoadingAllUsers } = useSWR(
    open ? "all-students" : null,
    () => getUsers({ role: UserRole.STUDENT, limit: 100 })
  );

  const isLoading = isLoadingClassStudents || isLoadingAllUsers;

  const existingStudentIds = React.useMemo(() => {
    return new Set(studentsData?.data.map((s) => s.id) || []);
  }, [studentsData]);

  const availableStudents = React.useMemo(() => {
    return (allUsersData?.data || []).filter(
      (student) => !existingStudentIds.has(student.id)
    );
  }, [allUsersData, existingStudentIds]);

  const filteredStudents = React.useMemo(() => {
    return availableStudents.filter((student) =>
      (student.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
      (student.username || "").toLowerCase().includes(search.toLowerCase()) ||
      (student.email || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [availableStudents, search]);

  const handleAssign = async (studentId: string, studentName: string) => {
    setIsAssigning(studentId);
    try {
      const result = await assignStudentToClass(classId, studentId);
      if (result.success) {
        toast.success(`Đã thêm học viên "${studentName}" vào lớp học`);
        mutateClassStudents();
        onSuccess?.();
      } else {
        toast.error(result.message || "Không thể thêm học viên");
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsAssigning(null);
    }
  };

  const STUDENT_AVATAR_URL = "https://api.dicebear.com/7.x/avataaars/svg";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <IconPlus size={16} />
          Thêm học viên
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>Thêm học viên</DialogTitle>
          <DialogDescription>
            Chọn học viên từ hệ thống để thêm vào lớp học của bạn.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm học viên theo tên, tài khoản hoặc email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <ScrollArea className="h-[350px] pr-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-2">
                <Spinner className="h-6 w-6 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Đang tải danh sách...</p>
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
                <IconUser className="h-10 w-10 text-muted-foreground/50" />
                <div>
                  <p className="font-semibold text-sm">Không tìm thấy học viên</p>
                  <p className="text-xs text-muted-foreground max-w-xs">Không tìm thấy học viên nào chưa tham gia lớp học khớp với tìm kiếm.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredStudents.map((student) => {
                  const assigning = isAssigning === student.id;
                  return (
                    <div 
                      key={student.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 rounded-lg">
                          <AvatarImage src={`${STUDENT_AVATAR_URL}?seed=${student.id}`} />
                          <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                            HS
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-sm font-semibold text-foreground">
                              {student.fullName || student.username}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              @{student.username}
                            </span>
                          </div>
                          <p className="truncate text-xs text-muted-foreground">
                            {student.email}
                          </p>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => handleAssign(student.id, student.fullName || student.username)}
                        disabled={!!isAssigning}
                      >
                        {assigning ? (
                          <Spinner className="h-3 w-3" />
                        ) : (
                          <>
                            <IconPlus className="mr-1 h-3 w-3" />
                            Thêm
                          </>
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
