# Design Rules

## Direction

- Modern SaaS dashboard: clean, bright, friendly, professional.
- Prefer light background, white cards, soft borders, subtle shadows.
- Operational data must be easy to scan: KPI, status, table, alert, and actions need clear hierarchy.
- Do not use marketing hero layouts, decorative gradient orbs, heavy glassmorphism, or illustration-only sections for app screens.
- Avoid one-note palettes; use 2-4 purposeful tones per complex screen.

## Tokens And Colors

- Use semantic tokens in feature UI: `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-primary`.
- Raw color values belong in `app/globals.css` or reusable primitives, not feature pages.
- Use status meaning consistently:
  - `success`: active, completed, approved, healthy.
  - `warning`: pending, needs attention, upcoming deadline.
  - `destructive`: locked, rejected, overdue, high risk.
  - `secondary/info`: AI, data, analysis, progress.
- Do not hardcode feature colors with `bg-blue-*`, `text-red-*`, hex values, or inline color styles.

## Layout

- App shell uses sidebar left and content right.
- Manage content uses `px-4 py-6 sm:px-6 lg:px-8`.
- Default section spacing is `gap-5`; denser table/filter areas may use `gap-3` or `gap-4`.
- Use `items-start` for grids where cards have content-driven height.
- Mobile layout must stack controls and prevent text overflow.
- List pages should read top-to-bottom: stats row first, then one table card containing filters, table, and pagination.
- The page container pattern for management lists is `flex w-full flex-col gap-5`.

## Cards

- Use cards for KPI, panels, repeated items, forms, and table containers.
- Do not nest decorative cards inside cards.
- Do not override shadcn card background, border, shadow, or radius in feature code unless product need is clear.
- Prefer compact cards for internal tools; avoid empty oversized cards.
- KPI cards may use custom markup when shadcn `Card` composition would add unwanted layout or spacing.
- KPI card style should stay simple: `rounded`, `border border-border/80`, `bg-card`, `p-4`, `shadow-xs`.
- KPI icon wrapper should be subtle: `size-9`, semantic `bg-*/10`, semantic text color, no border/ring unless needed.
- Avoid hover styling on KPI cards unless the card is clickable.

## Typography

- App page titles should be clear and bold, but not marketing-scale.
- Section titles use `text-base`/`text-lg` and `font-semibold`.
- KPI values should be larger and easier to scan than labels.
- Helper text uses `text-sm` or `text-xs` with `text-muted-foreground`.
- Do not use viewport-scaled font sizes or negative letter spacing.

## Tables

- Table header should be subtle and readable.
- Row hover may be light, but should not dominate.
- Use status badges/dots for state; avoid unnecessary cell icons.
- Row actions should be clear icon buttons with tooltips or concise buttons.
- Table containers should use one shadcn `Card` with `gap-0 py-0` when filters, table, and pagination belong together.
- Filter area sits inside the table card, above the table, with `border-b border-border/70 bg-muted/25 px-4 py-4 sm:px-5`.
- Table header may use `bg-muted/20`, `h-11`, small bold labels, and thin column borders.
- Table rows may use `h-14` and a light `hover:bg-primary/5`.
- Use fixed/min widths for dense admin tables, e.g. `min-w-240`, and per-column width helpers.
- Empty table states should use shadcn `Empty` primitives inside a full-width table row.
- User/email cells should prioritize text readability; remove decorative icons from cells when the column header already explains the data.

## Filters

- Use shadcn `Label` for all filter labels.
- Shared label style belongs in `components/ui/label.tsx`; avoid repeating `className="text-xs text-muted-foreground"`.
- Search inputs can use a single leading icon when it helps identify search behavior.
- Filter grids should stay compact and responsive: wide search column first, select controls and primary action on the right.

## Icons

- Use the project's configured icon family when possible.
- Do not hand-roll SVG icons.
- Icons should support scanning; remove icons that add noise.
- Icon backgrounds should be subtle and semantic when used in KPI/status cards.
- On stats cards, prefer Tabler icons with `stroke-[2.5]` for stronger visual weight.
- Keep stat icons small inside a slightly larger colored background: icon `size-4`, wrapper `size-9`.
- Row action icons should be inside icon buttons with tooltips; data cells should avoid icons unless they improve recognition.
