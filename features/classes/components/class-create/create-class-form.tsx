"use client"

import { useMemo, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import {
  CalendarDays,
  Check,
  ChevronsUpDown,
  GraduationCap,
  Search,
  UserCheck,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react"
import { toast } from "sonner"

import { useAppForm } from "@/components/form/app-form"
import { DatePicker } from "@/components/shared/date-picker"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { TimePicker } from "@/components/ui/time-picker"
import { cn } from "@/lib/utils"
import { createClass } from "../../actions/create-class"
import {
  classFormatOptions,
  classJoinPolicyOptions,
  classStatusOptions,
  classWeekdayOptions,
  createClassSchema,
  type CreateClassInput,
} from "../../schemas/class.schema"
import type {
  ClassFormat,
  ClassFormOption,
  ClassJoinPolicy,
  ClassWeekday,
} from "../../types"
import { CreateClassPreview } from "./create-class-preview"
import {
  createClassDefaultValues,
  createClassNoneOptionValue,
} from "./create-class-form-values"

type CreateClassFormProps = {
  instructorOptions: ClassFormOption[]
}

export function CreateClassForm({ instructorOptions }: CreateClassFormProps) {
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
      className="grid min-w-0 max-w-full gap-5 2xl:grid-cols-[minmax(0,1fr)_23rem]"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
      noValidate
    >
      <div className="flex min-w-0 flex-col gap-5">
        <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(18rem,1.05fr)]">
          <FormSection
            icon={GraduationCap}
            title="Thông tin cơ bản"
            description="Đặt tên, mã lớp và trạng thái vận hành ban đầu."
          >
            <FieldGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
              <form.Field name="status">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0

                  return (
                    <Field data-invalid={isInvalid}>
                      <RequiredFieldLabel>Trạng thái</RequiredFieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) =>
                          field.handleChange(
                            value as CreateClassInput["status"]
                          )
                        }
                      >
                        <SelectTrigger
                          className="w-full"
                          aria-invalid={isInvalid}
                        >
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
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>

              <form.Field name="name">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0

                  return (
                    <Field
                      data-invalid={isInvalid}
                      className="sm:col-span-2 lg:col-span-1 2xl:col-span-2"
                    >
                      <RequiredFieldLabel htmlFor={field.name}>
                        Tên lớp học
                      </RequiredFieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="B2B Sales A01"
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>
            </FieldGroup>
          </FormSection>

          <FormSection
            icon={UserCheck}
            title="Quản lý lớp"
            description="Giáo viên được chọn sẽ phụ trách lịch học, điểm danh và hỗ trợ học viên trong lớp."
          >
            <FieldGroup className="grid gap-4">
              <form.Field name="instructorId">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                  const selectedInstructor = instructorOptions.find(
                    (instructorOption) =>
                      instructorOption.value === field.state.value
                  )

                  return (
                    <Field data-invalid={isInvalid} className="min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <FieldLabel>Giáo viên phụ trách</FieldLabel>
                          <FieldDescription className="mt-1">
                            Phân công người vận hành lịch học, điểm danh và chăm
                            sóc học viên.
                          </FieldDescription>
                        </div>
                        <Badge variant="ghost">
                          {instructorOptions.length > 0
                            ? `${instructorOptions.length} lựa chọn`
                            : "Chưa có dữ liệu"}
                        </Badge>
                      </div>
                      <InstructorCombobox
                        isInvalid={isInvalid}
                        selectedInstructor={selectedInstructor}
                        instructorOptions={instructorOptions}
                        value={field.state.value || createClassNoneOptionValue}
                        onBlur={field.handleBlur}
                        onChange={(value) =>
                          field.handleChange(
                            value === createClassNoneOptionValue ? "" : value
                          )
                        }
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>
            </FieldGroup>
          </FormSection>
        </div>

        <FormSection
          icon={CalendarDays}
          title="Lịch học"
          description="Tạo khung lịch mặc định để sinh buổi học sau khi API hỗ trợ."
        >
          <FieldGroup className="grid gap-5 sm:grid-cols-2">
            <form.Field name="format">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid} className="sm:col-span-2">
                    <RequiredFieldLabel>Hình thức học</RequiredFieldLabel>
                    <RadioGroup
                      value={field.state.value}
                      orientation="horizontal"
                      className="grid gap-2 sm:grid-cols-3"
                      onValueChange={(value) =>
                        field.handleChange(value as ClassFormat)
                      }
                    >
                      {classFormatOptions.map((formatOption) => (
                        <RadioOption
                          key={formatOption.value}
                          value={formatOption.value}
                          label={formatOption.label}
                        />
                      ))}
                    </RadioGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="repeatDays">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid} className="sm:col-span-2">
                    <FieldLabel>Ngày học trong tuần</FieldLabel>
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
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
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="startTime">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Giờ bắt đầu</FieldLabel>
                    <TimePicker
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={field.handleChange}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="endTime">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Giờ kết thúc</FieldLabel>
                    <TimePicker
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={field.handleChange}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="startDate">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Ngày bắt đầu</FieldLabel>
                    <DatePicker
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={field.handleChange}
                      isInvalid={isInvalid}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="endDate">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Ngày kết thúc</FieldLabel>
                    <DatePicker
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={field.handleChange}
                      isInvalid={isInvalid}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="meetingUrl">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid} className="sm:col-span-2">
                    <FieldLabel htmlFor={field.name}>
                      Link học online
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="https://..."
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>
        </FormSection>

        <FormSection
          icon={Users}
          title="Ghi danh và vận hành"
          description="Cấu hình sức chứa, cách nhận học viên và tự động hóa lớp."
        >
          <FieldGroup className="grid gap-5 sm:grid-cols-2">
            <form.Field name="maxStudents">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <RequiredFieldLabel htmlFor={field.name}>
                      Sĩ số tối đa
                    </RequiredFieldLabel>
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
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="joinPolicy">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <RequiredFieldLabel>Cách ghi danh</RequiredFieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) =>
                        field.handleChange(value as ClassJoinPolicy)
                      }
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={isInvalid}
                      >
                        <SelectValue placeholder="Chọn cách ghi danh" />
                      </SelectTrigger>
                      <SelectContent>
                        {classJoinPolicyOptions.map((joinPolicyOption) => (
                          <SelectItem
                            key={joinPolicyOption.value}
                            value={joinPolicyOption.value}
                          >
                            {joinPolicyOption.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <div className="grid gap-3 sm:col-span-2">
              <form.Field name="waitlistEnabled">
                {(field) => (
                  <ToggleRow
                    title="Cho phép danh sách chờ"
                    description="Nhận học viên chờ khi lớp đã đủ sĩ số."
                    checked={field.state.value}
                    onChange={field.handleChange}
                  />
                )}
              </form.Field>

              <form.Field name="reminderEnabled">
                {(field) => (
                  <ToggleRow
                    title="Gửi nhắc lịch trước buổi học"
                    description="Chuẩn bị sẵn cấu hình nhắc lịch cho học viên và giáo viên."
                    checked={field.state.value}
                    onChange={field.handleChange}
                  />
                )}
              </form.Field>

              <form.Field name="autoCreateSessions">
                {(field) => (
                  <ToggleRow
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
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid} className="sm:col-span-2">
                    <FieldLabel htmlFor={field.name}>
                      Ghi chú vận hành
                    </FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Ghi chú yêu cầu phòng học, tài liệu, nhóm học viên..."
                      className="min-h-32 resize-y"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>
        </FormSection>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <div className="flex flex-col-reverse gap-3 border-t border-border/80 bg-background pt-5 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => router.push("/manage/classes")}
              >
                Hủy bỏ
              </Button>
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? "Đang tạo..." : "Tạo lớp học"}
              </Button>
            </div>
          )}
        </form.Subscribe>
      </div>

      <form.Subscribe selector={(state) => state.values}>
        {(values) => (
          <CreateClassPreview
            values={values}
            instructorOptions={instructorOptions}
          />
        )}
      </form.Subscribe>
    </form>
  )
}

