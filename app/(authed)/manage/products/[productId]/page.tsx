import { getBomTree } from "@/features/products/actions/get-bom-tree"
import { getProduct } from "@/features/products/actions/get-product"
import { getProductFormOptions } from "@/features/products/actions/get-product-form-options"
import { getProductRevisions } from "@/features/products/actions/get-product-revisions"
import { ProductDetailPage } from "@/features/products/components/product-detail-page"

export const dynamic = "force-dynamic"

export default async function ProductDetailRoute({
  params,
  searchParams,
}: PageProps<"/manage/products/[productId]">) {
  const { productId } = await params
  const productSearchParams = await searchParams
  const [product, formOptions, revisions] = await Promise.all([
    getProduct(productId),
    getProductFormOptions(),
    getProductRevisions(productId),
  ])
  const requestedRevisionId =
    typeof productSearchParams.revisionId === "string"
      ? productSearchParams.revisionId
      : null
  const selectedRevision =
    revisions.find((revision) => revision.id === requestedRevisionId) ??
    product.currentRevision ??
    revisions[0] ??
    null
  const bomTree = selectedRevision
    ? await getBomTree(product.id, selectedRevision.id)
    : null

  return (
    <ProductDetailPage
      product={product}
      bomTree={bomTree}
      formOptions={formOptions}
      revisions={revisions}
      selectedRevision={selectedRevision}
    />
  )
}
