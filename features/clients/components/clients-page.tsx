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
import type { Client } from "../types"
import { ClientsTable } from "./clients-table"
import { CreateClientDialog } from "./create-client-dialog"

type ClientsPageProps = {
  clients: Client[]
  pagination: Pagination
}

export function ClientsPage({ clients, pagination }: ClientsPageProps) {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList className="font-medium">
            <BreadcrumbItem>
              <BreadcrumbLink href="/manage/clients">Khách hàng</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Quản lý khách hàng</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <PageTitleBar
          title="Danh sách khách hàng"
          actions={<CreateClientDialog />}
        />
      </div>

      <ClientsTable clients={clients} pagination={pagination} />
    </div>
  )
}
