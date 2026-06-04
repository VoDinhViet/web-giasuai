import { PageTitleBar } from "@/components/page-title-bar"
import { WeaknessesPage } from "@/features/weaknesses/components/pages/weaknesses-page"

export default function WeaknessesRoute() {
  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Tracking điểm yếu"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Tracking điểm yếu" },
        ]}
      />
      <WeaknessesPage />
    </div>
  )
}
