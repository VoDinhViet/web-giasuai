"use client";

import React from "react";
import {
  IconMail,
  IconPhone,
  IconCertificate,
  IconMessage,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface InstructorCardProps {
  teacher?: {
    fullName?: string;
    email?: string;
    username?: string;
    avatarUrl?: string;
  };
  description?: string;
}

export function InstructorCard({ teacher, description }: InstructorCardProps) {
  const initials =
    teacher?.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "GV";

  const avatarSrc =
    teacher?.avatarUrl ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${teacher?.username || "teacher"}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center justify-between">
          Giảng viên phụ trách
          <IconCertificate size={14} className="text-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Profile Section */}
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 rounded-2xl">
            <AvatarImage src={avatarSrc} alt={teacher?.fullName} />
            <AvatarFallback className="bg-zinc-950 font-black text-xs rounded-2xl text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-base font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
              {teacher?.fullName || "Chưa cập nhật"}
            </p>
            <p className="text-[11px] font-bold text-primary uppercase tracking-wide">
              Giảng viên chuyên môn
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <ContactItem
            icon={<IconMail size={16} />}
            value={teacher?.email || "Chưa có email"}
          />
          <ContactItem icon={<IconPhone size={16} />} value="+84 987 654 321" />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t grid grid-cols-2 gap-2">
          <ActionButton
            icon={<IconMessage size={14} />}
            label="Nhắn tin"
            variant="outline"
            onClick={() => console.log("Messaging...")}
          />
          <ActionButton
            icon={<IconMail size={14} />}
            label="Gửi Email"
            onClick={() =>
              teacher?.email &&
              (window.location.href = `mailto:${teacher.email}`)
            }
          />
        </div>

        {/* Description Section */}
        <div className="bg-zinc-50/50 dark:bg-zinc-900/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
            Thông tin lớp học
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 italic font-medium leading-relaxed whitespace-pre-wrap break-words">
            {description || "Lớp học chưa có mô tả chi tiết."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/* --- Sub-components for Cleaner Code --- */

function ContactItem({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 text-xs text-zinc-500 font-bold">
      <div className="size-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400">
        {icon}
      </div>
      <span className="truncate">{value}</span>
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

function ActionButton({
  icon,
  label,
  variant = "default",
  size = "sm",
  onClick,
  className,
  disabled,
}: ActionButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={cn("rounded-lg font-bold text-[11px] h-9 gap-2", className)}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
}
