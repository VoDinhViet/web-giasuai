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
*   Keep shadcn/ui primitive files close to the generated CLI output. Do not add feature-specific helper exports such as custom field labels, one-page wrappers, or business UI into `components/ui`.
*   If a helper is only needed by one form/page, define it locally. If a composed component is genuinely reusable across multiple features, put it in `components/shared`.

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
