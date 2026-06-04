import Link from "next/link"
import type { Route } from "next"
import type { ColumnDef } from "@tanstack/react-table"
import { Eye, Lock, Mail, MoreHorizontal, ShieldCheck, Unlock } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { resolveApiAssetUrl } from "@/lib/asset-url"
import { getNameInitials } from "@/lib/string.util"
import { cn } from "@/lib/utils"
import { statusLabel } from "../../constants/user-table-constants"
import { UserStatus, type User } from "../../types"
import { getUserRoleLabel } from "../../utils/user-role.util"

type CreateUsersTableColumnsProps = {
  onToggleUserStatus: (userId: string) => void
}

export function createUsersTableColumns({
  onToggleUserStatus,
}: CreateUsersTableColumnsProps): ColumnDef<User>[] {
  return [
    {
      id: "rowNumber",
      header: "#",
      cell: ({ row }) => (
        <span className="inline-flex size-7 items-center justify-center rounded bg-muted/60 text-xs font-bold text-muted-foreground">
          {row.index + 1}
        </span>
      ),
    },
    {
      accessorKey: "username",
      header: "Tên đăng nhập",
      cell: ({ row }) => (
        <div className="min-w-0">
          <span className="block max-w-34 truncate text-sm font-semibold text-foreground">
            @{row.original.username}
          </span>
          <span className="mt-0.5 block text-xs text-muted-foreground">
            ID rút gọn: {row.original.id.slice(0, 8)}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "fullName",
      header: "Họ và tên",
      cell: ({ row }) => {
        const user = row.original
        const avatarSrc = getUserAvatarSrc(user)

        return (
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="size-9 border border-border/60 shadow-xs">
              {avatarSrc ? (
                <AvatarImage src={avatarSrc} alt={user.fullName} />
              ) : null}
              <AvatarFallback className="bg-primary-fixed text-xs font-bold text-primary">
                {getNameInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="max-w-48 truncate text-sm leading-5 font-semibold text-foreground">
                {user.fullName}
              </p>
              <p className="mt-0.5 max-w-48 truncate text-xs text-muted-foreground">
                {user.profile?.phone ?? "Chưa có số điện thoại"}
              </p>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "role",
      header: "Vai trò",
      cell: ({ row }) => (
        <span
          className={cn(
            "inline-flex max-w-36 items-center gap-1.5 rounded px-2.5 py-1 text-xs font-bold ring-1",
            getUserRoleClassName(row.original.role)
          )}
        >
          <ShieldCheck className="size-3.5" />
          <span className="truncate">{getUserRoleLabel(row.original.role)}</span>
        </span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
          <Mail className="size-4 shrink-0 text-secondary" />
          <span
            className="block max-w-64 truncate text-sm font-medium text-foreground"
            title={row.original.email}
          >
            {row.original.email}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "isLocked",
      header: "Trạng thái",
      cell: ({ row }) => {
        const status = row.original.isLocked
          ? UserStatus.INACTIVE
          : UserStatus.ACTIVE

        return (
          <span
            className={cn(
              "inline-flex max-w-32 items-center justify-center rounded px-2.5 py-1 text-center text-xs leading-4 font-bold ring-1",
              status === UserStatus.ACTIVE
                ? "bg-success-container/80 text-success ring-success/15"
                : "bg-error-container/50 text-destructive ring-destructive/10"
            )}
          >
            {statusLabel[status]}
          </span>
        )
      },
    },
    {
      id: "actions",
      header: () => <span className="block text-right">Thao tác</span>,
      cell: ({ row }) => {
        const user = row.original
        const status = user.isLocked ? UserStatus.INACTIVE : UserStatus.ACTIVE

        return (
          <div className="flex justify-end gap-1.5 text-muted-foreground">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={
                    status === UserStatus.ACTIVE
                      ? "Ngừng hoạt động"
                      : "Kích hoạt người dùng"
                  }
                  onClick={() => onToggleUserStatus(user.id)}
                >
                  {status === UserStatus.ACTIVE ? <Lock /> : <Unlock />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {status === UserStatus.ACTIVE
                  ? "Ngừng hoạt động"
                  : "Kích hoạt người dùng"}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Xem chi tiết"
                  asChild
                >
                  <Link href={`/manage/users/${user.id}` as Route}>
                    <Eye />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Xem chi tiết</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Thao tác khác"
                >
                  <MoreHorizontal />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Thao tác khác</TooltipContent>
            </Tooltip>
          </div>
        )
      },
    },
  ]
}

function getUserRoleClassName(role: User["role"]) {
  switch (role) {
    case "ADMIN":
      return "bg-primary/10 text-primary ring-primary/15"
    case "TEACHER":
      return "bg-secondary/10 text-secondary ring-secondary/15"
    case "STUDENT":
      return "bg-tertiary/10 text-tertiary ring-tertiary/15"
  }
}

function getUserAvatarSrc(user: User) {
  const userWithAvatar = user as User & {
    avatarUrl?: string | null
    imageUrl?: string | null
    photoUrl?: string | null
  }

  return resolveApiAssetUrl(
    user.profile?.avatarUrl ??
      userWithAvatar.avatarUrl ??
      userWithAvatar.imageUrl ??
      userWithAvatar.photoUrl
  )
}
