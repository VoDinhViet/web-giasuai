"use client"

import { useState, useTransition } from "react"
import type { Route } from "next"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { deleteOrder } from "../../actions/delete-order"
import type { Order } from "../../types"

type OrderDeleteDialogProps = {
  disabled?: boolean
  order: Order
  redirectTo?: Route
}

export function OrderDeleteDialog({
  disabled = false,
  order,
  redirectTo,
}: OrderDeleteDialogProps) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleDelete() {
    setError(null)

    startTransition(async () => {
      try {
        await deleteOrder(order.id)
        setOpen(false)

        if (redirectTo) {
          router.push(redirectTo)
        } else {
          router.refresh()
        }
      } catch {
        setError("Không thể xóa đơn hàng. Vui lòng thử lại.")
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild disabled={disabled}>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Xóa ${order.code}`}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          {disabled ? "Đơn đã duyệt không thể xóa" : "Xóa đơn hàng"}
        </TooltipContent>
      </Tooltip>

      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden rounded-xl p-0 sm:max-w-105"
      >
        <div className="grid justify-items-center px-6 pt-8 pb-6 text-center">
          <span className="mb-5 flex size-24 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <Trash2 className="size-11" />
          </span>

          <DialogTitle className="text-xl leading-7 font-semibold text-foreground">
            Xóa đơn hàng?
          </DialogTitle>
          <DialogDescription className="mt-2 max-w-72 text-sm leading-5 text-muted-foreground">
            Đơn hàng sẽ được xóa khỏi danh sách quản lý nếu chưa được duyệt.
            Thao tác này không thể hoàn tác trên giao diện.
          </DialogDescription>

          <p className="mt-4 max-w-76 truncate text-xs font-semibold text-foreground">
            {order.code} - {order.client.fullName}
          </p>

          {error ? (
            <p className="mt-3 text-xs leading-5 text-destructive">{error}</p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-4 px-6 pb-6">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => setOpen(false)}
            className="h-11 border-destructive/60 text-destructive hover:bg-destructive/5 hover:text-destructive"
          >
            Hủy bỏ
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
            className="h-11"
          >
            {isPending ? "Đang xóa..." : "Xóa"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
