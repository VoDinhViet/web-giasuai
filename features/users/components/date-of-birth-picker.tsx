"use client"

import { DatePicker, type DatePickerProps } from "@/components/shared/date-picker"

export function DateOfBirthPicker(
  props: Omit<DatePickerProps, "placeholder" | "disableAfterToday" | "defaultMonth">
) {
  return (
    <DatePicker
      {...props}
      placeholder="Chọn ngày sinh"
      disableAfterToday={true}
      defaultMonth={new Date(2000, 0, 1)}
    />
  )
}

