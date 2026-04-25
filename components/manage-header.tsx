"use client";

import * as React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { ManageBreadcrumb } from "./manage-breadcrumb";
import { UserMenu } from "./user-menu";

interface ManageHeaderProps {
  className?: string;
}

export function ManageHeader({ className }: ManageHeaderProps) {
  return (
    <header className={cn("sticky top-0 z-20 flex h-14 shrink-0 items-center bg-background px-6 backdrop-blur-md", className)}>
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
        <ManageBreadcrumb />
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
