import Link from "next/link"
import type { Route } from "next"
import { ArrowLeft } from "lucide-react"

import { PageTitleBar } from "@/components/page-title-bar"
import { Button } from "@/components/ui/button"
import { getSupplierGroupOptions } from "@/features/suppliers/actions/get-supplier-group-options"
import { CreateSupplierPage } from "@/features/suppliers/components/pages/create-supplier-page"

export default async function CreateSupplierRoute() {
  const suppliersRoute = "/manage/suppliers" as Route
  const supplierGroupOptions = await getSupplierGroupOptions()

  return (
    <>
      <PageTitleBar
        title="Thêm nhà cung cấp"
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
          { label: "Thêm nhà cung cấp" },
        ]}
      />
      <CreateSupplierPage supplierGroupOptions={supplierGroupOptions} />
    </>
  )
}
