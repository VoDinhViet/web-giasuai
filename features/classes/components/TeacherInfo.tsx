"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TeacherInfoProps {
  teacher?: {
    fullName?: string;
    email?: string;
    avatarUrl?: string;
  };
  className?: string;
  showEmail?: boolean;
  size?: "sm" | "md" | "lg";
}

export function TeacherInfo({ 
  teacher, 
  className, 
  showEmail = true,
  size = "md" 
}: TeacherInfoProps) {
  const sizeClasses = {
    sm: "h-7 w-7 text-[9px]",
    md: "h-9 w-9 text-[10px]",
    lg: "h-11 w-11 text-xs"
  };

  const initials = teacher?.fullName?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "GV";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar className={cn(sizeClasses[size], "rounded-lg ring-1 ring-zinc-100 dark:ring-zinc-800 shadow-none overflow-hidden")}>
        {teacher?.avatarUrl && <AvatarImage src={teacher.avatarUrl} alt={teacher.fullName} />}
        <AvatarFallback className="bg-primary/5 text-primary font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className={cn(
          "font-bold text-zinc-900 dark:text-zinc-100 leading-none truncate",
          size === "sm" ? "text-xs" : "text-sm"
        )}>
          {teacher?.fullName || "Chưa phân công"}
        </span>
        
        {showEmail && (
          <span className={cn(
            "text-zinc-400 dark:text-zinc-500 italic truncate",
            size === "sm" ? "text-[10px]" : "text-[11px]"
          )}>
            {teacher?.email || "teacher@giasu.ai"}
          </span>
        )}
      </div>
    </div>
  );
}
