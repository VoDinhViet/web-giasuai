"use client"

import { ChevronDown, ChevronRight, GitBranch, Plus } from "lucide-react"
import { useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { productItemTypeLabel } from "../../constants/product-table-constants"
import {
  ProductItemType,
  type BomTreeNode,
  type ProductFormOptions,
} from "../../types"
import { AddBomNodeDialog } from "./add-bom-node-dialog"
import { BomQtyField } from "./bom-qty-field"
import { DeleteBomLineDialog } from "./delete-bom-line-dialog"
import { ProductImagePreviewDialog } from "../media/product-image-preview-dialog"
import { RoutingDialog } from "../routing/routing-dialog"

type BomTreeGridProps = {
  productId: string
  revisionId: string | null
  tree: BomTreeNode | null
  formOptions: ProductFormOptions
}

type BomTreeRow = BomTreeNode & {
  ancestorLastStates: boolean[]
  depth: number
  isLast: boolean
  rowKey: string
}

export function BomTreeGrid({
  productId,
  revisionId,
  tree,
  formOptions,
}: BomTreeGridProps) {
  const [collapsedRowKeys, setCollapsedRowKeys] = useState<Set<string>>(
    () => new Set()
  )
  const allRows = tree ? flattenBomTree(tree) : []
  const rows = tree ? flattenBomTree(tree, collapsedRowKeys) : []
  const routedNodeCount = allRows.filter((row) => row.hasRouting).length
  const maxDepth = allRows.reduce((max, row) => Math.max(max, row.depth), 0)

  function toggleRowCollapsed(rowKey: string) {
    setCollapsedRowKeys((currentRowKeys) => {
      const nextRowKeys = new Set(currentRowKeys)

      if (nextRowKeys.has(rowKey)) {
        nextRowKeys.delete(rowKey)
      } else {
        nextRowKeys.add(rowKey)
      }

      return nextRowKeys
    })
  }

  return (
    <div className="overflow-hidden rounded-(--radius) border border-border/80 bg-card shadow-xs">
      <div className="border-b border-border/70 px-5 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="border-l-4 border-primary pl-4">
            <div className="flex items-center gap-2">
              <GitBranch className="size-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">
                BOM - Routing
              </h2>
            </div>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              Hiển thị cấu trúc cha con theo revision hiện tại. Node FG/WIP có
              thể mở rộng để thêm bán thành phẩm, nguyên vật liệu hoặc vật tư
              tiêu hao; trạng thái routing cho biết node đã có quy trình sản
              xuất hay chưa.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <BomMetricBadge label="Tổng node" value={allRows.length} />
            <BomMetricBadge label="Đang hiển thị" value={rows.length} />
            <BomMetricBadge label="Có routing" value={routedNodeCount} />
            <BomMetricBadge label="Cấp sâu nhất" value={maxDepth} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-220">
          <TableHeader className="bg-muted/30">
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="w-18 px-5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                Hình
              </TableHead>
              <TableHead className="w-36 px-5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                Mã
              </TableHead>
              <TableHead className="px-5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                Tên
              </TableHead>
              <TableHead className="w-36 px-5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                Loại
              </TableHead>
              <TableHead className="w-24 px-5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                SL
              </TableHead>
              <TableHead className="w-24 px-5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                ĐV
              </TableHead>
              <TableHead className="w-28 px-5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                Routing
              </TableHead>
              <TableHead className="w-32 px-5 text-right text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow
                  key={row.rowKey}
                  className="h-14 border-border/35 hover:bg-muted/25"
                >
                  <TableCell className="px-5 py-3">
                    <BomProductImage node={row} />
                  </TableCell>
                  <TableCell className="px-5 py-3 text-sm font-semibold text-foreground">
                    {row.code}
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <BomTreeProductName
                      row={row}
                      isCollapsed={collapsedRowKeys.has(row.rowKey)}
                      onToggle={toggleRowCollapsed}
                    />
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <BomItemTypeBadge itemType={row.itemType} />
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <BomQtyField
                      key={`${row.rowKey}-${row.qty}`}
                      productId={productId}
                      revisionId={revisionId}
                      bomLineId={row.bomLineId}
                      itemType={row.itemType}
                      qty={row.qty}
                      unitId={row.unit?.id ?? ""}
                    />
                  </TableCell>
                  <TableCell className="px-5 py-3 text-sm font-medium text-foreground">
                    {row.unit?.code || "--"}
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <RoutingBadge hasRouting={row.hasRouting} />
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      {revisionId ? (
                        <AddBomNodeDialog
                          productId={productId}
                          revisionId={revisionId}
                          parentNode={row}
                          formOptions={formOptions}
                        />
                      ) : (
                        <BomActionButton label="Thêm node" icon={<Plus />} />
                      )}
                      <RoutingDialog
                        productId={productId}
                        revisionId={revisionId}
                        node={row}
                        formOptions={formOptions}
                      />
                      <DeleteBomLineDialog
                        productId={productId}
                        revisionId={revisionId}
                        node={row}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="px-5 py-10 text-center text-sm text-muted-foreground"
                >
                  <div className="mx-auto grid max-w-md gap-1">
                    <span className="font-medium text-foreground">
                      Chưa có dữ liệu BOM cho revision này.
                    </span>
                    <span>
                      Tạo sản phẩm gốc hoặc thêm node con để bắt đầu khai báo
                      định mức và routing sản xuất.
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function BomMetricBadge({ label, value }: { label: string; value: number }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-(--radius) border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
      <span>{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </span>
  )
}

function BomProductImage({ node }: { node: BomTreeNode }) {
  return (
    <ProductImagePreviewDialog
      code={node.code}
      imageUrl={node.imageUrl}
      name={node.name}
      size="sm"
    />
  )
}

function BomTreeProductName({
  isCollapsed,
  onToggle,
  row,
}: {
  isCollapsed: boolean
  onToggle: (rowKey: string) => void
  row: BomTreeRow
}) {
  const childCount = row.children.length
  const hasChildren = childCount > 0

  return (
    <div className="flex min-w-0 items-center">
      <div className="flex shrink-0 self-stretch">
        {row.ancestorLastStates.map((ancestorIsLast, index) => (
          <span
            key={`${row.rowKey}-ancestor-${index}`}
            className="relative flex w-5 shrink-0 justify-center"
            aria-hidden="true"
          >
            {!ancestorIsLast ? (
              <span className="absolute inset-y-0 w-px bg-border" />
            ) : null}
          </span>
        ))}

        {row.depth > 0 ? (
          <span
            className="relative flex w-6 shrink-0 items-center"
            aria-hidden="true"
          >
            <span className="absolute top-0 left-1/2 h-1/2 w-px bg-border" />
            {!row.isLast ? (
              <span className="absolute bottom-0 left-1/2 h-1/2 w-px bg-border" />
            ) : null}
            <span className="ml-[50%] h-px w-4 bg-border" />
          </span>
        ) : null}
      </div>

      {hasChildren ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={
            isCollapsed ? `Mở nhánh ${row.code}` : `Thu gọn nhánh ${row.code}`
          }
          className="mr-1 shrink-0 text-muted-foreground hover:text-foreground"
          onClick={() => onToggle(row.rowKey)}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronDown />}
        </Button>
      ) : (
        <span className="mr-1 size-7 shrink-0" aria-hidden="true" />
      )}

      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "inline-flex shrink-0 items-center rounded-(--radius) px-2 py-0.5 text-[10px] leading-4 font-semibold uppercase",
              row.depth === 0
                ? "bg-primary-fixed text-primary"
                : "bg-muted text-muted-foreground"
            )}
          >
            {row.depth === 0 ? "Root" : `Cấp ${row.depth}`}
          </span>
          <span className="truncate text-sm font-semibold text-foreground">
            {row.name}
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {childCount > 0
            ? `${childCount} node con trong BOM`
            : "Node cuối trong nhánh BOM"}
        </p>
      </div>
    </div>
  )
}

