import { PageTitleBar } from "@/components/page-title-bar"
import { TicketsPage } from "@/features/support/components/pages/tickets-page"

export default function TicketsRoute() {
  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Hỗ trợ"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Hỗ trợ" },
        ]}
      />
      <TicketsPage />
    </div>
  )
}
