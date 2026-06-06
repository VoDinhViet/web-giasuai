import { CalendarDays } from "lucide-react"

import { withForm } from "@/components/form/app-form"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import {
  classFormatOptions,
  classWeekdayOptions,
} from "../../schemas/class.schema"
import type { ClassFormat, ClassWeekday } from "../../types"
import { CreateClassFormSection } from "./create-class-form-section"
import { createClassDefaultValues } from "./create-class-form-values"
import { CreateClassRadioOption } from "./create-class-radio-option"
import { CreateClassRequiredFieldLabel } from "./create-class-required-field-label"

export const CreateClassScheduleSection = withForm({
  defaultValues: createClassDefaultValues,
  render: function RenderCreateClassScheduleSection({ form }) {
    return (
      <CreateClassFormSection
        icon={CalendarDays}
        title="Lịch học"
        description="Tạo khung lịch mặc định để sinh buổi học sau khi API hỗ trợ."
      >
        <FieldGroup className="grid gap-5 sm:grid-cols-2">
          <form.Field name="format">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid} className="sm:col-span-2">
                  <CreateClassRequiredFieldLabel>
                    Hình thức học
                  </CreateClassRequiredFieldLabel>
                  <RadioGroup
                    value={field.state.value}
                    orientation="horizontal"
                    onValueChange={(value) =>
                      field.handleChange(value as ClassFormat)
                    }
                  >
                    {classFormatOptions.map((modeOption) => (
                      <CreateClassRadioOption
                        key={modeOption.value}
                        value={modeOption.value}
                        label={modeOption.label}
                      />
                    ))}
                  </RadioGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="repeatDays">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid} className="sm:col-span-2">
                  <FieldLabel>Ngày học trong tuần</FieldLabel>
                  <div className="grid grid-cols-7 gap-2">
                    {classWeekdayOptions.map((weekdayOption) => {
                      const isSelected = field.state.value.includes(
                        weekdayOption.value
                      )

                      return (
                        <Button
                          key={weekdayOption.value}
                          type="button"
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          aria-pressed={isSelected}
                          className="px-0"
                          onClick={() =>
                            field.handleChange(
                              toggleWeekday(
                                field.state.value,
                                weekdayOption.value
                              )
                            )
                          }
                        >
                          {weekdayOption.label}
                        </Button>
                      )
                    })}
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="startTime">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Giờ bắt đầu</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="time"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="endTime">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Giờ kết thúc</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="time"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="startDate">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Ngày bắt đầu</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="date"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="endDate">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Ngày kết thúc</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="date"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="meetingUrl">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Link học online</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="https://..."
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

function toggleWeekday(
  selectedWeekdays: ClassWeekday[],
  weekday: ClassWeekday
) {
  return selectedWeekdays.includes(weekday)
    ? selectedWeekdays.filter((selectedWeekday) => selectedWeekday !== weekday)
    : [...selectedWeekdays, weekday]
}