function BomItemTypeBadge({ itemType }: { itemType: ProductItemType }) {
  return (
    <span
      className={cn(
        "inline-flex max-w-36 items-center justify-center rounded-(--radius) px-2.5 py-1 text-center text-[10px] leading-4 font-semibold uppercase",
        itemType === ProductItemType.FG && "bg-primary-fixed text-primary",
        itemType === ProductItemType.WIP &&
          "bg-secondary-fixed/80 text-on-secondary-container",
        itemType === ProductItemType.RM &&
          "bg-tertiary-fixed/80 text-on-tertiary-container",
        itemType === ProductItemType.CONSUMABLE &&
          "bg-muted text-muted-foreground ring-1 ring-border"
      )}
    >
      {productItemTypeLabel[itemType]}
    </span>
  )
}

function RoutingBadge({ hasRouting }: { hasRouting: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex max-w-24 items-center justify-center rounded-(--radius) px-2.5 py-1 text-center text-[10px] leading-4 font-semibold uppercase",
        hasRouting
          ? "bg-success-container/80 text-success ring-1 ring-success/15"
          : "bg-muted text-muted-foreground ring-1 ring-border"
      )}
    >
      {hasRouting ? "Có" : "Chưa có"}
    </span>
  )
}

function BomActionButton({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={label}
          disabled
          className="text-muted-foreground hover:text-foreground"
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function flattenBomTree(
  tree: BomTreeNode,
  collapsedRowKeys = new Set<string>()
): BomTreeRow[] {
  const rows: BomTreeRow[] = []

  function visit(
    node: BomTreeNode,
    path: string,
    depth: number,
    isLast: boolean,
    ancestorLastStates: boolean[]
  ) {
    rows.push({
      ...node,
      ancestorLastStates,
      depth,
      isLast,
      rowKey: path,
    })

    const childAncestorLastStates =
      depth === 0 ? ancestorLastStates : [...ancestorLastStates, isLast]

    if (collapsedRowKeys.has(path)) {
      return
    }

    node.children.forEach((child, index) => {
      visit(
        child,
        `${path}.${index}-${child.id}`,
        depth + 1,
        index === node.children.length - 1,
        childAncestorLastStates
      )
    })
  }

  visit(tree, tree.id, 0, true, [])

  return rows
}
