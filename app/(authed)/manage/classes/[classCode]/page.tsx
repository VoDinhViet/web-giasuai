import { notFound } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { getClass } from "@/features/classes/actions/get-class"
import { getClassCourses } from "@/features/classes/actions/get-class-courses"
import { getClassLearners } from "@/features/classes/actions/get-class-learners"
import { ClassDetailPage } from "@/features/classes/components/detail/class-detail-page"
import { loadClassDetailSearchParams } from "@/features/classes/lib/load-classes-search-params"

export default async function ClassDetailRoute({
  params,
  searchParams,
}: PageProps<"/manage/classes/[classCode]">) {
  const { classCode } = await params
  const classDetailSearchParams = await loadClassDetailSearchParams(
    searchParams
  )
  const [classDetail, classLearners, classCourses] = await Promise.all([
      getClass(classCode).catch(() => null),
      getClassLearners(classCode, {
        page: classDetailSearchParams.learnerPage,
        limit: classDetailSearchParams.learnerPageSize,
        q: classDetailSearchParams.learnerQ,
      }).catch(() => null),
      getClassCourses(classCode, {
        page: classDetailSearchParams.coursePage,
        limit: classDetailSearchParams.coursePageSize,
        q: classDetailSearchParams.courseQ,
      }),
  ])

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
      <ClassDetailPage
        classDetail={classDetail}
        classLearners={classLearners}
        classCourses={classCourses}
      />
    </div>
  )
}
