import * as React from "react"

import { cn } from "@/lib/utils"

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-4 p-6 text-center",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-2", className)}
      {...props}
    />
  )
}

import { cva, type VariantProps } from "class-variance-authority"

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center text-muted-foreground border border-border bg-muted/40",
  {
    variants: {
      variant: {
        default: "size-12 rounded-md",
        icon: "size-12 rounded-full [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface EmptyMediaProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof emptyMediaVariants> {}

function EmptyMedia({ className, variant, ...props }: EmptyMediaProps) {
  return (
    <div
      data-slot="empty-media"
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="empty-title"
      className={cn("text-base leading-6 font-semibold", className)}
      {...props}
    />
  )
}

function EmptyDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cn("text-sm leading-6 text-muted-foreground", className)}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
}
