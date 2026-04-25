"use client";

import * as React from "react";
import Link from "next/link";
import { IconArrowRight, IconLoader2, IconSchool } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Class } from "@/types/class";

import { joinClassByInvite } from "../actions/join-class-by-invite";

interface JoinClassInvitePageProps {
  inviteCode: string;
  isLoggedIn: boolean;
  classInfo: Class | null;
}

export function JoinClassInvitePage({
  inviteCode,
  isLoggedIn,
  classInfo,
}: JoinClassInvitePageProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const loginHref = `/login?redirectTo=${encodeURIComponent(`/join/${inviteCode}`)}`;
  const classDescription = classInfo?.description?.trim() || "";

  const handleJoin = () => {
    startTransition(async () => {
      const result = await joinClassByInvite(inviteCode);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push("/manage/classes");
      router.refresh();
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-20 dark:bg-zinc-950">
      <div className="mx-auto max-w-[500px]">
        <Card className="overflow-hidden border-zinc-200/60 bg-white/80 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-900/80">
          <CardContent className="space-y-10 p-8 sm:p-10">
            <div className="space-y-6">
              {classInfo ? (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className="border-none bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400"
                      >
                        {classInfo.isActive ? "Lớp học đang mở" : "Lớp học tạm dừng"}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-2xl font-black leading-tight tracking-tight text-zinc-950 dark:text-zinc-50">
                        {classInfo.name}
                      </h2>
                      <p className="whitespace-pre-wrap break-words text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {classDescription ||
                          "Link này sẽ thêm tài khoản của bạn vào lớp học tương ứng với mã mời phía trên."}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-5 dark:border-zinc-800/50 dark:bg-zinc-950/50">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        Định danh lớp
                      </p>
                      <p className="mt-2 font-mono text-sm font-black text-zinc-900 dark:text-zinc-100">
                        #{classInfo.code}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-5 dark:border-zinc-800/50 dark:bg-zinc-950/50">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        Giảng viên
                      </p>
                      <p className="mt-2 truncate text-sm font-black text-zinc-900 dark:text-zinc-100">
                        {classInfo.teacher?.fullName ||
                          classInfo.teacher?.username ||
                          "Chưa cập nhật"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
                  <div className="rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
                    <IconSchool size={40} className="text-zinc-400" stroke={1} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-zinc-950 dark:text-zinc-50">
                      Không lấy được thông tin
                    </p>
                    <p className="text-sm text-zinc-500">
                      Mã mời không tồn tại hoặc đã hết hạn.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {isLoggedIn ? (
                <Button
                  size="lg"
                  className="h-14 w-full rounded-2xl bg-zinc-950 text-base font-black transition-all active:scale-[0.98] hover:bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white"
                  onClick={handleJoin}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <IconLoader2 className="mr-2 h-5 w-5 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      Xác nhận gia nhập
                      <IconArrowRight className="ml-2 h-5 w-5" stroke={2.5} />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="h-14 w-full rounded-2xl bg-primary text-base font-black shadow-lg shadow-primary/20 transition-all active:scale-[0.98] hover:bg-primary/90"
                  asChild
                >
                  <Link href={loginHref}>
                    Đăng nhập để tham gia
                    <IconArrowRight className="ml-2 h-5 w-5" stroke={2.5} />
                  </Link>
                </Button>
              )}

              <Button
                variant="ghost"
                className="h-12 w-full rounded-xl text-sm font-bold text-zinc-500 hover:text-zinc-700"
                asChild
              >
                <Link href="/">Hủy bỏ và quay lại</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="mt-10 px-6 text-center text-[11px] font-medium leading-relaxed text-zinc-400 dark:text-zinc-500">
          Chỉ tham gia các lớp học khi bạn nhận được link mời trực tiếp từ giáo
          viên. Bằng cách nhấn xác nhận, bạn sẽ được thêm vào danh sách học viên
          chính thức.
        </p>
      </div>
    </div>
  );
}
