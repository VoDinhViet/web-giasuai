import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { PageTitleBar } from "@/components/page-title-bar"
import { Button } from "@/components/ui/button"
import { getInstructorOptions } from "@/features/classes/actions/get-class-form-options"
import { CreateClassForm } from "@/features/classes/components/class-create/create-class-form"

export const dynamic = "force-dynamic"

export default async function CreateClassRoute() {
  const instructorOptions = await getInstructorOptions()

  return (
    <div className="flex min-w-0 max-w-full flex-col gap-5">
      <PageTitleBar
        title="Thêm lớp học"
        actions={
          <Button type="button" variant="outline" asChild>
            <Link href="/manage/classes">
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
      <CreateClassForm instructorOptions={instructorOptions} />
    </div>
  )
}
