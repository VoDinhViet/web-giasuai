import { PageTitleBar } from "@/components/page-title-bar"
import { PlacementTestsPage } from "@/features/placement-tests/components/pages/placement-tests-page"

export default function PlacementTestsRoute() {
  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Kiểm tra năng lực đầu vào"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Kiểm tra năng lực đầu vào" },
        ]}
      />
      <PlacementTestsPage />
    </div>
  )
}
