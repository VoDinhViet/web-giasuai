import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon | React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 text-center",
        className
      )}
    >
      <div className="mb-6 flex size-24 items-center justify-center rounded-3xl bg-zinc-50 dark:bg-zinc-800/50">
        <Icon size={40} className="text-zinc-400" />
      </div>
      <h3 className="mb-2 text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      <p className="mb-8 max-w-sm text-[15px] font-medium text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
