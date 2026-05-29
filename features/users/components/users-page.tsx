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
import type { User } from "../types"
import { CreateUserDialog } from "./create-user-dialog"
import { UsersTable } from "./users-table"

type UsersPageProps = {
  users: User[]
  pagination: Pagination
}

export function UsersPage({ users, pagination }: UsersPageProps) {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList className="font-medium">
            <BreadcrumbItem>
              <BreadcrumbLink href="/manage/users">Nhân sự</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Quản lý nhân sự</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <PageTitleBar
          title="Danh sách nhân sự" actions={<CreateUserDialog />} />
      </div>

      <UsersTable users={users} pagination={pagination} />
    </div>
  )
}
