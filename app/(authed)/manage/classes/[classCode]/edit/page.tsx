import { notFound } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { getClass } from "@/features/classes/actions/get-class"
import { getClassFormOptions } from "@/features/classes/actions/get-class-form-options"
import { ClassEditPage } from "@/features/classes/components/edit/class-edit-page"

export default async function EditClassRoute({
  params,
}: PageProps<"/manage/classes/[classCode]/edit">) {
  const { classCode } = await params
  const [classDetail, formOptions] = await Promise.all([
    getClass(classCode).catch(() => null),
    getClassFormOptions(),
  ])

  if (!classDetail) {
    notFound()
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Sửa lớp học"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Danh sách lớp học", href: "/manage/classes" },
          {
            label: classDetail.code,
            href: `/manage/classes/${classDetail.code}`,
          },
          { label: "Sửa lớp học" },
        ]}
      />
      <ClassEditPage
        classDetail={classDetail}
        courseOptions={formOptions.courseOptions}
        teacherOptions={formOptions.teacherOptions}
      />
    </div>
  )
}
