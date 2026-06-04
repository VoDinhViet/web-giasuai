import { PageTitleBar } from "@/components/page-title-bar"
import { AiUsagePage } from "@/features/support/components/pages/ai-usage-page"

export default function AiUsageRoute() {
  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="AI quota"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "AI quota" },
        ]}
      />
      <AiUsagePage />
    </div>
  )
}
