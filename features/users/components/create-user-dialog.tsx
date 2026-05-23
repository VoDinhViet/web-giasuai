"use client"

import * as React from "react"
import { UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CreateUserForm } from "./create-user-form"

export function CreateUserDialog() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        size="lg"
        onClick={() => setOpen(true)}
      >
        <UserPlus className="size-4" />
        Thêm nhân sự
      </Button>
      <DialogContent className="max-h-[90svh] gap-0 overflow-y-auto p-0 sm:max-w-[596px]">
        <DialogHeader className="border-b border-border px-6 py-6">
          <DialogTitle className="text-2xl font-bold">
            Thêm nhân sự mới
          </DialogTitle>
          <DialogDescription>
            Nhập đầy đủ thông tin bên dưới để đăng ký nhân viên mới vào hệ
            thống.
          </DialogDescription>
        </DialogHeader>

        <CreateUserForm
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
