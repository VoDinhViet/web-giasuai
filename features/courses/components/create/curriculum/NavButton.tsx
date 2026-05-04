import React from "react";
import { cn } from "@/lib/utils";
import { IconChevronRight } from "@tabler/icons-react";

interface NavButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
  icon: React.ElementType;
  variant?: "primary" | "secondary";
}

export function NavButton({
  isActive,
  onClick,
  label,
  icon: Icon,
  variant = "primary",
}: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full rounded-xl px-3 transition-all text-left group",
        variant === "primary"
          ? "h-11 text-xs font-bold uppercase tracking-widest"
          : "h-10 text-[11px] font-medium",
        isActive
          ? "bg-zinc-900 text-white shadow-sm"
          : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900",
      )}
    >
      <Icon
        size={isActive ? 18 : 16}
        stroke={2.5}
        className={cn(
          "shrink-0 transition-transform",
          isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-900",
          isActive && "scale-110"
        )}
      />
      <span className="truncate flex-1">{label || "Chưa đặt tên"}</span>
      {isActive && (
        <IconChevronRight size={14} stroke={3} className="shrink-0 opacity-50" />
      )}
    </button>
  );
}
