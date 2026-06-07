import { PageTitleBar } from "@/components/page-title-bar"
import { CreateCoursePage } from "@/features/courses/components/create/import-page"

export default function CourseImportRoute() {
  return (
    <div className="flex min-w-0 flex-col gap-5">
      <PageTitleBar
        title="Tạo khóa học"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Quản lý khóa học", href: "/manage/courses" },
          { label: "Tạo khóa học" },
        ]}
      />
      <CreateCoursePage />
    </div>
  )
}
