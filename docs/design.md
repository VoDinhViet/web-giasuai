# Design Guidelines

## 1. Colors
*   **Semantic Only**: `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `bg-primary`.
*   **No Hardcoding**: Never use raw hex codes (`#ffffff`) or generic colors (`bg-red-500`, `bg-blue-500`) directly.
*   **Aesthetics**: Use soft semantic tints (e.g. `bg-destructive/10 text-destructive`) instead of harsh alerts.

## 2. Typography & Fonts
*   **Font Family**: Google Fonts **Inter** or **Outfit** by default.
*   **Size Scale**:
    *   Sidebar / Tables: `text-sm` (14px)
    *   Subtext / Employee Code: `text-xs` (12px) or `text-[10px]`
    *   Section Headers: `text-base` (16px) or `text-lg` (18px) + `font-semibold`
    *   Page Titles: `text-2xl` (24px) + `font-bold`

## 3. Borders & Radius
*   **Default Radius**: shadcn defaults (`rounded-lg` for cards/dialogs, `rounded-md` for inputs/buttons).
*   **Limit Large Radius**: Avoid `rounded-2xl` or larger unless explicitly required.
*   **Borders**: Use translucent border lines (`border-border/70` or `border-border/40`) for a modern clean layout.

## 4. Micro-animations
*   **Hover & Active States**:
    *   Navigation: `hover:bg-accent hover:text-accent-foreground`
    *   Buttons: `hover:opacity-90 active:scale-[0.98]`
*   **Transitions**: Apply smooth transition classes: `transition-all duration-200 ease-in-out`
*   **Glassmorphism**: Sticky headers or overlays: `bg-background/80 backdrop-blur-md`

## 5. Premium Layouts
*   **Zero Placeholders**: Never use dummy/lorem text or gray box assets. Use meaningful real mockup values.
*   **Spacing Consistency**:
    *   Table padding: `px-4 py-3`
    *   Form field vertical gap: `space-y-4`
    *   Container inner padding: `p-6`
