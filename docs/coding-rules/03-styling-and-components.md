# 3. Styling & Components

## 3.1 Keep Helpers Inline by Default
*   Write formatting/logic **inline** or using `useMemo` if used in a single component.
*   Only separate utilities/helpers when they are actually reused in multiple files.

```tsx
// ✅ GOOD
export function DateDisplay({ date }: { date: Date }) {
  return <span>{format(date, "dd/MM/yyyy")}</span>
}
```

## 3.2 shadcn/ui Customization
*   Never edit files inside `@/components/ui/` for single screen layout.
*   Pass styling via custom `className` and use `cn()` for conditional classes.

```tsx
// ✅ GOOD
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SpecialButton({ isDanger }: { isDanger: boolean }) {
  return <Button className={cn("rounded-lg", isDanger && "bg-destructive")}>Submit</Button>
}
```

## 3.3 Semantic Tokens
*   Always use semantic tokens: `bg-background`, `text-foreground`, `border-border`, `bg-card`, `bg-primary`.
*   Avoid hardcoded colors (`bg-[#ffffff]`, `bg-red-500`).
