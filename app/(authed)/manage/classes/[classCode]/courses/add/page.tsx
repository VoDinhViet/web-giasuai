import { notFound } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { getClass } from "@/features/classes/actions/get-class"
import { AddCourseToClassPage } from "@/features/classes/components/detail/add-class-course-page"
import type { ClassFormOption } from "@/features/classes/types"
import { getCourses } from "@/features/courses/actions/get-courses"

export default async function AddClassCourseRoute({
  params,
}: PageProps<"/manage/classes/[classCode]/courses/add">) {
  const { classCode } = await params
  const [classDetail, courseOptions] = await Promise.all([
    getClass(classCode).catch(() => null),
    getClassCourseOptions(),
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
          { label: "Thêm khóa học" },
        ]}
      />
      <AddCourseToClassPage
        classDetail={classDetail}
        courseOptions={courseOptions}
      />
    </div>
  )
}

async function getClassCourseOptions(): Promise<ClassFormOption[]> {
  try {
    const coursesResponse = await getCourses({
      limit: 100,
      page: 1,
      q: "",
      status: "all",
      category: "all",
    })

    return coursesResponse.data.map((course) => ({
      value: course.id,
      label: `${course.code} - ${course.name}`,
      description: [
        course.category,
        `${course.lessonCount} bài học`,
        course.authorName ? `Tác giả ${course.authorName}` : null,
      ]
        .filter(Boolean)
        .join(" - "),
    }))
  } catch (getClassCourseOptionsError) {
    console.error("Get class course options error:", getClassCourseOptionsError)

    return []
  }
}
