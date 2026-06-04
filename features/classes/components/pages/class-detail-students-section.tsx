import { Download, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ClassStudentsTable } from "../tables/class-students-table"
import type { ClassStudent } from "../../types"
import { ClassDetailSectionHeader } from "./class-detail-section-header"

type ClassDetailStudentsSectionProps = {
  students: ClassStudent[]
}

export function ClassDetailStudentsSection({
  students,
}: ClassDetailStudentsSectionProps) {
  return (
    <section className="rounded border border-border/80 bg-card shadow-xs">
      <div className="flex flex-col gap-3 border-b border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        <ClassDetailSectionHeader
          icon={Users}
          title="Giám sát học viên"
          description="Theo dõi tiến độ, điểm danh và điểm trung bình từng học viên."
        />
        <Button
          type="button"
          variant="outline"
          className="border-primary/20 bg-primary/5 text-primary shadow-xs hover:bg-primary/10 hover:text-primary"
        >
          <Download className="size-4" />
          Xuất báo cáo
        </Button>
      </div>

      <ClassStudentsTable students={students} />
    </section>
  )
}
