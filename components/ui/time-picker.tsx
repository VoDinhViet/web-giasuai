"use client"

import * as React from "react"
import { Clock3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type TimePickerProps = Omit<
  React.ComponentProps<typeof Button>,
  "onChange" | "value"
> & {
  name?: string
  placeholder?: string
  step?: number
  value?: string
  onChange: (value: string) => void
}

const hours = Array.from({ length: 24 }, (_, hour) =>
  hour.toString().padStart(2, "0")
)

function TimePicker({
  className,
  disabled,
  name,
  onBlur,
  onChange,
  placeholder = "Chọn giờ",
  step = 300,
  value = "",
  ...props
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedHour, selectedMinute] = getTimeParts(value)
  const minutes = React.useMemo(
    () => getMinutes(step, selectedMinute),
    [selectedMinute, step]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <input name={name} value={value} type="hidden" readOnly />
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-between bg-card font-normal tabular-nums hover:bg-card",
            !value && "text-muted-foreground",
            className
          )}
          onBlur={onBlur}
          {...props}
        >
          {value ? getTimeLabel(value) : placeholder}
          <Clock3 data-icon="inline-end" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <div className="border-b border-border/70 px-4 py-3">
          <p className="text-xs font-medium text-muted-foreground">Thời gian</p>
          <p className="mt-1 text-2xl leading-8 font-semibold tracking-normal text-foreground tabular-nums">
            {value ? getTimeLabel(value) : "--:--"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 p-3">
          <TimeColumn
            label="Giờ"
            options={hours}
            value={selectedHour}
            onSelect={(hour) => {
              onChange(`${hour}:${selectedMinute}`)
            }}
          />
          <TimeColumn
            label="Phút"
            options={minutes}
            value={selectedMinute}
            onSelect={(minute) => {
              onChange(`${selectedHour}:${minute}`)
              setOpen(false)
            }}
          />
        </div>

        <div className="flex items-center justify-between border-t border-border/70 px-3 py-2">
          <Button
            type="button"
            variant="link"
            size="sm"
            disabled={!value}
            onClick={() => {
              onChange("")
              setOpen(false)
            }}
          >
            Xóa
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              onChange(getCurrentTime())
              setOpen(false)
            }}
          >
            Bây giờ
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

type TimeColumnProps = {
  label: string
  options: string[]
  value: string
  onSelect: (value: string) => void
}

function TimeColumn({ label, options, value, onSelect }: TimeColumnProps) {
  return (
    <div className="grid gap-2">
      <p className="px-1 text-xs font-medium text-muted-foreground">{label}</p>
      <ScrollArea className="h-48 rounded border border-border/70 bg-muted/25">
        <div className="grid grid-cols-2 gap-1 p-1.5">
          {options.map((option) => (
            <Button
              key={option}
              type="button"
              variant={option === value ? "default" : "ghost"}
              size="sm"
              className="h-8 w-full justify-center px-0 font-normal tabular-nums"
              onClick={() => onSelect(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

function getTimeParts(value: string) {
  const [hour = "00", minute = "00"] = value.split(":")

  return [hour.padStart(2, "0"), minute.padStart(2, "0")]
}

function getTimeLabel(value: string) {
  const [hour, minute] = getTimeParts(value)

  return `${hour}:${minute}`
}

function getMinutes(step: number, selectedMinute: string) {
  const minuteStep = Math.max(1, Math.floor(step / 60))
  const count = Math.ceil(60 / minuteStep)

  const minutes = Array.from({ length: count }, (_, index) =>
    String(index * minuteStep).padStart(2, "0")
  ).filter((minute) => Number(minute) < 60)

  return [...new Set([...minutes, selectedMinute])].sort()
}

function getCurrentTime() {
  const now = new Date()
  const hour = now.getHours().toString().padStart(2, "0")
  const minute = now.getMinutes().toString().padStart(2, "0")

  return `${hour}:${minute}`
}

export { TimePicker }
