import type { Class, ClassFormOption } from "../../types"
import { EditClassForm } from "./edit-class-form"

type ClassEditPageProps = {
  class: Class
  courseOptions: ClassFormOption[]
  instructorOptions: ClassFormOption[]
}

export function ClassEditPage(props: ClassEditPageProps) {
  return (
    <EditClassForm
      class={props.class}
      courseOptions={props.courseOptions}
      instructorOptions={props.instructorOptions}
    />
  )
}
