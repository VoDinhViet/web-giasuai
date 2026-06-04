import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Pagination } from "@/types/api"
import { Package, Tags } from "lucide-react"
import type { ReactNode } from "react"
import type { ProductListOptions } from "../../actions/get-product-list-options"
import type { Product, ProductFormOptions } from "../../types"
import { CreateProductDialog } from "../dialogs/create-product-dialog"
import { ProductItemTypesTable } from "../tables/product-item-types-table"
import { ProductUnitsTable } from "../tables/product-units-table"
import { ProductsTable } from "../tables/products-table"

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
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
        Quản lý danh mục thành phẩm, bán thành phẩm, nguyên vật liệu và vật tư
        tiêu hao dùng trong kế hoạch sản xuất. Mỗi sản phẩm có revision hiện tại
        để liên kết BOM - Routing và làm nền cho định mức sản xuất.
      </p>

      <Tabs defaultValue="products" className="w-full gap-6">
        <TabsList className="h-10 w-fit max-w-full">
          <TabsTrigger
            value="products"
            className="px-4 text-xs font-semibold tracking-[0.08em] uppercase"
          >
            <Package className="size-4" />
            Quản lý sản phẩm
          </TabsTrigger>
          <TabsTrigger
            value="reference-data"
            className="px-4 text-xs font-semibold tracking-[0.08em] uppercase"
          >
            <Tags className="size-4" />
            Loại & đơn vị
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="grid gap-4">
          <ProductsTabHeader
            title="Danh sách sản phẩm"
            actions={<CreateProductDialog formOptions={formOptions} />}
          />
          <ProductsTable
            formOptions={formOptions}
            products={products}
            pagination={pagination}
            listOptions={listOptions}
          />
        </TabsContent>

        <TabsContent value="reference-data" className="grid gap-4">
          <ProductsTabHeader title="Danh mục loại sản phẩm và đơn vị" />
          <div className="grid gap-4 lg:grid-cols-2">
            <ProductsReferenceSection title="Loại sản phẩm">
              <ProductItemTypesTable />
            </ProductsReferenceSection>
            <ProductsReferenceSection title="Đơn vị">
              <ProductUnitsTable units={formOptions.units} />
            </ProductsReferenceSection>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

type ProductsTabHeaderProps = {
  title: string
  actions?: ReactNode
}

function ProductsTabHeader({ title, actions }: ProductsTabHeaderProps) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-lg leading-7 font-semibold text-foreground">
        {title}
      </h2>
      {actions ? (
        <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>
      ) : null}
    </header>
  )
}

type ProductsReferenceSectionProps = {
  title: string
  children: ReactNode
}

function ProductsReferenceSection({
  title,
  children,
}: ProductsReferenceSectionProps) {
  return (
    <section className="grid min-w-0 gap-3">
      <h3 className="text-sm leading-5 font-semibold text-foreground">
        {title}
      </h3>
      {children}
    </section>
  )
}
