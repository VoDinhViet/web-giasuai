import type { ClassDetail, ClassFormOption } from "../../types"
import { EditClassForm } from "./edit-class-form"

type ClassEditPageProps = {
  classDetail: ClassDetail
  courseOptions: ClassFormOption[]
  instructorOptions: ClassFormOption[]
}

export function ClassEditPage({
  classDetail,
  courseOptions,
  instructorOptions,
}: ClassEditPageProps) {
  return (
    <EditClassForm
      classDetail={classDetail}
      courseOptions={courseOptions}
      instructorOptions={instructorOptions}
    />
  )
}
