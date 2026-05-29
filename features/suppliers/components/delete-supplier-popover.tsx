"use client"

import * as React from "react"
import { AlertTriangle, Trash2 } from "lucide-react"
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
import { deleteSupplier } from "../actions/delete-supplier"
import type { Supplier } from "../types"

type DeleteSupplierPopoverProps = {
  supplier: Supplier
}

export function DeleteSupplierPopover({
  supplier,
}: DeleteSupplierPopoverProps) {
  const [open, setOpen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  function handleDelete() {
    startTransition(async () => {
      await deleteSupplier(supplier.id)
      setOpen(false)
      router.refresh()
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
              aria-label={`Xóa ${supplier.name}`}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>Xóa</TooltipContent>
      </Tooltip>
      <PopoverContent
        align="end"
        side="top"
        sideOffset={8}
        className="w-80 gap-0 overflow-hidden p-0"
      >
        <div className="flex gap-3 border-b border-border/70 bg-destructive/5 p-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded bg-destructive/10 text-destructive">
            <AlertTriangle className="size-4" />
          </span>
          <PopoverHeader className="min-w-0 gap-1">
            <PopoverTitle className="text-sm font-semibold text-foreground">
              Xóa nhà cung cấp?
            </PopoverTitle>
            <PopoverDescription className="text-xs leading-5">
              Thao tác này không thể hoàn tác.
            </PopoverDescription>
          </PopoverHeader>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <div className="rounded border border-border/70 bg-muted/30 px-3 py-2.5">
            <p className="truncate text-sm font-semibold text-foreground">
              {supplier.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {supplier.code || "Mã nhà cung cấp chưa có"}
            </p>
          </div>

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
              variant="destructive"
              size="sm"
              disabled={isPending}
              onClick={handleDelete}
            >
              {isPending ? "Đang xóa..." : "Xóa"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
