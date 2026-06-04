import { EmptyTable } from "@/components/shared/empty-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { ProductFormOptions } from "../../types"

type ProductUnitsTableProps = {
  units: ProductFormOptions["units"]
}

export function ProductUnitsTable({ units }: ProductUnitsTableProps) {
  return (
    <div className="min-w-0 overflow-hidden rounded-(--radius) border border-border/80 bg-card shadow-xs">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow className="border-border/60 hover:bg-transparent">
            <TableHead className="h-11 px-5 text-[10px] leading-4 font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              Mã đơn vị
            </TableHead>
            <TableHead className="h-11 px-5 text-[10px] leading-4 font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              Tên đơn vị
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {units.length ? (
            units.map((unit) => (
              <TableRow
                key={unit.id}
                className="h-14 border-border/35 hover:bg-muted/25"
              >
                <TableCell className="px-5 py-3">
                  <span className="inline-flex items-center rounded-(--radius) bg-secondary-fixed/80 px-2.5 py-1 text-[10px] leading-4 font-semibold tracking-[0.08em] text-on-secondary-container uppercase">
                    {unit.code || "--"}
                  </span>
                </TableCell>
                <TableCell className="px-5 py-3 text-sm font-medium text-foreground">
                  {unit.name}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="p-0">
                <EmptyTable />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
