import type { ClassDetail, ClassFormOption } from "../../types"
import { EditClassForm } from "./edit-class-form"

type ClassEditPageProps = {
  classDetail: ClassDetail
  courseOptions: ClassFormOption[]
  teacherOptions: ClassFormOption[]
}

export function ClassEditPage({
  classDetail,
  courseOptions,
  teacherOptions,
}: ClassEditPageProps) {
  return (
    <EditClassForm
      classDetail={classDetail}
      courseOptions={courseOptions}
      teacherOptions={teacherOptions}
    />
  )
}
