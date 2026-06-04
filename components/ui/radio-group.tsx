"use client"

import * as React from "react"
import { Circle } from "lucide-react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root> & {
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      data-orientation={orientation}
      className={cn(
        "grid gap-3",
        orientation === "horizontal" &&
          "flex flex-wrap items-center gap-x-7 gap-y-3",
        className
      )}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "aspect-square size-4 rounded-full border border-primary/35 text-primary shadow-xs transition-[color,box-shadow,border-color] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[state=checked]:border-primary",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <Circle className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
