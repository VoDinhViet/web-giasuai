import { Users } from "lucide-react"

import { withForm } from "@/components/form/app-form"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { classJoinPolicyOptions } from "../../schemas/class.schema"
import type { ClassJoinPolicy } from "../../types"
import { CreateClassFormSection } from "./create-class-form-section"
import { createClassDefaultValues } from "./create-class-form-values"
import { CreateClassRequiredFieldLabel } from "./create-class-required-field-label"
import { CreateClassToggleRow } from "./create-class-toggle-row"

export const CreateClassOperationSection = withForm({
  defaultValues: createClassDefaultValues,
  render: function RenderCreateClassOperationSection({ form }) {
    return (
      <CreateClassFormSection
        icon={Users}
        title="Ghi danh và vận hành"
        description="Cấu hình sức chứa, cách nhận học viên và tự động hóa lớp."
      >
        <FieldGroup className="grid gap-5 sm:grid-cols-2">
          <form.Field name="maxStudents">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <CreateClassRequiredFieldLabel htmlFor={field.name}>
                    Sĩ số tối đa
                  </CreateClassRequiredFieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min={1}
                    max={500}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(Number(event.target.value))
                    }
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="joinPolicy">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <CreateClassRequiredFieldLabel>
                    Cách ghi danh
                  </CreateClassRequiredFieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(value as ClassJoinPolicy)
                    }
                  >
                    <SelectTrigger className="w-full" aria-invalid={isInvalid}>
                      <SelectValue placeholder="Chọn cách ghi danh" />
                    </SelectTrigger>
                    <SelectContent>
                      {classJoinPolicyOptions.map((modeOption) => (
                        <SelectItem
                          key={modeOption.value}
                          value={modeOption.value}
                        >
                          {modeOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <div className="grid gap-3 sm:col-span-2">
            <form.Field name="waitlistEnabled">
              {(field) => (
                <CreateClassToggleRow
                  title="Cho phép danh sách chờ"
                  description="Nhận học viên chờ khi lớp đã đủ sĩ số."
                  checked={field.state.value}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>

            <form.Field name="reminderEnabled">
              {(field) => (
                <CreateClassToggleRow
                  title="Gửi nhắc lịch trước buổi học"
                  description="Chuẩn bị sẵn cấu hình nhắc lịch cho học viên và giáo viên."
                  checked={field.state.value}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>

            <form.Field name="autoCreateSessions">
              {(field) => (
                <CreateClassToggleRow
                  title="Sinh buổi học từ lịch mặc định"
                  description="Dùng ngày học và khung giờ để tạo session sau khi API hỗ trợ."
                  checked={field.state.value}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>
          </div>

          <form.Field name="note">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid} className="sm:col-span-2">
                  <FieldLabel htmlFor={field.name}>Ghi chú vận hành</FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Ghi chú yêu cầu phòng học, tài liệu, nhóm học viên..."
                    className="min-h-28"
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
