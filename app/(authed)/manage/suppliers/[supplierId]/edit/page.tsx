import Link from "next/link"
import type { Route } from "next"
import { ArrowLeft } from "lucide-react"

import { PageTitleBar } from "@/components/page-title-bar"
import { Button } from "@/components/ui/button"
import { getSupplier } from "@/features/suppliers/actions/get-supplier"
import { getSupplierGroupOptions } from "@/features/suppliers/actions/get-supplier-group-options"
import { EditSupplierPage } from "@/features/suppliers/components/pages/edit-supplier-page"

export const dynamic = "force-dynamic"

export default async function EditSupplierRoute({
  params,
}: PageProps<"/manage/suppliers/[supplierId]/edit">) {
  const suppliersRoute = "/manage/suppliers" as Route
  const { supplierId } = await params
  const [supplier, supplierGroupOptions] = await Promise.all([
    getSupplier(supplierId),
    getSupplierGroupOptions(),
  ])

  return (
    <>
      <PageTitleBar
        title="Chỉnh sửa nhà cung cấp"
        actions={
          <Button asChild variant="outline">
            <Link href={suppliersRoute}>
              <ArrowLeft className="size-4" />
              Quay lại
            </Link>
          </Button>
        }
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage/orders" },
          { label: "Mua hàng" },
          { label: "Nhà cung cấp", href: "/manage/suppliers" },
          { label: "Chỉnh sửa nhà cung cấp" },
        ]}
      />
      <EditSupplierPage
        supplier={supplier}
        supplierGroupOptions={supplierGroupOptions}
      />
    </>
  )
}