type FormSectionProps = {
  icon: LucideIcon
  title: string
  description?: string
  children: ReactNode
}

function FormSection({
  icon: Icon,
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="flex flex-row items-start gap-3 border-b border-border/70 p-5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
        <div className="min-w-0">
          <CardTitle>{title}</CardTitle>
          {description ? (
            <CardDescription className="mt-1">{description}</CardDescription>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  )
}

type RequiredFieldLabelProps = {
  children: ReactNode
  htmlFor?: string
}

function RequiredFieldLabel({ children, htmlFor }: RequiredFieldLabelProps) {
  return (
    <FieldLabel htmlFor={htmlFor}>
      {children}
      <span className="text-destructive">*</span>
    </FieldLabel>
  )
}

type RadioOptionProps = {
  value: string
  label: string
}

function RadioOption({ value, label }: RadioOptionProps) {
  return (
    <label className="flex items-center gap-2 rounded border border-border/70 px-3 py-2 text-sm font-medium text-foreground">
      <RadioGroupItem value={value} />
      {label}
    </label>
  )
}

type ToggleRowProps = {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function ToggleRow({ title, description, checked, onChange }: ToggleRowProps) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      className={cn(
        "flex w-full items-start justify-between gap-4 rounded border px-4 py-3 text-left transition-colors",
        checked
          ? "border-primary/35 bg-primary/5 text-foreground"
          : "border-border/70 bg-background text-foreground hover:bg-muted/30"
      )}
      onClick={() => onChange(!checked)}
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
          {description}
        </span>
      </span>
      <span
        className={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded border",
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background text-transparent"
        )}
      >
        <Check className="size-3.5" />
      </span>
    </button>
  )
}

