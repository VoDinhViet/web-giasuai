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
import { updateSupplier } from "../actions/update-supplier"
import type { Supplier } from "../types"
import { SupplierForm } from "./supplier-form"

type EditSupplierDialogProps = {
  supplier: Supplier
}

export function EditSupplierDialog({ supplier }: EditSupplierDialogProps) {
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
              aria-label={`Chỉnh sửa ${supplier.name}`}
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
          <DialogTitle>Chỉnh sửa nhà cung cấp</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin liên hệ và địa chỉ nhà cung cấp.
          </DialogDescription>
        </DialogHeader>
        <SupplierForm
          supplier={supplier}
          submitLabel="Cập nhật nhà cung cấp"
          submittingLabel="Đang cập nhật..."
          submitErrorMessage="Không thể cập nhật nhà cung cấp. Vui lòng thử lại."
          onCancel={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false)
            router.refresh()
          }}
          onSubmit={(value) => updateSupplier(supplier.id, value)}
        />
      </DialogContent>
    </Dialog>
  )
}
