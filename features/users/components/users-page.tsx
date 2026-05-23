import { PageHeader } from "@/components/page-header"
import type { Pagination } from "@/types/api"
import type { User } from "../types"
import { CreateUserDialog } from "./create-user-dialog"
import { UsersTable } from "./users-table"

type UsersPageProps = {
  users: User[]
  pagination: Pagination
}

const usersPageBreadcrumbs = [
  { label: "Nhân sự" },
  { label: "Quản lý nhân sự" },
]

export function UsersPage({ users, pagination }: UsersPageProps) {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col gap-8">
          <PageHeader
            title="Danh sách nhân sự"
            breadcrumbs={usersPageBreadcrumbs}
            actions={<CreateUserDialog />}
          />

          <UsersTable users={users} pagination={pagination} />
        </div>
      </main>
      <footer className="border-t border-border py-10 text-center text-sm font-semibold tracking-wide text-muted-foreground">
        © 2024 ERP Pro Manufacturing Solution. Hệ thống quản trị công nghiệp
        toàn diện.
      </footer>
    </div>
  )
}
