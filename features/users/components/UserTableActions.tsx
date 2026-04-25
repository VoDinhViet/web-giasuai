"use client";

import {
  IconDotsVertical,
  IconEdit,
  IconLock,
  IconLockOpen,
  IconTrash,
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

interface UserTableActionsProps {
  user: User;
}

export function UserTableActions({ user }: UserTableActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-zinc-400 hover:text-zinc-950 transition-colors"
        >
          <IconDotsVertical size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="gap-2">
          <IconEdit size={16} />
          Sửa thông tin
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          {user.isLocked ? (
            <>
              <IconLockOpen size={16} />
              Mở khóa tài khoản
            </>
          ) : (
            <>
              <IconLock size={16} />
              Khóa tài khoản
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" className="gap-2">
          <IconTrash size={16} />
          Xóa người dùng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
