import { RadioGroupItem } from "@/components/ui/radio-group"

type CreateClassRadioOptionProps = {
  value: string
  label: string
}

export function CreateClassRadioOption({
  value,
  label,
}: CreateClassRadioOptionProps) {
  return (
    <label className="flex items-center gap-2 rounded border border-border/70 px-3 py-2 text-sm font-medium text-foreground">
      <RadioGroupItem value={value} />
      {label}
    </label>
  )
}
