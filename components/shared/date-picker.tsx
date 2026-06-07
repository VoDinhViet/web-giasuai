"use client"

import { useState, useMemo } from "react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { IconCalendar } from "@tabler/icons-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export interface DatePickerProps extends Omit<
  React.ComponentPropsWithoutRef<"button">,
  "value" | "onChange"
> {
  value?: string
  placeholder?: string
  isInvalid?: boolean
  onChange: (value: string) => void

  captionLayout?: "dropdown" | "dropdown-months" | "dropdown-years" | "label"
  minYear?: number
  maxYear?: number
  defaultMonth?: Date
  disableAfterToday?: boolean
}

export function DatePicker({
  value,
  placeholder = "Chọn ngày",
  isInvalid,
  disabled = false,
  onBlur,
  onChange,
  captionLayout = "dropdown",
  minYear = 1900,
  maxYear = new Date().getFullYear(),
  defaultMonth,
  disableAfterToday = false,
  className,
  ...buttonProps
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Parse inline an toàn múi giờ
  const selectedDate = useMemo(() => {
    if (!value) return undefined
    const [year, month, day] = value.split("T")[0].split("-").map(Number)
    return year && month && day ? new Date(year, month - 1, day) : undefined
  }, [value])

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <input
        name={buttonProps.name}
        value={value ?? ""}
        type="hidden"
        readOnly
      />
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-between bg-card text-left font-normal hover:bg-card",
            !selectedDate && "text-muted-foreground",
            isInvalid &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
            className
          )}
          aria-invalid={isInvalid}
          onBlur={onBlur}
          {...buttonProps}
        >
          {selectedDate
            ? format(selectedDate, "dd/MM/yyyy", { locale: vi })
            : placeholder}
          <IconCalendar className="size-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          locale={vi}
          selected={selectedDate}
          defaultMonth={selectedDate ?? defaultMonth ?? new Date(2000, 0, 1)}
          captionLayout={captionLayout}
          startMonth={new Date(minYear, 0, 1)}
          endMonth={new Date(maxYear, 11, 31)}
          disabled={disableAfterToday ? { after: new Date() } : undefined}
          onSelect={(date) => {
            onChange(date ? format(date, "yyyy-MM-dd") : "")
            setIsOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
