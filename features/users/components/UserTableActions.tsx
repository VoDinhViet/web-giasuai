"use client";

import Link from "next/link";
import type { Route } from "next";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  IconDotsVertical,
  IconEye,
  IconLock,
  IconLockOpen,
  IconTrash,
  IconLoader2,
  IconUserCheck,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, UserRole } from "@/types/user";
import { toggleLock } from "../actions/toggle-lock";
import { deleteUser } from "../actions/delete-user";
import { verifyTeacher } from "../actions/verify-teacher";

interface UserTableActionsProps {
  myUser: User;
}

export function UserTableActions({ myUser }: UserTableActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () =>
    startTransition(async () => {
      const { success, message } = await toggleLock(
        myUser.id,
        !myUser.isLocked,
      );
      if (success) toast.success(message);
      else toast.error(message);
    });

  const handleDelete = () => {
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa người dùng "${myUser.fullName}"?`,
      )
    )
      return;

    startTransition(async () => {
      const { success, message } = await deleteUser(myUser.id);
      if (success) toast.success(message);
      else toast.error(message);
    });
  };

  const handleVerifyTeacher = () =>
    startTransition(async () => {
      const { success, message } = await verifyTeacher(myUser.id);
      if (success) toast.success(message);
      else toast.error(message);
    });

  const canVerifyTeacher =
    myUser.role === UserRole.TEACHER && myUser.isLocked;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          className="rounded-xl text-muted-foreground"
        >
          {isPending ? (
            <IconLoader2 size={18} className="animate-spin" />
          ) : (
            <IconDotsVertical size={18} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/manage/users/${myUser.id}` as Route}>
            <IconEye size={16} />
            <span>Xem hồ sơ</span>
          </Link>
        </DropdownMenuItem>
        {canVerifyTeacher && (
          <DropdownMenuItem
            onClick={handleVerifyTeacher}
            disabled={isPending}
          >
            <IconUserCheck size={16} />
            <span>Xác thực giáo viên</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleToggle} disabled={isPending}>
          {myUser.isLocked ? (
            <>
              <IconLockOpen size={16} />
              <span>Mở khóa</span>
            </>
          ) : (
            <>
              <IconLock size={16} />
              <span>Khóa tài khoản</span>
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={handleDelete}
          disabled={isPending}
        >
          <IconTrash size={16} />
          <span>Xóa</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
