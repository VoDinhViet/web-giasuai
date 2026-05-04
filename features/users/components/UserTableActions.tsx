"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import {
  IconDotsVertical,
  IconEdit,
  IconLock,
  IconLockOpen,
  IconTrash,
  IconLoader2,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/user";
import { toggleLock } from "../actions/toggle-lock";
import { deleteUser } from "../actions/delete-user";

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          className="size-8"
        >
          {isPending ? (
            <IconLoader2 size={16} className="animate-spin" />
          ) : (
            <IconDotsVertical size={16} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="gap-2" disabled={isPending}>
          <IconEdit size={16} /> Sửa thông tin
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={handleToggle}
          disabled={isPending}
        >
          {myUser.isLocked ? (
            <>
              <IconLockOpen size={16} /> Mở khóa
            </>
          ) : (
            <>
              <IconLock size={16} /> Khóa tài khoản
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="gap-2"
          onClick={handleDelete}
          disabled={isPending}
        >
          <IconTrash size={16} /> Xóa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
