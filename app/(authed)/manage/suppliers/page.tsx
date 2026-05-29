import { getSuppliers } from "@/features/suppliers/actions/get-suppliers"
import { SuppliersPage } from "@/features/suppliers/components/suppliers-page"
import { loadSuppliersSearchParams } from "@/features/suppliers/lib/load-suppliers-search-params"

export const dynamic = "force-dynamic"

type SuppliersRouteProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function SuppliersRoute({
  searchParams,
}: SuppliersRouteProps) {
  const suppliersSearchParams = await loadSuppliersSearchParams(searchParams)
  const { data: suppliers, pagination } = await getSuppliers(
    suppliersSearchParams
  )

  return <SuppliersPage suppliers={suppliers} pagination={pagination} />
}
