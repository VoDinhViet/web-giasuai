import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Route } from "next"

import { PageTitleBar } from "@/components/page-title-bar"
import { Button } from "@/components/ui/button"
import { getClassFormOptions } from "@/features/classes/actions/get-class-form-options"
import { CreateClassForm } from "@/features/classes/components/create/create-class-form"

export const dynamic = "force-dynamic"

export default async function CreateClassRoute() {
  const { teacherOptions } = await getClassFormOptions()

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Thêm lớp học"
        actions={
          <Button type="button" variant="outline" asChild>
            <Link href={"/manage/classes" as Route}>
              <ArrowLeft className="size-4" />
              Danh sách lớp
            </Link>
          </Button>
        }
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Danh sách lớp học", href: "/manage/classes" },
          { label: "Thêm lớp học" },
        ]}
      />
      <CreateClassForm teacherOptions={teacherOptions} />
    </div>
  )
}
