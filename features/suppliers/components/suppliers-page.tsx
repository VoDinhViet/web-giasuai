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
import type { Supplier } from "../types"
import { CreateSupplierDialog } from "./create-supplier-dialog"
import { SuppliersTable } from "./suppliers-table"

type SuppliersPageProps = {
  suppliers: Supplier[]
  pagination: Pagination
}

export function SuppliersPage({ suppliers, pagination }: SuppliersPageProps) {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList className="font-medium">
            <BreadcrumbItem>
              <BreadcrumbLink href="/manage/suppliers">
                Nhà cung cấp
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Quản lý nhà cung cấp</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <PageTitleBar
          title="Danh sách nhà cung cấp"
          actions={<CreateSupplierDialog />}
        />
      </div>

      <SuppliersTable suppliers={suppliers} pagination={pagination} />
    </div>
  )
}
