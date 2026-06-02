import { PageTitleBar } from "@/components/page-title-bar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { Pagination } from "@/types/api"
import type { ProductListOptions } from "../actions/get-product-list-options"
import type { Product, ProductFormOptions } from "../types"
import { CreateProductDialog } from "./create-product-dialog"
import { ProductsTable } from "./products-table"

type ProductsPageProps = {
  formOptions: ProductFormOptions
  listOptions: ProductListOptions
  products: Product[]
  pagination: Pagination
}

export function ProductsPage({
  formOptions,
  listOptions,
  products,
  pagination,
}: ProductsPageProps) {
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
              <BreadcrumbPage>Quản lý sản phẩm</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <PageTitleBar
          title="Danh sách sản phẩm"
          actions={<CreateProductDialog formOptions={formOptions} />}
        />
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          Quản lý danh mục thành phẩm, bán thành phẩm, nguyên vật liệu và vật tư
          tiêu hao dùng trong kế hoạch sản xuất. Mỗi sản phẩm có revision hiện
          tại để liên kết BOM - Routing và làm nền cho định mức sản xuất.
        </p>
      </div>

      <ProductsTable
        formOptions={formOptions}
        products={products}
        pagination={pagination}
        listOptions={listOptions}
      />
    </div>
  )
}
