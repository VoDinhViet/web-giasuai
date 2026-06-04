import type { ReactNode } from "react"

import { PageTitleBar } from "@/components/page-title-bar"
import { CreateClientDialog } from "@/features/clients/components/dialogs/create-client-dialog"

export default function ClientsLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Quản lý khách hàng"
        actions={<CreateClientDialog />}
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage/orders" },
          { label: "Bán hàng" },
          { label: "Khách hàng" },
        ]}
      />
      {children}
    </div>
  )
}
