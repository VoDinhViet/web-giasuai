import * as React from "react"

import { cn } from "@/lib/utils"

type CardVariant = "default" | "flat" | "outline" | "glass"
type CardSize = "default" | "sm" | "stat" | "none"

type CardProps = React.ComponentProps<"div"> & {
  variant?: CardVariant
  size?: CardSize
}

function Card({
  className,
  variant = "default",
  size = "default",
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-xl text-sm text-card-foreground transition-all duration-300 ease-out has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        "data-[size=default]:gap-4 data-[size=default]:py-4 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=stat]:gap-0 data-[size=stat]:py-0 data-[size=none]:gap-0 data-[size=none]:py-0",
        "has-data-[slot=card-footer]:pb-0 data-[size=sm]:has-data-[slot=card-footer]:pb-0 data-[size=stat]:has-data-[slot=card-footer]:pb-0 data-[size=none]:has-data-[slot=card-footer]:pb-0",
        "data-[variant=default]:border data-[variant=default]:border-border/70 data-[variant=default]:bg-card data-[variant=default]:shadow-xs data-[variant=default]:shadow-slate-900/5 data-[variant=default]:hover:border-primary/15 data-[variant=default]:hover:shadow-sm data-[variant=default]:hover:shadow-slate-900/6 dark:data-[variant=default]:bg-card/80 dark:data-[variant=default]:shadow-black/20",
        "data-[variant=flat]:border data-[variant=flat]:border-border/70 data-[variant=flat]:bg-card data-[variant=flat]:shadow-none data-[variant=flat]:hover:border-primary/15 data-[variant=flat]:hover:bg-card/95 data-[variant=flat]:hover:shadow-xs data-[variant=flat]:hover:shadow-slate-900/5 dark:data-[variant=flat]:bg-card/70 dark:data-[variant=flat]:hover:shadow-black/20",
        "data-[variant=outline]:border data-[variant=outline]:border-dashed data-[variant=outline]:border-border/70 data-[variant=outline]:bg-card/70 data-[variant=outline]:shadow-none",
        "data-[variant=glass]:border data-[variant=glass]:border-white/20 data-[variant=glass]:bg-white/80 data-[variant=glass]:shadow-lg data-[variant=glass]:shadow-slate-900/8 data-[variant=glass]:backdrop-blur-xl dark:data-[variant=glass]:border-white/10 dark:data-[variant=glass]:bg-zinc-950/50",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-xl px-5 group-data-[size=sm]/card:px-4 group-data-[size=none]/card:px-0 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-semibold tracking-normal text-foreground group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-5 group-data-[size=sm]/card:px-4 group-data-[size=stat]/card:p-6 group-data-[size=none]/card:px-0",
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t border-border/70 bg-muted/35 p-5 group-data-[size=sm]/card:p-4 group-data-[size=none]/card:p-0 dark:bg-muted/20",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
