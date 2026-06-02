import Link from "next/link"
import type { Route } from "next"
import { Ban } from "lucide-react"

import { PageTitleBar } from "@/components/page-title-bar"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ProductStatus, type Product, type ProductFormOptions } from "../types"
import { EditProductPageForm } from "./edit-product-page-form"
import { ProductFormTabs } from "./product-form-tabs"

type EditProductPageProps = {
  product: Product
  formOptions: ProductFormOptions
}

const productsRoute = "/manage/products" as Route

export function EditProductPage({
  product,
  formOptions,
}: EditProductPageProps) {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList className="font-medium">
            <BreadcrumbItem>
              <BreadcrumbLink href="/manage/products">Sản phẩm</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.code}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <PageTitleBar title="Chỉnh sửa sản phẩm" />
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          Cập nhật thông tin nền của sản phẩm như mã, tên, loại, đơn vị và trạng
          thái sử dụng. Cấu trúc BOM - Routing được quản lý riêng tại trang chi
          tiết theo revision hiện tại.
        </p>
      </div>

      {product.status === ProductStatus.LOCKED ? (
        <section className="flex w-full max-w-4xl flex-col gap-5 rounded-(--radius) border border-border/80 bg-card p-5 shadow-xs sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <Ban className="size-4" />
            </span>
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-foreground">
                Sản phẩm đã khóa
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Sản phẩm {product.code} không thể cập nhật thông tin trên form
                này.
              </p>
            </div>
          </div>
          <div>
            <Button asChild variant="outline">
              <Link href={productsRoute}>Quay lại danh sách</Link>
            </Button>
          </div>
        </section>
      ) : (
        <div className="w-full max-w-4xl space-y-5">
          <ProductFormTabs />
          <EditProductPageForm product={product} formOptions={formOptions} />
        </div>
      )}
    </div>
  )
}
