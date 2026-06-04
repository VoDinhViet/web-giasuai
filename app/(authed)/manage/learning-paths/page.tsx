import { PageTitleBar } from "@/components/page-title-bar"
import { LearningPathsPage } from "@/features/learning-paths/components/pages/learning-paths-page"

export default function LearningPathsRoute() {
  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Sinh lộ trình AI"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Sinh lộ trình AI" },
        ]}
      />
      <LearningPathsPage />
    </div>
  )
}
