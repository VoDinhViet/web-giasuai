"use client"

import { useMemo, useState, type ReactNode } from "react"
import {
  Check,
  ChevronsUpDown,
  Search,
  UserCheck,
  UsersRound,
} from "lucide-react"

import { withForm } from "@/components/form/app-form"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { cn } from "@/lib/utils"
import type { ClassFormOption } from "../../types"
import {
  createClassDefaultValues,
  createClassNoneOptionValue,
} from "./create-class-form-values"
import { CreateClassFormSection } from "./create-class-form-section"

type CreateClassTeacherSectionProps = {
  teacherOptions: ClassFormOption[]
}

const createClassTeacherSectionDefaultProps: CreateClassTeacherSectionProps = {
  teacherOptions: [],
}

export const CreateClassTeacherSection = withForm({
  defaultValues: createClassDefaultValues,
  props: createClassTeacherSectionDefaultProps,
  render: function RenderCreateClassTeacherSection({ form, teacherOptions }) {
    return (
      <CreateClassFormSection
        icon={UserCheck}
        title="Quản lý lớp"
        description="Giáo viên được chọn sẽ phụ trách lịch học, điểm danh và hỗ trợ học viên trong lớp."
      >
        <FieldGroup className="grid gap-4">
          <form.Field name="instructorId">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0
              const selectedTeacher = teacherOptions.find(
                (teacherOption) => teacherOption.value === field.state.value
              )

              return (
                <FieldGroup className="grid gap-5">
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
                        {teacherOptions.length > 0
                          ? `${teacherOptions.length} lựa chọn`
                          : "Chưa có dữ liệu"}
                      </Badge>
                    </div>
                    <TeacherCombobox
                      isInvalid={isInvalid}
                      selectedTeacher={selectedTeacher}
                      teacherOptions={teacherOptions}
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
                </FieldGroup>
              )
            }}
          </form.Field>
        </FieldGroup>
      </CreateClassFormSection>
    )
  },
})

type TeacherComboboxProps = {
  isInvalid: boolean
  selectedTeacher?: ClassFormOption
  teacherOptions: ClassFormOption[]
  value: string
  onBlur: () => void
  onChange: (value: string) => void
}

function TeacherCombobox({
  isInvalid,
  selectedTeacher,
  teacherOptions,
  value,
  onBlur,
  onChange,
}: TeacherComboboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const filteredTeacherOptions = useMemo(() => {
    const normalizedSearchValue = normalizeSearchText(searchValue)

    if (!normalizedSearchValue) {
      return teacherOptions
    }

    return teacherOptions.filter((teacherOption) =>
      normalizeSearchText(
        `${teacherOption.label} ${teacherOption.description ?? ""}`
      ).includes(normalizedSearchValue)
    )
  }, [searchValue, teacherOptions])

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
              {selectedTeacher ? (
                getTeacherInitials(selectedTeacher.label)
              ) : (
                <UsersRound className="size-4" />
              )}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-foreground">
                {selectedTeacher?.label ?? "Chọn giáo viên phụ trách"}
              </span>
              <span className="block truncate text-xs font-normal text-muted-foreground">
                {selectedTeacher
                  ? getTeacherDescription(selectedTeacher)
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
          <TeacherOptionButton
            isSelected={value === createClassNoneOptionValue}
            label="Chưa chọn giáo viên"
            description="Cần chọn giáo viên trước khi tạo lớp."
            icon={<UsersRound className="size-4" />}
            onSelect={() => {
              onChange(createClassNoneOptionValue)
              setIsOpen(false)
            }}
          />

          {filteredTeacherOptions.length > 0 ? (
            filteredTeacherOptions.map((teacherOption) => (
              <TeacherOptionButton
                key={teacherOption.value}
                isSelected={teacherOption.value === value}
                label={teacherOption.label}
                description={getTeacherDescription(teacherOption)}
                icon={getTeacherInitials(teacherOption.label)}
                onSelect={() => {
                  onChange(teacherOption.value)
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

type TeacherOptionButtonProps = {
  description: string
  icon: string | ReactNode
  isSelected: boolean
  label: string
  onSelect: () => void
}

function TeacherOptionButton({
  description,
  icon,
  isSelected,
  label,
  onSelect,
}: TeacherOptionButtonProps) {
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

function getTeacherInitials(instructorName: string) {
  return instructorName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart[0])
    .join("")
    .toUpperCase()
}

function getTeacherDescription(teacherOption?: ClassFormOption) {
  if (!teacherOption) {
    return "Bạn có thể tạo lớp trước rồi phân công giáo viên sau."
  }

  return (
    teacherOption.description ??
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
