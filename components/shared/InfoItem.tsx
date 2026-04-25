import React from "react";
import { cn } from "@/lib/utils";

interface InfoItemProps {
  label: string;
  value: string | number;
  className?: string;
}

export function InfoItem({ label, value, className }: InfoItemProps) {
  return (
    <div className={cn("space-y-0", className)}>
      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 leading-none">
        {label}
      </span>
      <p className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 truncate pr-1 leading-normal">
        {value}
      </p>
    </div>
  );
}
