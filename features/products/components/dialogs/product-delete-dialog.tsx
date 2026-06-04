"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"
import type { Route } from "next"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { deleteProduct } from "../../actions/delete-product"
import type { Product } from "../../types"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"

type ProductDeleteDialogProps = {
  product: Product
  redirectTo?: Route
}

export function ProductDeleteDialog({
  product,
  redirectTo,
}: ProductDeleteDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  function handleDelete() {
    setError(null)

    startTransition(async () => {
      try {
        await deleteProduct(product.id)
        setOpen(false)
        if (redirectTo) {
          router.push(redirectTo)
        } else {
          router.refresh()
        }
      } catch {
        setError("Không thể xóa sản phẩm. Vui lòng thử lại.")
      }
    })
  }

  return (
    <DeleteConfirmationDialog
      open={open}
      onOpenChange={setOpen}
      title="Xóa sản phẩm?"
      description="Sản phẩm sẽ được xóa khỏi danh sách quản lý và không thể dùng cho dữ liệu mới."
      itemLabel={`${product.code} - ${product.name}`}
      tooltip="Xóa sản phẩm"
      pendingLabel="Đang xóa..."
      error={error}
      isPending={isPending}
      onConfirm={handleDelete}
      trigger={
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={`Xóa ${product.code}`}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 />
        </Button>
      }
    />
  )
}
