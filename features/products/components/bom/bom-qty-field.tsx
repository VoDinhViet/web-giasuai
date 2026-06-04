"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateBomLine } from "../../actions/update-bom-line"
import { ProductItemType } from "../../types"

type BomQtyFieldProps = {
  bomLineId: string | null
  itemType: ProductItemType
  productId: string
  qty: string
  revisionId: string | null
  unitId: string
}

export function BomQtyField({
  bomLineId,
  itemType,
  productId,
  qty,
  revisionId,
  unitId,
}: BomQtyFieldProps) {
  const [value, setValue] = React.useState(qty)
  const [error, setError] = React.useState<string | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()
  const canEdit = Boolean(revisionId && bomLineId)
  const isChanged = value.trim() !== qty
  const requiresInteger = itemType === ProductItemType.WIP

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const numericValue = Number(value)

    if (!Number.isFinite(numericValue) || numericValue <= 0) {
      setError("Số lượng phải lớn hơn 0")
      return
    }

    if (requiresInteger && !Number.isInteger(numericValue)) {
      setError("WIP phải dùng số lượng nguyên")
      return
    }

    if (!revisionId || !bomLineId || !isChanged) {
      return
    }

    startTransition(async () => {
      try {
        await updateBomLine(productId, revisionId, bomLineId, {
          qty: value,
          unitId,
        })
        router.refresh()
      } catch {
        setError("Không thể cập nhật số lượng")
      }
    })
  }

  if (!canEdit) {
    return <span className="text-sm font-medium text-foreground">{qty}</span>
  }

  return (
    <form className="flex items-center gap-1" onSubmit={handleSubmit}>
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-invalid={Boolean(error)}
        title={error ?? undefined}
        inputMode={requiresInteger ? "numeric" : "decimal"}
        step={requiresInteger ? 1 : 0.001}
        min={0}
        className="h-8 w-20 px-2 text-sm font-medium"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon-xs"
        aria-label="Lưu số lượng"
        disabled={!isChanged || isPending}
        className="text-muted-foreground hover:text-foreground"
      >
        <Check />
      </Button>
    </form>
  )
}
