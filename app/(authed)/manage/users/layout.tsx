import type { ReactNode } from "react"

import { PageTitleBar } from "@/components/page-title-bar"

export default async function UsersLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Quản lý người dùng"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage/orders" },
          { label: "Hệ thống" },
          { label: "Người dùng" },
        ]}
      />
      {children}
    </div>
  )
}
