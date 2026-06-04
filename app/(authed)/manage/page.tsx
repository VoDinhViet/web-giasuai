import { PageTitleBar } from "@/components/page-title-bar"
import { ManageDashboardPage } from "@/features/manage-dashboard/components/pages/manage-dashboard-page"

export default function ManageDashboardRoute() {
  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Bảng điều khiển"
        breadcrumbItems={[{ label: "Bảng điều khiển" }]}
      />
      <ManageDashboardPage />
    </div>
  )
}
