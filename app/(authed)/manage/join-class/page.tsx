import { PageTitleBar } from "@/components/page-title-bar"
import { JoinClassPage } from "@/features/join-class/components/pages/join-class-page"

export default function JoinClassRoute() {
  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Tham gia lớp"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Tham gia lớp" },
        ]}
      />
      <JoinClassPage />
    </div>
  )
}
