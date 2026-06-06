import { PageTitleBar } from "@/components/page-title-bar"
import { CourseImportPage } from "@/features/courses/components/import/import-page"

export default function CourseImportRoute() {
  return (
    <div className="flex min-w-0 flex-col gap-5">
      <PageTitleBar
        title="Import khóa học"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Quản lý khóa học", href: "/manage/courses" },
          { label: "Import khóa học" },
        ]}
      />
      <CourseImportPage />
    </div>
  )
}