type InstructorComboboxProps = {
  isInvalid: boolean
  selectedInstructor?: ClassFormOption
  instructorOptions: ClassFormOption[]
  value: string
  onBlur: () => void
  onChange: (value: string) => void
}

function InstructorCombobox({
  isInvalid,
  selectedInstructor,
  instructorOptions,
  value,
  onBlur,
  onChange,
}: InstructorComboboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const filteredInstructorOptions = useMemo(() => {
    const normalizedSearchValue = normalizeSearchText(searchValue)

    if (!normalizedSearchValue) {
      return instructorOptions
    }

    return instructorOptions.filter((instructorOption) =>
      normalizeSearchText(
        `${instructorOption.label} ${instructorOption.description ?? ""}`
      ).includes(normalizedSearchValue)
    )
  }, [searchValue, instructorOptions])

  return (
    <Popover
      open={isOpen}
      onOpenChange={(nextOpen) => {
        setIsOpen(nextOpen)

        if (!nextOpen) {
          setSearchValue("")
          onBlur()
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          aria-expanded={isOpen}
          aria-invalid={isInvalid}
          className="h-auto min-h-12 w-full justify-between gap-3 px-3 py-2 text-left"
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded bg-primary/10 text-xs font-semibold text-primary">
              {selectedInstructor ? (
                getInstructorInitials(selectedInstructor.label)
              ) : (
                <UsersRound className="size-4" />
              )}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-foreground">
                {selectedInstructor?.label ?? "Chọn giáo viên phụ trách"}
              </span>
              <span className="block truncate text-xs font-normal text-muted-foreground">
                {selectedInstructor
                  ? getInstructorDescription(selectedInstructor)
                  : "Tìm theo tên hoặc email giáo viên"}
              </span>
            </span>
          </span>
          <ChevronsUpDown className="size-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] gap-0 p-0"
      >
        <div className="border-b border-border/70 p-2">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="h-9 pl-9"
              placeholder="Tìm giáo viên..."
              autoFocus
            />
          </div>
        </div>

        <div role="listbox" className="max-h-72 overflow-y-auto p-1.5">
          <InstructorOptionButton
            isSelected={value === createClassNoneOptionValue}
            label="Chưa chọn giáo viên"
            description="Cần chọn giáo viên trước khi tạo lớp."
            icon={<UsersRound className="size-4" />}
            onSelect={() => {
              onChange(createClassNoneOptionValue)
              setIsOpen(false)
            }}
          />

          {filteredInstructorOptions.length > 0 ? (
            filteredInstructorOptions.map((instructorOption) => (
              <InstructorOptionButton
                key={instructorOption.value}
                isSelected={instructorOption.value === value}
                label={instructorOption.label}
                description={getInstructorDescription(instructorOption)}
                icon={getInstructorInitials(instructorOption.label)}
                onSelect={() => {
                  onChange(instructorOption.value)
                  setIsOpen(false)
                }}
              />
            ))
          ) : (
            <div className="px-3 py-8 text-center">
              <p className="text-sm font-medium text-foreground">
                Không tìm thấy giáo viên
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Thử tìm bằng tên hoặc email khác.
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

type InstructorOptionButtonProps = {
  description: string
  icon: string | ReactNode
  isSelected: boolean
  label: string
  onSelect: () => void
}

function InstructorOptionButton({
  description,
  icon,
  isSelected,
  label,
  onSelect,
}: InstructorOptionButtonProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      className={cn(
        "flex w-full items-start gap-3 rounded px-2.5 py-2 text-left transition-colors outline-none hover:bg-muted focus-visible:bg-muted",
        isSelected && "bg-primary/10 text-primary hover:bg-primary/15"
      )}
      onClick={onSelect}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded bg-muted text-xs font-semibold text-muted-foreground",
          isSelected && "bg-primary/15 text-primary"
        )}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{label}</span>
        <span
          className={cn(
            "mt-0.5 block truncate text-xs text-muted-foreground",
            isSelected && "text-primary/80"
          )}
        >
          {description}
        </span>
      </span>
      {isSelected ? <Check className="mt-1 size-4 shrink-0" /> : null}
    </button>
  )
}

function toggleWeekday(
  selectedWeekdays: ClassWeekday[],
  weekday: ClassWeekday
) {
  return selectedWeekdays.includes(weekday)
    ? selectedWeekdays.filter((selectedWeekday) => selectedWeekday !== weekday)
    : [...selectedWeekdays, weekday]
}

function getInstructorInitials(instructorName: string) {
  return instructorName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart[0])
    .join("")
    .toUpperCase()
}

function getInstructorDescription(instructorOption?: ClassFormOption) {
  if (!instructorOption) {
    return "Bạn có thể tạo lớp trước rồi phân công giáo viên sau."
  }

  return (
    instructorOption.description ??
    "Người này sẽ nhận lớp, theo dõi tiến độ và hỗ trợ học viên."
  )
}

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}
