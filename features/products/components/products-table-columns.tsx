import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import type { Route } from "next"
import { Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  productItemTypeLabel,
  productStatusLabel,
} from "../constants/product-table-constants"
import {
  ProductItemType,
  ProductStatus,
  type Product,
  type ProductFormOptions,
} from "../types"
import { EditProductDialog } from "./edit-product-dialog"
import { ProductActionPopover } from "./product-action-popover"
import { ProductDeleteDialog } from "./product-delete-dialog"
import { ProductImagePreviewDialog } from "./product-image-preview-dialog"

type CreateProductsTableColumnsArgs = {
  formOptions: ProductFormOptions
}

export function createProductsTableColumns({
  formOptions,
}: CreateProductsTableColumnsArgs): ColumnDef<Product>[] {
  return [
    {
      id: "image",
      header: "Hình ảnh",
      cell: ({ row }) => <ProductImage product={row.original} />,
    },
    {
      id: "client",
      header: "Khách hàng",
      cell: ({ row }) => (
        <div className="min-w-0">
          <p className="max-w-44 truncate text-sm leading-5 font-semibold text-foreground">
            {row.original.client?.fullName || "--"}
          </p>
          <p className="text-[10px] leading-4 font-medium text-muted-foreground">
            {row.original.client?.code || "--"}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "code",
      header: "Mã SP",
      cell: ({ row }) => (
        <span className="block max-w-44 truncate text-sm font-semibold text-foreground">
          {row.original.code}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: "Tên",
      cell: ({ row }) => (
        <span className="block max-w-64 truncate text-sm font-medium text-foreground">
          {row.original.name}
        </span>
      ),
    },
    {
      accessorKey: "itemType",
      header: "Loại",
      cell: ({ row }) => (
        <ProductItemTypeBadge itemType={row.original.itemType} />
      ),
    },
    {
      id: "revision",
      header: "Rev",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-foreground">
          {row.original.currentRevision?.revisionNo || "--"}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => <ProductStatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "note",
      header: "Ghi chú",
      cell: ({ row }) => (
        <span className="block max-w-64 truncate text-sm text-muted-foreground">
          {row.original.note || "--"}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <span className="block text-right">Thao tác</span>,
      cell: ({ row }) => {
        const product = row.original

        return (
          <div className="flex justify-end gap-1 text-muted-foreground">
            <ViewProductLink product={product} />
            <EditProductDialog product={product} formOptions={formOptions} />
            <ProductActionPopover action="lock" product={product} />
            <ProductActionPopover action="copy" product={product} />
            <ProductDeleteDialog product={product} />
          </div>
        )
      },
    },
  ]
}

function ProductImage({ product }: { product: Product }) {
  return (
    <ProductImagePreviewDialog
      code={product.code}
      imageUrl={product.imageUrl}
      name={product.name}
      size="sm"
    />
  )
}

function ProductItemTypeBadge({ itemType }: { itemType: ProductItemType }) {
  return (
    <span
      className={cn(
        "inline-flex max-w-36 items-center justify-center rounded-(--radius) px-2.5 py-1 text-center text-[10px] leading-4 font-semibold uppercase",
        getItemTypeBadgeClassName(itemType)
      )}
    >
      {productItemTypeLabel[itemType]}
    </span>
  )
}

function ProductStatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span
      className={cn(
        "inline-flex max-w-32 items-center justify-center rounded-(--radius) px-3 py-1 text-center text-[10px] leading-4 font-semibold uppercase",
        getStatusBadgeClassName(status)
      )}
    >
      {productStatusLabel[status]}
    </span>
  )
}

function ViewProductLink({ product }: { product: Product }) {
  const productRoute = `/manage/products/${product.id}` as Route

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant="ghost"
          size="icon-xs"
          aria-label={`Xem ${product.name}`}
          className="text-muted-foreground hover:text-foreground"
        >
          <Link href={productRoute}>
            <Eye />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Xem sản phẩm</TooltipContent>
    </Tooltip>
  )
}

function getItemTypeBadgeClassName(itemType: ProductItemType) {
  switch (itemType) {
    case ProductItemType.FG:
      return "bg-primary-fixed text-primary"
    case ProductItemType.WIP:
      return "bg-secondary-fixed/80 text-on-secondary-container"
    case ProductItemType.RM:
      return "bg-tertiary-fixed/80 text-on-tertiary-container"
    case ProductItemType.CONSUMABLE:
      return "bg-muted text-muted-foreground ring-1 ring-border"
  }
}

function getStatusBadgeClassName(status: ProductStatus) {
  switch (status) {
    case ProductStatus.ACTIVE:
      return "bg-success-container/80 text-success ring-1 ring-success/15"
    case ProductStatus.INACTIVE:
      return "bg-muted text-muted-foreground ring-1 ring-border"
    case ProductStatus.LOCKED:
      return "bg-error-container/50 text-destructive ring-1 ring-destructive/10"
  }
}
