import { getProductListOptions } from "@/features/products/actions/get-product-list-options"
import { getProductFormOptions } from "@/features/products/actions/get-product-form-options"
import { getProducts } from "@/features/products/actions/get-products"
import { ProductsPage } from "@/features/products/components/products-page"
import { loadProductsSearchParams } from "@/features/products/lib/load-products-search-params"

export const dynamic = "force-dynamic"

export default async function ProductsRoute({
  searchParams,
}: PageProps<"/manage/products">) {
  const productsSearchParams = await loadProductsSearchParams(searchParams)
  const [{ data: products, pagination }, listOptions, formOptions] =
    await Promise.all([
      getProducts(productsSearchParams),
      getProductListOptions(),
      getProductFormOptions(),
    ])

  return (
    <ProductsPage
      products={products}
      pagination={pagination}
      listOptions={listOptions}
      formOptions={formOptions}
    />
  )
}
