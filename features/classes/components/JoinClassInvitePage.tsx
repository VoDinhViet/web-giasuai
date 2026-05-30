"use client";

import * as React from "react";
import Link from "next/link";
import type { Route } from "next";
import { IconArrowRight, IconLoader2, IconSchool } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
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
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4 md:p-8">
      <div className="w-full max-w-md">
        <Card className="border-border bg-card shadow-lg">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <IconSchool className="h-6 w-6" />
            </div>
            {classInfo ? (
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold tracking-tight">
                  Gia nhập lớp học
                </CardTitle>
                <CardDescription className="text-sm">
                  Bạn được mời tham gia vào một lớp học mới.
                </CardDescription>
              </div>
            ) : (
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold tracking-tight text-destructive">
                  Liên kết không hợp lệ
                </CardTitle>
                <CardDescription className="text-sm">
                  Không tìm thấy thông tin lớp học.
                </CardDescription>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {classInfo ? (
              <div className="space-y-4">
                <div className="rounded-lg border border-border p-4 bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={classInfo.isActive ? "success" : "secondary"}>
                      {classInfo.isActive ? "Đang mở" : "Tạm dừng"}
                    </Badge>
                    <span className="font-mono text-xs text-muted-foreground">
                      #{classInfo.code}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">
                    {classInfo.name}
                  </h3>
                  {classDescription && (
                    <p className="text-xs text-muted-foreground line-clamp-3">
                      {classDescription}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border border-border p-3 bg-card">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Mã mời
                    </span>
                    <span className="font-mono text-xs font-semibold text-foreground mt-1 block">
                      {inviteCode}
                    </span>
                  </div>
                  <div className="rounded-lg border border-border p-3 bg-card">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Giảng viên
                    </span>
                    <span className="text-xs font-semibold text-foreground mt-1 block truncate">
                      {classInfo.teacher?.fullName || classInfo.teacher?.username || "Chưa cập nhật"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground">
                  Mã mời này không tồn tại hoặc đã hết hiệu lực. Vui lòng liên hệ giáo viên để nhận mã mời mới.
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            {isLoggedIn ? (
              <Button
                className="w-full"
                onClick={handleJoin}
                disabled={isPending || !classInfo}
              >
                {isPending ? (
                  <>
                    <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    Xác nhận gia nhập
                    <IconArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                className="w-full"
                asChild
                disabled={!classInfo}
              >
                <Link href={loginHref as Route}>
                  Đăng nhập để tham gia
                  <IconArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}

            <Button
              variant="ghost"
              className="w-full text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link href="/">Hủy bỏ và quay lại</Link>
            </Button>
          </CardFooter>
        </Card>

        <p className="mt-8 text-center text-xs text-muted-foreground px-4">
          Chỉ tham gia các lớp học khi bạn nhận được link mời trực tiếp từ giáo viên của bạn.
        </p>
      </div>
    </div>
  );
}
