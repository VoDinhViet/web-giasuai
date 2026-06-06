"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { useAppForm } from "@/components/form/app-form"
import { createClass } from "../../actions/create-class"
import { createClassSchema } from "../../schemas/class.schema"
import type { ClassFormOption } from "../../types"
import { CreateClassActions } from "./create-class-actions"
import { CreateClassBasicSection } from "./create-class-basic-section"
import { CreateClassOperationSection } from "./create-class-operation-section"
import { CreateClassPreview } from "./create-class-preview"
import { CreateClassScheduleSection } from "./create-class-schedule-section"
import { CreateClassTeacherSection } from "./create-class-teacher-section"
import { createClassDefaultValues } from "./create-class-form-values"

type CreateClassFormProps = {
  teacherOptions: ClassFormOption[]
}

export function CreateClassForm({ teacherOptions }: CreateClassFormProps) {
  const router = useRouter()
  const form = useAppForm({
    defaultValues: createClassDefaultValues,
    validators: {
      onSubmit: createClassSchema,
    },
    onSubmit: async ({ value }) => {
      const createClassResult = await createClass(value)

      if (!createClassResult.success || !createClassResult.data) {
        toast.error(createClassResult.message ?? "Không thể tạo lớp học.")
        return
      }

      router.push("/manage/classes")
    },
  })

  return (
    <form
      className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
      noValidate
    >
      <div className="min-w-0 space-y-5">
        <CreateClassBasicSection form={form} />
        <CreateClassTeacherSection
          form={form}
          teacherOptions={teacherOptions}
        />
        <CreateClassScheduleSection form={form} />
        <CreateClassOperationSection form={form} />
        <CreateClassActions
          form={form}
          onCancel={() => router.push("/manage/classes")}
        />
      </div>

      <form.Subscribe selector={(state) => state.values}>
        {(values) => (
          <CreateClassPreview values={values} teacherOptions={teacherOptions} />
        )}
      </form.Subscribe>
    </form>
  )
}
