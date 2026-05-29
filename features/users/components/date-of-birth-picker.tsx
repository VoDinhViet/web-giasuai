"use client"

import { useState } from "react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { IconCalendar } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type DateOfBirthPickerProps = {
  id: string
  name: string
  value?: string
  isInvalid?: boolean
  onBlur: () => void
  onChange: (value: string) => void
}

export function DateOfBirthPicker({
  id,
  name,
  value,
  isInvalid,
  onBlur,
  onChange,
}: DateOfBirthPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedDate = parseDateInput(value)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          name={name}
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-between text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
          aria-invalid={isInvalid}
          onBlur={onBlur}
        >
          {selectedDate
            ? format(selectedDate, "dd/MM/yyyy", { locale: vi })
            : "Chọn ngày sinh"}
          <IconCalendar className="size-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          locale={vi}
          selected={selectedDate}
          defaultMonth={selectedDate ?? new Date(2000, 0, 1)}
          captionLayout="dropdown"
          startMonth={new Date(1900, 0, 1)}
          endMonth={new Date()}
          disabled={{ after: new Date() }}
          onSelect={(date) => {
            onChange(date ? formatDateInput(date) : "")
            setIsOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

function parseDateInput(value?: string) {
  if (!value) {
    return undefined
  }

  const dateInput = value.split("T")[0]
  const [year, month, day] = dateInput.split("-").map(Number)

  if (!year || !month || !day) {
    return undefined
  }

  return new Date(year, month - 1, day)
}

function formatDateInput(date: Date) {
  return format(date, "yyyy-MM-dd")
}
