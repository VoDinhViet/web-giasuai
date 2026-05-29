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
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateUserForm } from "./create-user-form"

export function CreateUserDialog() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="lg">
          <UserPlus className="size-4" />
          Thêm nhân sự
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-149">
        <DialogHeader>
          <DialogTitle>Thêm nhân sự mới</DialogTitle>
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
