import { Plus } from "lucide-react"
import Link from "next/link"
import type { Route } from "next"

import { PageTitleBar } from "@/components/page-title-bar"
import { Button } from "@/components/ui/button"
import { getClassStats } from "@/features/classes/actions/get-class-stats"
import { getClasses } from "@/features/classes/actions/get-classes"
import { ClassesPage } from "@/features/classes/components/pages/classes-page"
import { loadClassesSearchParams } from "@/features/classes/lib/load-classes-search-params"

export const dynamic = "force-dynamic"

export default async function ClassesRoute({
  searchParams,
}: PageProps<"/manage/classes">) {
  const classesSearchParams = await loadClassesSearchParams(searchParams)
  const [classesResponse, stats] = await Promise.all([
    getClasses(classesSearchParams),
    getClassStats(classesSearchParams),
  ])

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Quản lý danh sách lớp học"
        actions={
          <Button type="button" asChild>
            <Link href={"/manage/classes/create" as Route}>
              <Plus className="size-4" />
              Thêm lớp học
            </Link>
          </Button>
        }
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Danh sách lớp học" },
        ]}
      />
      <ClassesPage
        stats={stats}
        classes={classesResponse.data}
        pagination={classesResponse.pagination}
      />
    </div>
  )
}
