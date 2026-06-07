import { Plus } from "lucide-react"
import Link from "next/link"

import { PageTitleBar } from "@/components/page-title-bar"
import { Button } from "@/components/ui/button"
import { getCourses } from "@/features/courses/actions/get-courses"
import { getCourseStats } from "@/features/courses/actions/get-course-stats"
import { CoursesPage } from "@/features/courses/components/courses-page"
import { loadCoursesSearchParams } from "@/features/courses/lib/load-courses-search-params"

export const dynamic = "force-dynamic"

export default async function CoursesRoute({
  searchParams,
}: PageProps<"/manage/courses">) {
  const coursesSearchParams = await loadCoursesSearchParams(searchParams)
  const [stats, coursesResponse] = await Promise.all([
    getCourseStats(),
    getCourses(coursesSearchParams),
  ])

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Quản lý khóa học"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" asChild>
              <Link href="/manage/courses/create">
                <Plus className="size-4" />
                Tạo khóa học
              </Link>
            </Button>
          </div>
        }
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Quản lý khóa học" },
        ]}
      />
      <CoursesPage
        stats={stats}
        courses={coursesResponse.data}
        pagination={coursesResponse.pagination}
      />
    </div>
  )
}
