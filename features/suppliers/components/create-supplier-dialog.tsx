"use client"

import * as React from "react"
import { Truck } from "lucide-react"
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
import { createSupplier } from "../actions/create-supplier"
import { SupplierForm } from "./supplier-form"

export function CreateSupplierDialog() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="lg">
          <Truck className="size-4" />
          Thêm nhà cung cấp
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-149">
        <DialogHeader>
          <DialogTitle>Thêm nhà cung cấp mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin nhà cung cấp để thêm vào danh sách quản lý.
          </DialogDescription>
        </DialogHeader>
        <SupplierForm
          submitLabel="Lưu nhà cung cấp"
          submittingLabel="Đang lưu..."
          submitErrorMessage="Không thể tạo nhà cung cấp. Vui lòng thử lại."
          onCancel={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false)
            router.refresh()
          }}
          onSubmit={createSupplier}
        />
      </DialogContent>
    </Dialog>
  )
}
