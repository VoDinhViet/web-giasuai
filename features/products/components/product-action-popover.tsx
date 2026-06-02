"use client"

import * as React from "react"
import { AlertTriangle, Copy, Lock, LockOpen, Trash2 } from "lucide-react"
import type { Route } from "next"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { copyProduct } from "../actions/copy-product"
import { deleteProduct } from "../actions/delete-product"
import { lockProduct } from "../actions/lock-product"
import { unlockProduct } from "../actions/unlock-product"
import { ProductStatus, type Product } from "../types"

type ProductAction = "lock" | "copy" | "delete"

type ProductActionPopoverProps = {
  action: ProductAction
  product: Product
  redirectCopiedProduct?: boolean
}

const actionContent: Record<
  ProductAction,
  {
    description: string
    icon: React.ReactNode
    pendingLabel: string
    title: string
    tooltip: string
  }
> = {
  lock: {
    description:
      "Sản phẩm bị khóa sẽ không thể sửa thông tin, BOM hoặc routing.",
    icon: <Lock />,
    pendingLabel: "Đang khóa...",
    title: "Khóa sản phẩm?",
    tooltip: "Khóa sản phẩm",
  },
  copy: {
    description:
      "Hệ thống sẽ sao chép thông tin sản phẩm, revision, BOM và routing hiện tại.",
    icon: <Copy />,
    pendingLabel: "Đang sao chép...",
    title: "Sao chép sản phẩm?",
    tooltip: "Sao chép sản phẩm",
  },
  delete: {
    description: "Thao tác này sẽ xóa mềm sản phẩm khỏi danh sách quản lý.",
    icon: <Trash2 />,
    pendingLabel: "Đang xóa...",
    title: "Xóa sản phẩm?",
    tooltip: "Xóa sản phẩm",
  },
}

export function ProductActionPopover({
  action,
  product,
  redirectCopiedProduct = false,
}: ProductActionPopoverProps) {
  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()
  const isLocked = product.status === ProductStatus.LOCKED
  const content =
    action === "lock" && isLocked
      ? {
          description:
            "Sản phẩm sẽ được mở lại để chỉnh sửa thông tin, BOM và routing.",
          icon: <LockOpen />,
          pendingLabel: "Đang mở khóa...",
          title: "Mở khóa sản phẩm?",
          tooltip: "Mở khóa sản phẩm",
        }
      : actionContent[action]
  const isDestructive = action === "delete"

  function handleConfirm() {
    setError(null)

    startTransition(async () => {
      try {
        if (action === "lock") {
          if (isLocked) {
            await unlockProduct(product.id)
          } else {
            await lockProduct(product.id)
          }
        }

        if (action === "copy") {
          const copiedProduct = await copyProduct(product.id)

          if (redirectCopiedProduct) {
            router.push(`/manage/products/${copiedProduct.id}` as Route)
          }
        }

        if (action === "delete") {
          await deleteProduct(product.id)
        }

        setOpen(false)
        if (!redirectCopiedProduct || action !== "copy") {
          router.refresh()
        }
      } catch {
        setError("Không thể thực hiện thao tác. Vui lòng thử lại.")
      }
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`${content.tooltip} ${product.code}`}
              className={cn(
                "text-muted-foreground hover:text-foreground",
                isDestructive && "hover:text-destructive"
              )}
            >
              {content.icon}
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>{content.tooltip}</TooltipContent>
      </Tooltip>

      <PopoverContent
        align="end"
        side="top"
        sideOffset={8}
        className="w-80 gap-0 overflow-hidden p-0"
      >
        <div
          className={cn(
            "flex gap-3 border-b border-border/70 p-4",
            isDestructive ? "bg-destructive/5" : "bg-muted/30"
          )}
        >
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded",
              "[&_svg]:size-4",
              isDestructive
                ? "bg-destructive/10 text-destructive"
                : "bg-primary/10 text-primary"
            )}
          >
            {isDestructive ? (
              <AlertTriangle className="size-4" />
            ) : (
              content.icon
            )}
          </span>
          <PopoverHeader className="min-w-0 gap-1">
            <PopoverTitle className="text-sm font-semibold text-foreground">
              {content.title}
            </PopoverTitle>
            <PopoverDescription className="text-xs leading-5">
              {content.description}
            </PopoverDescription>
          </PopoverHeader>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <div className="rounded border border-border/70 bg-muted/30 px-3 py-2.5">
            <p className="truncate text-sm font-semibold text-foreground">
              {product.name}
            </p>
            <p className="text-xs text-muted-foreground">{product.code}</p>
          </div>

          {error ? (
            <p className="text-xs leading-5 text-destructive">{error}</p>
          ) : null}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={() => setOpen(false)}
            >
              Hủy bỏ
            </Button>
            <Button
              type="button"
              variant={isDestructive ? "destructive" : "default"}
              size="sm"
              disabled={isPending}
              onClick={handleConfirm}
            >
              {isPending ? content.pendingLabel : "Xác nhận"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
