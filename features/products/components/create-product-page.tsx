import { PageTitleBar } from "@/components/page-title-bar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { ProductFormOptions } from "../types"
import { CreateProductPageForm } from "./create-product-page-form"
import { ProductFormTabs } from "./product-form-tabs"

type CreateProductPageProps = {
  formOptions: ProductFormOptions
}

export function CreateProductPage({ formOptions }: CreateProductPageProps) {
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
              <BreadcrumbPage>Tạo sản phẩm</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <PageTitleBar title="Tạo sản phẩm" />
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          Khai báo thông tin định danh, loại sản phẩm, đơn vị tính và revision
          ban đầu. Sau khi lưu, hệ thống mở trang chi tiết để tiếp tục tạo cây
          BOM - Routing cho sản phẩm này.
        </p>
      </div>

      <div className="w-full max-w-4xl space-y-5">
        <ProductFormTabs />
        <CreateProductPageForm formOptions={formOptions} />
      </div>
    </div>
  )
}
