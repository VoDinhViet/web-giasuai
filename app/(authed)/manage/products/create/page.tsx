import { getProductFormOptions } from "@/features/products/actions/get-product-form-options"
import { CreateProductPage } from "@/features/products/components/create-product-page"

export const dynamic = "force-dynamic"

export default async function CreateProductRoute() {
  const formOptions = await getProductFormOptions()

  return <CreateProductPage formOptions={formOptions} />
}
