import { notFound } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { getUnassignedClassCourses } from "@/features/classes/actions/get-unassigned-class-courses"
import { getClass } from "@/features/classes/actions/get-class"
import { AssignCoursesPage } from "@/features/classes/components/assign-courses/assign-courses-page"
import { loadAssignClassCourseSearchParams } from "@/features/classes/lib/load-classes-search-params"

export default async function AssignClassCoursesRoute({
  params,
  searchParams,
}: PageProps<"/manage/classes/[classCode]/courses/assign">) {
  const { classCode } = await params
  const classCourseSearchParams = await loadAssignClassCourseSearchParams(
    searchParams
  )
  const [classDetail, unassignedCoursesResponse] =
    await Promise.all([
      getClass(classCode).catch(() => null),
      getUnassignedClassCourses(classCode, {
        limit: classCourseSearchParams.limit,
        page: classCourseSearchParams.page,
        q: classCourseSearchParams.q,
      }),
    ])

  if (!classDetail) {
    notFound()
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Thêm khóa học vào lớp"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Danh sách lớp học", href: "/manage/classes" },
          {
            label: classDetail.code,
            href: `/manage/classes/${classDetail.code}`,
          },
          { label: "Gán khóa học" },
        ]}
      />
      <AssignCoursesPage
        class={classDetail}
        unassignedCourses={unassignedCoursesResponse.data}
        unassignedCoursesPagination={unassignedCoursesResponse.pagination}
      />
    </div>
  )
}
