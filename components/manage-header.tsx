"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { AccountMenu } from "./account-menu";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

interface ManageHeaderProps {
  className?: string;
}

export function ManageHeader({ className }: ManageHeaderProps) {

  const { toggleSidebar } = useSidebar();


  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950 md:px-6",
        className,
      )}
    >
      <Button variant="ghost" size="icon-lg" onClick={toggleSidebar} >
          <Menu size={18} />
      </Button>

      <div className="flex-1" />

      <ThemeToggle />
      <AccountMenu />
    </header>
  );
}
