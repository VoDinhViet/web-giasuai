import { formatNumber } from "@/lib/number.util"

export function ImportStatusSummary({
  invalidRowCount,
  warningRowCount,
}: {
  invalidRowCount: number
  warningRowCount: number
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="inline-flex h-8 items-center rounded bg-muted/50 px-3 text-xs font-semibold text-tertiary ring-1 ring-border/70">
        {formatNumber(warningRowCount)} cảnh báo
      </span>
      <span className="inline-flex h-8 items-center rounded bg-muted/50 px-3 text-xs font-semibold text-destructive ring-1 ring-border/70">
        {formatNumber(invalidRowCount)} lỗi
      </span>
    </div>
  )
}
