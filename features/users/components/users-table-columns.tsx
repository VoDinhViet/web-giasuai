import type { ColumnDef } from "@tanstack/react-table"
import { Lock, MoreVertical, Pencil, Unlock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { genderLabel, statusLabel } from "../lib/user-table-constants"
import { formatBirthDate } from "../lib/user-utils"
import type { User, UserGender, UserStatus } from "../types"

type CreateUsersTableColumnsProps = {
  onToggleUserStatus: (userId: string, currentStatus?: string) => void
}

export function createUsersTableColumns({
  onToggleUserStatus,
}: CreateUsersTableColumnsProps): ColumnDef<User>[] {
  return [
    {
      accessorKey: "fullName",
      header: "Họ tên",
      cell: ({ row }) => {
        const user = row.original

        return (
          <div className="flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-[11px] font-semibold text-primary">
              {getUserInitials(user.fullName)}
            </span>
            <div className="min-w-0">
              <p className="max-w-40 truncate text-sm font-semibold leading-5 text-foreground">
                {user.fullName}
              </p>
              <p className="text-[10px] leading-4 text-muted-foreground">
                {formatEmployeeCode(user.id)}
              </p>
            </div>
          </div>
        )
      },
    },
    {
      id: "contact",
      header: "Thông tin liên lạc",
      cell: ({ row }) => (
        <div className="min-w-0 text-sm">
          <p className="max-w-44 truncate font-medium leading-5 text-foreground">
            {row.original.email}
          </p>
          <p className="text-[10px] leading-4 text-muted-foreground">
            {row.original.phoneNumber}
          </p>
        </div>
      ),
    },
    {
      id: "birthDateAndGender",
      header: "Ngày sinh / GT",
      cell: ({ row }) => (
        <div className="text-sm">
          <p className="font-medium leading-5 text-foreground">
            {formatBirthDate(row.original.birthDate || "")}
          </p>
          <p className="text-[10px] font-semibold uppercase leading-4 text-muted-foreground">
            {genderLabel[row.original.gender as UserGender] || "Khác"}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "position",
      header: "Chức vụ",
      cell: ({ row }) => (
        <span
          className={cn(
            "inline-flex max-w-36 items-center justify-center rounded-(--radius) px-2.5 py-1 text-center text-[10px] font-semibold uppercase leading-4",
            getPositionBadgeClassName(row.original.role?.name || "Nhân viên")
          )}
        >
          {row.original.role?.name || "Nhân viên"}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => (
        <span
          className={cn(
            "inline-flex max-w-32 items-center justify-center rounded-(--radius) px-3 py-1 text-center text-[10px] font-semibold uppercase leading-4",
            row.original.status === "active"
              ? "bg-success-container/80 text-success ring-1 ring-success/15"
              : "bg-error-container/50 text-destructive ring-1 ring-destructive/10"
          )}
        >
          {statusLabel[row.original.status as UserStatus] || "Hoạt động"}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <span className="block text-right">Thao tác</span>,
      cell: ({ row }) => {
        const user = row.original

        return (
          <div className="flex justify-end gap-1 text-muted-foreground">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Ch\u1ec9nh s\u1eeda ${user.fullName}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Pencil />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{"Ch\u1ec9nh s\u1eeda"}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={
                    user.status === "active" ? "Khóa nhân sự" : "Mở khóa"
                  }
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => onToggleUserStatus(user.id, user.status)}
                >
                  {user.status === "active" ? <Lock /> : <Unlock />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {user.status === "active" ? "Khóa nhân sự" : "Mở khóa"}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Thao tác khác"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <MoreVertical />
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

function getUserInitials(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((namePart) => namePart[0])
    .join("")
    .toUpperCase()
}

function formatEmployeeCode(userId: string) {
  const numericCode = userId.replace(/\D/g, "").padStart(3, "0")

  return `ID: EMP${numericCode}`
}

function getPositionBadgeClassName(position: string) {
  const normalizedPosition = position.toLowerCase()

  if (normalizedPosition.includes("kỹ") || normalizedPosition.includes("qc")) {
    return "bg-tertiary-fixed/80 text-on-tertiary-container"
  }

  if (normalizedPosition.includes("kho")) {
    return "bg-secondary-fixed/80 text-on-secondary-container"
  }

  return "bg-primary-fixed text-primary"
}
