"use client"

import { useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Pencil } from "lucide-react"

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
import { updateOrder } from "../../actions/update-order"
import { uploadOrderPdf } from "../../actions/upload-order-pdf"
import { uploadProductTechnicalFile } from "../../actions/upload-product-technical-file"
import type { Order, OrderFormOptions } from "../../types"
import { OrderForm } from "../forms/order-form"

type EditOrderDialogProps = {
  disabled?: boolean
  formOptions: OrderFormOptions
  order: Order
  trigger?: ReactNode
}

export function EditOrderDialog({
  disabled = false,
  formOptions,
  order,
  trigger,
}: EditOrderDialogProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild disabled={disabled}>
            {trigger ?? (
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={`Sửa ${order.code}`}
                className="text-muted-foreground hover:text-foreground"
              >
                <Pencil />
              </Button>
            )}
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          {disabled ? "Đơn đã duyệt không thể sửa" : "Sửa đơn hàng"}
        </TooltipContent>
      </Tooltip>

      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-235">
        <DialogHeader>
          <DialogTitle>Sửa đơn hàng</DialogTitle>
          <DialogDescription>
            Chỉ đơn chờ duyệt hoặc bị từ chối mới được chỉnh sửa. Đơn bị từ chối
            sẽ quay lại trạng thái chờ duyệt sau khi lưu.
          </DialogDescription>
        </DialogHeader>
        <OrderForm
          order={order}
          formOptions={formOptions}
          submitLabel="Cập nhật đơn hàng"
          submittingLabel="Đang cập nhật..."
          onCancel={() => setOpen(false)}
          onTechnicalFileUpload={async (productId, file) => {
            const formData = new FormData()
            formData.set("file", file)

            return uploadProductTechnicalFile(productId, formData)
          }}
          onSubmit={async (value, pdfFile) => {
            const updatedOrder = await updateOrder(order.id, value)

            if (pdfFile) {
              const formData = new FormData()
              formData.set("file", pdfFile)
              await uploadOrderPdf(order.id, formData)
            }

            return updatedOrder
          }}
          onSuccess={() => {
            setOpen(false)
            router.refresh()
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
