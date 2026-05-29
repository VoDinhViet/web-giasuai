import type { ColumnDef } from "@tanstack/react-table"
import { Lock, Mail, MoreVertical, Phone, Unlock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { Role } from "@/types/user"
import { statusLabel } from "../lib/user-table-constants"
import { formatBirthDate } from "../lib/user-date.util"
import { getGenderLabel } from "../lib/user-input.util"
import { UserStatus, type User } from "../types"
import { EditUserDialog } from "./edit-user-dialog"

type CreateUsersTableColumnsProps = {
  roles: Role[]
  onToggleUserStatus: (userId: string, currentStatus?: UserStatus) => void
}

export function createUsersTableColumns({
  roles,
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
              <p className="max-w-40 truncate text-sm leading-5 font-semibold text-foreground">
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
      cell: ({ row }) => {
        const email = row.original.email || "--"
        const phoneNumber = row.original.phoneNumber || "--"

        return (
          <div className="flex min-w-0 flex-col gap-1.5 text-sm">
            <div className="flex min-w-0 items-center gap-2">
              <Mail className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="w-10 shrink-0 text-[10px] leading-4 font-semibold text-muted-foreground uppercase">
                Email
              </span>
              <span
                className="min-w-0 truncate leading-5 font-medium text-foreground"
                title={email}
              >
                {email}
              </span>
            </div>
            <div className="flex min-w-0 items-center gap-2">
              <Phone className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="w-10 shrink-0 text-[10px] leading-4 font-semibold text-muted-foreground uppercase">
                SĐT
              </span>
              <span
                className="min-w-0 truncate leading-5 text-muted-foreground"
                title={phoneNumber}
              >
                {phoneNumber}
              </span>
            </div>
          </div>
        )
      },
    },
    {
      id: "birthDateAndGender",
      header: "Ngày sinh / GT",
      cell: ({ row }) => (
        <div className="text-sm">
          <p className="leading-5 font-medium text-foreground">
            {formatBirthDate(row.original.birthDate || "")}
          </p>
          <p className="text-[10px] leading-4 font-semibold text-muted-foreground uppercase">
            {getGenderLabel(row.original.gender)}
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
            "inline-flex max-w-36 items-center justify-center rounded-(--radius) px-2.5 py-1 text-center text-[10px] leading-4 font-semibold uppercase",
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
      cell: ({ row }) => {
        const status =
          row.original.status === UserStatus.INACTIVE
            ? UserStatus.INACTIVE
            : UserStatus.ACTIVE

        return (
          <span
            className={cn(
              "inline-flex max-w-32 items-center justify-center rounded-(--radius) px-3 py-1 text-center text-[10px] leading-4 font-semibold uppercase",
              status === UserStatus.ACTIVE
                ? "bg-success-container/80 text-success ring-1 ring-success/15"
                : "bg-error-container/50 text-destructive ring-1 ring-destructive/10"
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
        const status =
          user.status === UserStatus.INACTIVE
            ? UserStatus.INACTIVE
            : UserStatus.ACTIVE

        return (
          <div className="flex justify-end gap-1 text-muted-foreground">
            <EditUserDialog user={user} initialRoles={roles} />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={
                    status === UserStatus.ACTIVE
                      ? "Ngừng hoạt động"
                      : "Kích hoạt nhân sự"
                  }
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => onToggleUserStatus(user.id, status)}
                >
                  {status === UserStatus.ACTIVE ? <Lock /> : <Unlock />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {status === UserStatus.ACTIVE
                  ? "Ngừng hoạt động"
                  : "Kích hoạt nhân sự"}
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
