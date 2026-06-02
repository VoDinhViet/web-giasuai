import { getProduct } from "@/features/products/actions/get-product"
import { getProductFormOptions } from "@/features/products/actions/get-product-form-options"
import { EditProductPage } from "@/features/products/components/edit-product-page"

export const dynamic = "force-dynamic"

export default async function EditProductRoute({
  params,
}: PageProps<"/manage/products/[productId]/edit">) {
  const { productId } = await params
  const [product, formOptions] = await Promise.all([
    getProduct(productId),
    getProductFormOptions(),
  ])

  return <EditProductPage product={product} formOptions={formOptions} />
}
