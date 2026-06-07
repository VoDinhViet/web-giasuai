import { notFound } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { getClass } from "@/features/classes/actions/get-class"
import { ClassDetailPage } from "@/features/classes/components/class-detail/class-detail-page"

export default async function ClassDetailRoute({
  params,
}: PageProps<"/manage/classes/[classCode]">) {
  const { classCode } = await params
  const classDetail = await getClass(classCode).catch(() => null)

  if (!classDetail) {
    notFound()
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Quản lý chi tiết lớp học"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Danh sách lớp học", href: "/manage/classes" },
          { label: classDetail.code },
        ]}
      />
      <ClassDetailPage class={classDetail} />
    </div>
  )
}
