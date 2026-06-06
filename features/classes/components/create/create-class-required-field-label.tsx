import type { ReactNode } from "react"

import { FieldLabel } from "@/components/ui/field"

type CreateClassRequiredFieldLabelProps = {
  children: ReactNode
  htmlFor?: string
}

export function CreateClassRequiredFieldLabel({
  children,
  htmlFor,
}: CreateClassRequiredFieldLabelProps) {
  return (
    <FieldLabel htmlFor={htmlFor}>
      {children}
      <span className="text-destructive">*</span>
    </FieldLabel>
  )
}
