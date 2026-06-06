import { PageTitleBar } from "@/components/page-title-bar"
import { CourseCreatePage } from "@/features/courses/components/create/create-page"

export default function CourseCreateRoute() {
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
      <CourseCreatePage />
    </div>
  )
}
