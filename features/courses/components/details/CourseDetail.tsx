"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useQueryState, parseAsStringEnum } from "nuqs";
import {
  IconClock,
  IconUsers,
  IconStar,
  IconChevronRight,
  IconShare,
  IconDots,
  IconHome,
  IconFileText,
  IconBook2,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { CourseOverview } from "./CourseOverview";
import { CourseCurriculum } from "./CourseCurriculum";
import { CourseInstructor } from "./CourseInstructor";
import { CourseActionCard } from "./CourseActionCard";

import type { Course } from "@/features/classes/types/course.type";
import type { CourseOutline } from "@/features/courses/actions/get-course-outline";

interface CourseDetailProps {
  course: Course;
  courseOutline?: CourseOutline | null;
}


enum CourseTab {
  OVERVIEW = "overview",
  CURRICULUM = "curriculum",
  INSTRUCTOR = "instructor",
}

const COURSE_TABS = [
  {
    id: CourseTab.OVERVIEW,
    label: "Tổng quan",
    icon: IconFileText,
  },
  {
    id: CourseTab.CURRICULUM,
    label: "Chương trình",
    icon: IconBook2,
  },
  {
    id: CourseTab.INSTRUCTOR,
    label: "Người biên soạn",
    icon: IconUsers,
  },
];

export function CourseDetail({ course, courseOutline }: CourseDetailProps) {
  const [activeTab, setActiveTab] = useQueryState(
    "tab",
    parseAsStringEnum<CourseTab>(Object.values(CourseTab)).withDefault(
      CourseTab.OVERVIEW,
    ),
  );

  const firstLessonId = courseOutline?.sections
    .flatMap((section) => section.lessons)
    .find((lesson) => !lesson.isLocked)?.id;

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/manage" className="text-muted-foreground hover:text-foreground transition-colors">
                  <IconHome size={15} stroke={2} />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <IconChevronRight size={12} className="text-muted-foreground/60" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/manage/courses" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Thư viện khóa học</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <IconChevronRight size={12} className="text-muted-foreground/60" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-[320px] truncate font-medium text-foreground">
                {course.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-lg shadow-xs border-border/80 hover:bg-muted/50 transition-colors">
            <IconShare size={15} className="text-muted-foreground mr-1.5" />
            <span className="hidden sm:inline font-medium text-foreground/95 text-xs">Chia sẻ</span>
          </Button>
          <Button variant="outline" size="icon" className="size-8 rounded-lg shadow-xs border-border/80 hover:bg-muted/50 transition-colors">
            <IconDots size={15} className="text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="space-y-6">
          {/* Hero Section Card */}
          <Card>
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-md font-semibold text-[10px] tracking-wide px-2 py-0.5 bg-muted text-muted-foreground border-none">
                    Học liệu AI
                  </Badge>
                  <Badge
                    variant={course.isPublished ? "success" : "secondary"}
                    className="rounded-md font-semibold text-[10px] tracking-wide px-2 py-0.5"
                  >
                    {course.isPublished ? "Đã xuất bản" : "Bản nháp"}
                  </Badge>
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold text-primary bg-primary/5 border border-primary/10 rounded-full px-2.5 py-0.5 hover:bg-primary/10 transition-colors cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <h1 className="max-w-4xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl leading-tight">
                    {course.title}
                  </h1>
                  <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    {course.description ||
                      "Khóa học chuyên sâu giúp bạn làm chủ các kỹ năng cần thiết một cách bài bản và thực tế nhất."}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 pt-1">
                  <CourseMetaItem
                    icon={<IconStar size={16} fill="currentColor" className="text-amber-500" />}
                    label="Đánh giá"
                    value="4.8 / 5.0"
                  />
                  <CourseMetaItem
                    icon={<IconUsers size={16} />}
                    label="Học viên"
                    value="1,240"
                  />
                  <CourseMetaItem
                    icon={<IconClock size={16} />}
                    label="Lộ trình học"
                    value="Tự do"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section Card */}
          <Card>
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as CourseTab)}
              className="w-full"
            >
              <CardHeader className="border-b border-border bg-muted/10 p-3 sm:p-4">
                <TabsList>
                  {COURSE_TABS.map((tab) => {
                    const Icon = tab.icon;

                    return (
                      <TabsTrigger 
                        key={tab.id} 
                        value={tab.id}
                      >
                        <Icon size={14} />
                        {tab.label}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </CardHeader>

              <CardContent className="p-6">
                <TabsContent value={CourseTab.OVERVIEW} className="mt-0 outline-none">
                  <CourseOverview course={course} />
                </TabsContent>
                <TabsContent value={CourseTab.CURRICULUM} className="mt-0 outline-none">
                  <CourseCurriculum sections={courseOutline?.sections || []} />
                </TabsContent>
                <TabsContent value={CourseTab.INSTRUCTOR} className="mt-0 outline-none">
                  <CourseInstructor />
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <CourseActionCard
            course={course}
            totalLessons={courseOutline?.totalLessons}
            firstLessonId={firstLessonId}
          />
        </aside>
      </div>
    </div>
  );
}

interface CourseMetaItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function CourseMetaItem({ icon, label, value }: CourseMetaItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/80 bg-muted/20 px-3.5 py-3">
      <div className="flex size-8 items-center justify-center rounded-md bg-card text-muted-foreground border border-border/50 shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-foreground text-sm tracking-tight leading-none">{value}</p>
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mt-1">
          {label}
        </p>
      </div>
    </div>
  );
}
