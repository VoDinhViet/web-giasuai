import Link from "next/link"
import {
  CalendarDays,
  Hash,
  Mail,
  Pencil,
  Plus,
  UserCheck,
  UserPlus,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { ClassDetail, ClassStatus } from "../../types"
import { DeleteClassButton } from "../delete-class-button"

type ClassDetailTitleProps = {
  classDetail: ClassDetail
  canManageClass?: boolean
}

export function ClassDetailTitle({
  classDetail,
  canManageClass = true,
}: ClassDetailTitleProps) {
  return (
    <Card className="border-border/70 shadow-sm">
      <CardContent>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="h-7 border-primary/20 bg-primary/10 px-2.5 font-semibold text-primary ring-1 ring-primary/10"
              >
                <Hash data-icon="inline-start" className="size-3" />
                {classDetail.code}
              </Badge>
              <ClassStatusBadge status={classDetail.status} />
              <Badge
                variant="outline"
                className="h-7 border-border/80 bg-muted/70 px-2.5 font-semibold text-muted-foreground ring-1 ring-border/40"
              >
                <UserCheck data-icon="inline-start" className="size-3" />
                {classDetail.instructor.fullName}
              </Badge>
            </div>

            <div>
              <h1 className="text-2xl leading-8 font-bold text-foreground lg:text-3xl lg:leading-10">
                {classDetail.name}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                {canManageClass
                  ? "Giáo viên có thể theo dõi sĩ số, tiến độ học tập, điểm danh và các khóa học đang được gắn vào lớp này."
                  : "Học viên có thể xem lịch học, khóa học đang theo và thông tin chính của lớp này."}
              </p>
            </div>
          </div>

          <div className="grid w-full shrink-0 gap-2 sm:grid-cols-2 lg:flex lg:w-auto lg:grid-cols-none lg:flex-wrap lg:justify-end">
            {canManageClass ? (
              <Button
                type="button"
                variant="outline"
                className="justify-start lg:justify-center"
                asChild
              >
                <Link
                  href={
                    `/manage/classes/${classDetail.code}/enrollments`
                  }
                >
                  <UserPlus className="size-4" />
                  Duyệt học viên
                </Link>
              </Button>
            ) : null}
            <Button
              type="button"
              variant="outline"
              className="justify-start lg:justify-center"
              asChild
            >
              <Link
                href={`/manage/classes/${classDetail.code}/sessions`}
              >
                <CalendarDays className="size-4" />
                {canManageClass ? "Quản lý buổi học" : "Xem lịch học"}
              </Link>
            </Button>
            {canManageClass ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="justify-start lg:justify-center"
                  asChild
                >
                  <Link
                    href={`/manage/classes/${classDetail.code}/edit`}
                  >
                    <Pencil className="size-4" />
                    Sửa lớp
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="justify-start lg:justify-center"
                >
                  <Mail className="size-4" />
                  Nhắn lớp
                </Button>
                <Button
                  type="button"
                  className="justify-start lg:justify-center"
                  asChild
                >
                  <Link
                    href={
                      `/manage/classes/${classDetail.code}/courses/assign`
                    }
                  >
                    <Plus className="size-4" />
                    Thêm khóa học
                  </Link>
                </Button>
                <DeleteClassButton
                  classCode={classDetail.code}
                  className="justify-start lg:justify-center"
                />
              </>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ClassStatusBadge({ status }: { status: ClassStatus }) {
  const statusMap = {
    ACTIVE: {
      label: "Đang học",
      className: "border-primary/20 bg-primary/10 text-primary ring-primary/10",
    },
    UPCOMING: {
      label: "Sắp mở",
      className:
        "border-success/20 bg-success-container/80 text-success ring-success/10",
    },
    COMPLETED: {
      label: "Hoàn thành",
      className:
        "border-border/80 bg-muted text-muted-foreground ring-border/40",
    },
    PAUSED: {
      label: "Tạm dừng",
      className:
        "border-destructive/20 bg-destructive/10 text-destructive ring-destructive/10",
    },
  } satisfies Record<ClassStatus, { label: string; className: string }>

  const statusMeta = statusMap[status]

  return (
    <Badge
      variant="outline"
      className={`h-7 px-2.5 font-semibold ring-1 ${statusMeta.className}`}
    >
      {statusMeta.label}
    </Badge>
  )
}
