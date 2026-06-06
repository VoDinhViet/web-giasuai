import { GraduationCap } from "lucide-react"

import { withForm } from "@/components/form/app-form"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  classStatusOptions,
  type CreateClassInput,
} from "../../schemas/class.schema"
import { createClassDefaultValues } from "./create-class-form-values"
import { CreateClassFormSection } from "./create-class-form-section"
import { CreateClassRequiredFieldLabel } from "./create-class-required-field-label"

export const CreateClassBasicSection = withForm({
  defaultValues: createClassDefaultValues,
  render: function RenderCreateClassBasicSection({ form }) {
    return (
      <CreateClassFormSection
        icon={GraduationCap}
        title="Thông tin cơ bản"
        description="Đặt tên, mã lớp và trạng thái vận hành ban đầu."
      >
        <FieldGroup className="grid gap-5 sm:grid-cols-2">
          <form.Field name="code">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <CreateClassRequiredFieldLabel htmlFor={field.name}>
                    Mã lớp
                  </CreateClassRequiredFieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(event.target.value.toUpperCase())
                    }
                    placeholder="CLS-001"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="status">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <CreateClassRequiredFieldLabel>
                    Trạng thái
                  </CreateClassRequiredFieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(value as CreateClassInput["status"])
                    }
                  >
                    <SelectTrigger className="w-full" aria-invalid={isInvalid}>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      {classStatusOptions.map((statusOption) => (
                        <SelectItem
                          key={statusOption.value}
                          value={statusOption.value}
                        >
                          {statusOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid} className="sm:col-span-2">
                  <CreateClassRequiredFieldLabel htmlFor={field.name}>
                    Tên lớp học
                  </CreateClassRequiredFieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="B2B Sales A01"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>
        </FieldGroup>
      </CreateClassFormSection>
    )
  },
})
