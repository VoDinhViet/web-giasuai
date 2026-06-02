"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { deleteBomLine } from "../actions/delete-bom-line"
import type { BomTreeNode } from "../types"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"

type DeleteBomLineDialogProps = {
  node: BomTreeNode
  productId: string
  revisionId: string | null
}

export function DeleteBomLineDialog({
  node,
  productId,
  revisionId,
}: DeleteBomLineDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()
  const canDelete = Boolean(revisionId && node.bomLineId)

  function handleDelete() {
    if (!revisionId || !node.bomLineId) {
      return
    }

    setError(null)
    startTransition(async () => {
      try {
        await deleteBomLine(productId, revisionId, node.bomLineId as string)
        setOpen(false)
        router.refresh()
      } catch {
        setError("Không thể xóa node BOM. Vui lòng thử lại.")
      }
    })
  }

  return (
    <DeleteConfirmationDialog
      open={open}
      onOpenChange={setOpen}
      title="Xóa node BOM?"
      description="Node này và các node con phía dưới nhánh sẽ được xóa khỏi BOM."
      itemLabel={`${node.code} - ${node.name}`}
      tooltip={canDelete ? "Xóa node" : "Không thể xóa root"}
      pendingLabel="Đang xóa..."
      error={error}
      isPending={isPending}
      disabled={!canDelete}
      onConfirm={handleDelete}
      trigger={
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={`Xóa ${node.code}`}
          disabled={!canDelete}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 />
        </Button>
      }
    />
  )
}
