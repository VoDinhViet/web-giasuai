"use client";

import React from "react";
import { IconBook, IconUser } from "@tabler/icons-react";
import { parseAsStringEnum, useQueryState } from "nuqs";

import { useAuth } from "@/components/providers/auth-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types/user";
import { ClassDetailCourses } from "./ClassDetailCourses";
import { ClassStudentsTable } from "./ClassStudentsTable";

interface ClassDetailTabsProps {
  classId: string;
}

enum TabType {
  STUDENTS = "students",
  COURSES = "courses",
}

export function ClassDetailTabs({ classId }: ClassDetailTabsProps) {
  const { myUser } = useAuth();
  const canViewStudents =
    myUser?.role === UserRole.ADMIN || myUser?.role === UserRole.TEACHER;

  const [activeTab, setActiveTab] = useQueryState(
    "tab",
    parseAsStringEnum(Object.values(TabType)).withDefault(
      canViewStudents ? TabType.STUDENTS : TabType.COURSES,
    ),
  );

  React.useEffect(() => {
    if (!canViewStudents && activeTab === TabType.STUDENTS) {
      void setActiveTab(TabType.COURSES);
    }
  }, [activeTab, canViewStudents, setActiveTab]);

  const resolvedTab =
    !canViewStudents && activeTab === TabType.STUDENTS
      ? TabType.COURSES
      : activeTab;

  return (
    <Card>
      <CardHeader>
        <div className="flex w-fit items-center rounded-lg border border-zinc-200/50 bg-zinc-100/60 p-1 dark:border-zinc-800/50 dark:bg-zinc-900/60">
          {canViewStudents ? (
            <TabButton
              active={resolvedTab === TabType.STUDENTS}
              onClick={() => setActiveTab(TabType.STUDENTS)}
              icon={
                <IconUser
                  size={16}
                  stroke={resolvedTab === TabType.STUDENTS ? 2.5 : 2}
                />
              }
              label="Học viên"
              count={42}
            />
          ) : null}

          <TabButton
            active={resolvedTab === TabType.COURSES}
            onClick={() => setActiveTab(TabType.COURSES)}
            icon={
              <IconBook
                size={16}
                stroke={resolvedTab === TabType.COURSES ? 2.5 : 2}
              />
            }
            label="Chương trình"
          />
        </div>
      </CardHeader>

      <CardContent>
        <div className="animate-in slide-in-from-bottom-2 fade-in duration-500">
          {resolvedTab === TabType.STUDENTS ? (
            <ClassStudentsTable classId={classId} />
          ) : (
            <ClassDetailCourses classId={classId} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count?: number;
}

function TabButton({ active, onClick, icon, label, count }: TabButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "relative z-10 flex h-10 items-center gap-2 rounded-md px-6 text-sm font-bold transition-all duration-300",
        active
          ? "text-primary-foreground shadow-sm shadow-primary/20 hover:text-primary-foreground"
          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100",
      )}
    >
      {active ? (
        <div className="animate-in zoom-in-95 fade-in absolute inset-0 -z-10 rounded-md bg-primary duration-200" />
      ) : null}
      {icon}
      <span>{label}</span>
      {count !== undefined ? (
        <Badge
          className={cn(
            "ml-1.5 h-4.5 border-none px-1.5 text-[9px] font-black transition-colors duration-300",
            active
              ? "bg-white/20 text-white hover:bg-white/20"
              : "bg-zinc-200 text-zinc-500 dark:bg-zinc-800",
          )}
        >
          {count}
        </Badge>
      ) : null}
    </Button>
  );
}
