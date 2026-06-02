"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, UserRole } from "@/types/user";
import { cn } from "@/lib/utils";
import { UserTableActions } from "./UserTableActions";

const columnHelper = createColumnHelper<User>();

const roleStyles: Record<UserRole, { label: string; className: string }> = {
  [UserRole.ADMIN]: {
    label: "Quản trị viên",
    className: "bg-primary/10 text-primary ring-primary/15",
  },
  [UserRole.TEACHER]: {
    label: "Giáo viên",
    className: "bg-sky-50 text-sky-700 ring-sky-100",
  },
  [UserRole.STUDENT]: {
    label: "Học viên",
    className: "bg-amber-50 text-amber-800 ring-amber-100",
  },
};

export const userTableColumns = [
  columnHelper.accessor("fullName", {
    header: "Họ tên",
    cell: (info) => {
      const user = info.row.original;
      const displayName = info.getValue() || user.username;

      return (
        <div className="flex min-w-[220px] items-center gap-4">
          <Avatar size="lg">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
            />
            <AvatarFallback className="bg-primary/10 font-bold text-primary">
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="text-sm font-bold leading-5 text-foreground transition-colors group-hover:text-primary">
              {displayName}
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">
              ID: {user.id.slice(0, 8)}
            </p>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor("email", {
    header: "Thông tin liên hệ",
    cell: (info) => (
      <div className="min-w-[220px]">
        <p className="text-sm font-medium text-foreground">
          {info.getValue()}
        </p>
        <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">
          @{info.row.original.username}
        </p>
      </div>
    ),
  }),
  columnHelper.accessor("role", {
    header: "Vai trò",
    cell: (info) => {
      const role = info.getValue();
      const config = roleStyles[role] ?? {
        label: role,
        className: "bg-zinc-100 text-zinc-700 ring-zinc-200",
      };

      return (
        <Badge
          variant="secondary"
          className={cn(
            "h-auto rounded-lg px-3 py-1 text-[11px] font-bold uppercase tracking-wide ring-1",
            config.className,
          )}
        >
          {config.label}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("isLocked", {
    header: "Trạng thái",
    cell: (info) => {
      const isLocked = info.getValue();
      const user = info.row.original;
      const isPendingTeacher =
        user.role === UserRole.TEACHER && user.isLocked;

      return (
        <Badge
          variant="secondary"
          className={cn(
            "h-auto rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide ring-1",
            isLocked
              ? isPendingTeacher
                ? "bg-sky-50 text-sky-700 ring-sky-100"
                : "bg-rose-50 text-rose-700 ring-rose-100"
              : "bg-emerald-50 text-emerald-700 ring-emerald-100",
          )}
        >
          {isLocked
            ? isPendingTeacher
              ? "Chờ xác thực"
              : "Đã khóa"
            : "Đang hoạt động"}
        </Badge>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: () => <div className="text-right">Thao tác</div>,
    cell: (info) => (
      <div className="flex justify-end">
        <UserTableActions myUser={info.row.original} />
      </div>
    ),
  }),
];
