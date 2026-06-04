import { PageTitleBar } from "@/components/page-title-bar"
import { getSupplierGroupOptions } from "@/features/suppliers/actions/get-supplier-group-options"
import { getSuppliers } from "@/features/suppliers/actions/get-suppliers"
import { SuppliersPage } from "@/features/suppliers/components/pages/suppliers-page"
import { loadSuppliersSearchParams } from "@/features/suppliers/lib/load-suppliers-search-params"

export const dynamic = "force-dynamic"

export default async function SuppliersRoute({
  searchParams,
}: PageProps<"/manage/suppliers">) {
  const suppliersSearchParams = await loadSuppliersSearchParams(searchParams)
  const [{ data: suppliers, pagination }, supplierGroupOptions] =
    await Promise.all([
      getSuppliers(suppliersSearchParams),
      getSupplierGroupOptions(),
    ])

  return (
    <>
      <PageTitleBar
        title="Quản lý nhà cung cấp"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage/orders" },
          { label: "Mua hàng" },
          { label: "Nhà cung cấp" },
        ]}
      />
      <SuppliersPage
        suppliers={suppliers}
        pagination={pagination}
        supplierGroupOptions={supplierGroupOptions}
      />
    </>
  )
}
