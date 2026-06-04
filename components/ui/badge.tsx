import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit max-w-full shrink-0 items-center justify-center gap-1 overflow-hidden rounded-[var(--radius-sm)] border bg-clip-padding px-2.5 text-xs leading-none font-semibold whitespace-nowrap shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/45 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-destructive/40 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-primary/20 bg-primary text-primary-foreground [a]:hover:bg-primary/90",
        secondary:
          "border-border/70 bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "border-destructive/25 bg-destructive/10 text-destructive shadow-none focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/15",
        outline:
          "border-border/80 bg-background text-foreground [a]:hover:bg-muted [a]:hover:text-foreground",
        ghost:
          "border-transparent bg-muted/65 text-muted-foreground shadow-none dark:bg-muted/50 [a]:hover:bg-muted [a]:hover:text-foreground",
        link: "h-auto border-transparent bg-transparent px-0 text-primary underline-offset-4 shadow-none hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
