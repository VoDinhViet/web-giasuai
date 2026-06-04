import Link from "next/link"
import type { Route } from "next"
import { ArrowLeft, ImageIcon, Pencil } from "lucide-react"

import { PageTitleBar } from "@/components/page-title-bar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { resolveApiAssetUrl } from "@/lib/asset-url"
import { cn } from "@/lib/utils"
import {
  productItemTypeLabel,
  productStatusLabel,
} from "../../constants/product-table-constants"
import { ProductStatus } from "../../types"
import type {
  BomTreeNode,
  Product,
  ProductFormOptions,
  ProductRevision,
} from "../../types"
import { BomTreeGrid } from "../bom/bom-tree-grid"
import { EditProductDialog } from "../dialogs/edit-product-dialog"
import { ProductActionPopover } from "../actions/product-action-popover"
import { ProductDeleteDialog } from "../dialogs/product-delete-dialog"
import { ProductRevisionSelector } from "../revisions/product-revision-selector"
import { ProductRevisionsCard } from "../revisions/product-revisions-card"

type ProductDetailPageProps = {
  product: Product
  bomTree: BomTreeNode | null
  formOptions: ProductFormOptions
  revisions: ProductRevision[]
  selectedRevision: ProductRevision | null
}

export function ProductDetailPage({
  product,
  bomTree,
  formOptions,
  revisions,
  selectedRevision,
}: ProductDetailPageProps) {
  const productsRoute = "/manage/products" as Route
  const isLocked = product.status === ProductStatus.LOCKED

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <PageTitleBar
          title={product.name}
          breadcrumbItems={[
            { label: "Bảng điều khiển", href: "/manage/orders" },
            { label: "Sản phẩm & Dịch vụ", href: "/manage/products" },
            { label: product.code },
          ]}
          actions={
            <>
              <Button asChild variant="outline">
                <Link href={productsRoute}>
                  <ArrowLeft className="size-4" />
                  Quay lại
                </Link>
              </Button>
              {isLocked ? (
                <EditProductDialog
                  product={product}
                  formOptions={formOptions}
                  trigger={
                    <Button type="button" variant="outline" disabled>
                      <Pencil className="size-4" />
                      Đã khóa
                    </Button>
                  }
                />
              ) : (
                <EditProductDialog
                  product={product}
                  formOptions={formOptions}
                  trigger={
                    <Button type="button" variant="outline">
                      <Pencil className="size-4" />
                      Chỉnh sửa
                    </Button>
                  }
                />
              )}
              <ProductActionPopover action="lock" product={product} />
              <ProductActionPopover
                action="copy"
                product={product}
                redirectCopiedProduct
              />
              <ProductDeleteDialog
                product={product}
                redirectTo={productsRoute}
              />
            </>
          }
        />
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          Theo dõi thông tin master data, revision hiện tại và cây BOM - Routing
          của sản phẩm. Từ màn hình này có thể bổ sung node con vào cấu trúc
          định mức trước khi khai báo quy trình sản xuất chi tiết.
        </p>
      </div>

      <Tabs defaultValue="bom-routing" className="w-full gap-6">
        <TabsList
          variant="line"
          className="grid h-11 w-full grid-cols-2 border-b border-border/80 p-0"
        >
          <TabsTrigger
            value="information"
            className="text-xs font-semibold tracking-[0.08em] uppercase"
          >
            Thông tin sản phẩm
          </TabsTrigger>
          <TabsTrigger
            value="bom-routing"
            className="text-xs font-semibold tracking-[0.08em] uppercase"
          >
            BOM - Routing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="information" className="w-full">
          <div className="grid gap-6">
            <ProductSummary product={product} />
            <ProductRevisionsCard product={product} revisions={revisions} />
          </div>
        </TabsContent>
        <TabsContent value="bom-routing">
          <div className="grid gap-4">
            <ProductRevisionSelector
              currentRevisionId={product.currentRevision?.id ?? null}
              revisions={revisions}
              selectedRevisionId={selectedRevision?.id ?? null}
            />
            <BomTreeGrid
              productId={product.id}
              revisionId={selectedRevision?.id ?? null}
              tree={bomTree}
              formOptions={formOptions}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProductSummary({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader className="border-b border-border/70">
        <div className="border-l-4 border-primary pl-4">
          <CardTitle>Thông tin sản phẩm</CardTitle>
          <CardDescription className="mt-1 max-w-3xl leading-6">
            Tổng quan dữ liệu master của sản phẩm, bao gồm mã, tên, phân loại,
            khách hàng, đơn vị tính và revision đang dùng cho BOM - Routing.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] xl:gap-12">
        <ProductSummaryImage product={product} />

        <dl className="grid content-start gap-x-14 gap-y-7 md:grid-cols-2 2xl:gap-x-20">
          <ProductSummaryRow label="Mã sản phẩm" value={product.code} />
          <ProductSummaryRow
            label="Khách hàng"
            value={product.client?.fullName}
          />
          <ProductSummaryRow
            label="Tên sản phẩm"
            value={product.name}
            className="md:col-span-2"
          />
          <ProductSummaryRow
            label="Loại sản phẩm"
            value={productItemTypeLabel[product.itemType]}
          />
          <ProductSummaryRow label="Đơn vị tính" value={product.unit?.code} />
          <ProductSummaryRow
            label="Revision"
            value={product.currentRevision?.revisionNo}
          />
          <ProductSummaryRow
            label="Trạng thái"
            value={productStatusLabel[product.status]}
          />
          <ProductSummaryRow
            label="Ghi chú"
            value={product.note}
            className="md:col-span-2"
            multiline
          />
        </dl>
      </CardContent>
    </Card>
  )
}

function ProductSummaryImage({ product }: { product: Product }) {
  const imageSrc = resolveApiAssetUrl(product.imageUrl)

  return (
    <div className="grid content-start gap-2 sm:max-w-56 lg:max-w-none">
      <p className="text-[10px] leading-4 font-semibold tracking-[0.08em] text-muted-foreground uppercase">
        Hình ảnh sản phẩm
      </p>
      <div className="flex aspect-square min-h-40 items-center justify-center overflow-hidden rounded-md border border-border bg-background p-2 text-center">
        {imageSrc ? (
          <span
            aria-label={product.name}
            className="block size-full rounded-sm bg-cover bg-center"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
        ) : (
          <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <ImageIcon className="size-5" />
          </span>
        )}
      </div>
    </div>
  )
}

function ProductSummaryRow({
  className,
  label,
  multiline = false,
  value,
}: {
  className?: string
  label: string
  multiline?: boolean
  value?: string | null
}) {
  return (
    <div className={cn("grid min-w-0 content-start gap-1", className)}>
      <dt className="text-[10px] leading-4 font-semibold tracking-[0.08em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd
        className={cn(
          "min-h-5 text-sm font-semibold text-foreground",
          multiline ? "whitespace-pre-wrap" : "truncate"
        )}
      >
        {value || "--"}
      </dd>
    </div>
  )
}
