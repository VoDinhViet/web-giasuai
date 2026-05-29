"use client"

import * as React from "react"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Role } from "@/types/user"
import type { User } from "../types"
import { EditUserForm } from "./edit-user-form"

type EditUserDialogProps = {
  user: User
  initialRoles: Role[]
}

export function EditUserDialog({ user, initialRoles }: EditUserDialogProps) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Chỉnh sửa ${user.fullName}`}
              className="text-muted-foreground hover:text-foreground"
            >
              <Pencil />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Chỉnh sửa</TooltipContent>
      </Tooltip>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-149">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa nhân sự</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin cá nhân, vai trò và trạng thái của nhân sự.
          </DialogDescription>
        </DialogHeader>
        <EditUserForm
          user={user}
          initialRoles={initialRoles}
          onCancel={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false)
            router.refresh()
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
