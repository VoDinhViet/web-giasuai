"use client";

import {
  IconBell, IconHelp, IconLogout, IconSettings, IconUser, IconShieldCheck,
} from "@tabler/icons-react";
import { useAuth } from "@/components/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/features/auth/actions/logout";
import { Badge } from "@/components/ui/badge";
import { getInitials, getRoleLabel } from "@/features/users/utils/user.util";

export function UserMenu() {
  const { myUser } = useAuth();
  const initials = getInitials(myUser?.fullName);
  const roleLabel = getRoleLabel(myUser?.role);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex items-center gap-2.5 p-1 pr-3 transition-all duration-300 hover:bg-accent outline-none active:scale-95">
          <Avatar className="size-8">
            <AvatarImage src="" className="object-cover" />
            <AvatarFallback className="text-[10px] font-black">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col items-start md:flex text-left">
            <span className="text-[13px] font-black tracking-tight leading-none">
              {myUser?.fullName || "-"}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground mt-1">
              {roleLabel}
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        sideOffset={8} 
        className="w-64 p-1.5 shadow-2xl backdrop-blur-xl bg-white/95 dark:bg-zinc-950/95 border-zinc-200/50 dark:border-zinc-800/50 animate-in fade-in zoom-in-95 duration-200"
      >
        <DropdownMenuLabel className="p-3 mb-1">
          <div className="flex items-center gap-3">
            <Avatar className="size-11">
              <AvatarImage src="" />
              <AvatarFallback className="font-black text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-black tracking-tight truncate leading-tight">
                {myUser?.fullName || "-"}
              </p>
              <p className="text-[11px] font-medium text-muted-foreground truncate mt-0.5">
                {myUser?.email}
              </p>
              <Badge variant="secondary" className="mt-2 w-fit gap-1 rounded-md px-1.5 py-0 text-[8px] font-black uppercase tracking-widest bg-primary/5 text-primary border-none">
                <IconShieldCheck size={10} stroke={3} className="text-primary" /> {roleLabel}
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="mx-2 bg-muted/50" />
        
        <div className="p-1 space-y-0.5">
          <Item icon={<IconUser size={16} />} label="Hồ sơ cá nhân" />
          <Item icon={<IconSettings size={16} />} label="Cài đặt hệ thống" />
          <Item icon={<IconBell size={16} />} label="Thông báo" />
        </div>

        <DropdownMenuSeparator className="mx-2 bg-muted/50" />
        
        <div className="p-1">
          <Item icon={<IconHelp size={16} />} label="Hỗ trợ & Trợ giúp" />
        </div>

        <DropdownMenuSeparator className="mx-2 bg-muted/50" />
        
        <div className="p-1">
          <DropdownMenuItem 
            onClick={() => logout()} 
            className="cursor-pointer gap-2.5 py-2.5 px-3.5 font-black text-[10px] uppercase tracking-widest text-destructive focus:bg-destructive/10 focus:text-destructive transition-all active:scale-95"
          >
            <IconLogout size={16} stroke={3} className="text-destructive" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Item({ icon, label, badge }: { icon: React.ReactNode; label: string; badge?: string }) {
  return (
    <DropdownMenuItem className="cursor-pointer group flex items-center gap-2.5 py-2 px-3.5 font-bold text-[13px] text-muted-foreground hover:bg-accent hover:text-primary transition-all duration-200 active:scale-98">
      <div className="text-muted-foreground group-hover:text-primary transition-colors duration-200">{icon}</div>
      <span className="flex-1 tracking-tight">{label}</span>
      {badge && (
        <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-primary">
          {badge}
        </span>
      )}
    </DropdownMenuItem>
  );
}
