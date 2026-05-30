import React from "react";
import { cn } from "@/lib/utils";

interface InfoItemProps {
  label: string;
  value: string | number;
  className?: string;
}

export function InfoItem({ label, value, className }: InfoItemProps) {
  return (
    <div className={cn("min-w-0 space-y-1", className)}>
      <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <p className="truncate text-sm font-semibold leading-none text-foreground">
        {value}
      </p>
    </div>
  );
}
