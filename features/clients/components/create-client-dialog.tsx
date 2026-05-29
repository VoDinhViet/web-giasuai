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
import { createClient } from "../actions/create-client"
import { ClientForm } from "./client-form"

export function CreateClientDialog() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="lg">
          <UserPlus className="size-4" />
          Thêm khách hàng
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-149">
        <DialogHeader>
          <DialogTitle>Thêm khách hàng mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin khách hàng để thêm vào danh sách quản lý.
          </DialogDescription>
        </DialogHeader>
        <ClientForm
          submitLabel="Lưu khách hàng"
          submittingLabel="Đang lưu..."
          submitErrorMessage="Không thể tạo khách hàng. Vui lòng thử lại."
          onCancel={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false)
            router.refresh()
          }}
          onSubmit={createClient}
        />
      </DialogContent>
    </Dialog>
  )
}
