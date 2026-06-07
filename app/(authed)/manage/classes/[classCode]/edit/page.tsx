import { notFound } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { getClass } from "@/features/classes/actions/get-class"
import {
  getCourseOptions,
  getInstructorOptions,
} from "@/features/classes/actions/get-class-form-options"
import { ClassEditPage } from "@/features/classes/components/class-edit/class-edit-page"

export default async function EditClassRoute({
  params,
}: PageProps<"/manage/classes/[classCode]/edit">) {
  const { classCode } = await params
  const [classDetail, formOptions, instructorOptions] = await Promise.all([
    getClass(classCode).catch(() => null),
    getCourseOptions(),
    getInstructorOptions(),
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
        class={classDetail}
        courseOptions={formOptions.courseOptions}
        instructorOptions={instructorOptions}
      />
    </div>
  )
}
