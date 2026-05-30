"use client";

import React from "react";
import { IconBook, IconUser } from "@tabler/icons-react";
import { parseAsStringEnum, useQueryState } from "nuqs";

import { useAuth } from "@/components/providers/auth-provider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const TAB_VALUES = Object.values(TabType);

export function ClassDetailTabs({ classId }: ClassDetailTabsProps) {
  const { myUser } = useAuth();
  const canViewStudents =
    myUser?.role === UserRole.ADMIN || myUser?.role === UserRole.TEACHER;

  const [activeTab, setActiveTab] = useQueryState(
    "tab",
    parseAsStringEnum(TAB_VALUES).withDefault(
      canViewStudents ? TabType.STUDENTS : TabType.COURSES,
    ),
  );

  const visibleTabs = [
    ...(canViewStudents
      ? [
          {
            value: TabType.STUDENTS,
            label: "Học viên",
            icon: IconUser,
          },
        ]
      : []),
    {
      value: TabType.COURSES,
      label: "Chương trình",
      icon: IconBook,
    },
  ];

  // URL có thể còn tab=students từ lần truy cập trước, nên ép về tab hợp lệ.
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
      <Tabs value={resolvedTab} onValueChange={(value) => setActiveTab(value)}>
        <CardHeader>
          <TabsList>
            {visibleTabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <TabsTrigger key={tab.value} value={tab.value}>
                  <Icon size={16} />
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </CardHeader>

        <CardContent>
          {canViewStudents ? (
            <TabsContent value={TabType.STUDENTS}>
              <ClassStudentsTable classId={classId} />
            </TabsContent>
          ) : null}

          <TabsContent value={TabType.COURSES}>
            <ClassDetailCourses classId={classId} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
