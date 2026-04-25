"use client";

import * as React from "react";
import Link from "next/link";
import { useQueryState, parseAsStringEnum } from "nuqs";
import {
  IconClock,
  IconUsers,
  IconStar,
  IconArrowLeft,
  IconChevronRight,
  IconShare,
  IconDots,
  IconHome,
  IconFileText,
  IconBook2,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { CourseOverview } from "./details/CourseOverview";
import { CourseCurriculum } from "./details/CourseCurriculum";
import { CourseInstructor } from "./details/CourseInstructor";
import { CourseActionCard } from "./details/CourseActionCard";

import type { Course } from "@/features/classes/types/course.type";

interface CourseDetailProps {
  course: Course;
}

// Mock curriculum data for UI demonstration
const MOCK_CURRICULUM = [
  {
    title: "Chương 1: Giới thiệu & Tổng quan",
    lessons: [
      {
        title: "Chào mừng bạn đến với khóa học",
        duration: "05:20",
        type: "video",
        isFree: true,
      },
      {
        title: "Hướng dẫn cài đặt môi trường",
        duration: "12:45",
        type: "video",
        isFree: true,
      },
      {
        title: "Tổng quan về lộ trình học tập",
        duration: "08:15",
        type: "video",
        isFree: false,
      },
    ],
  },
  {
    title: "Chương 2: Kiến thức nền tảng",
    lessons: [
      {
        title: "Khái niệm cơ bản phần 1",
        duration: "15:30",
        type: "video",
        isFree: false,
      },
      {
        title: "Khái niệm cơ bản phần 2",
        duration: "18:20",
        type: "video",
        isFree: false,
      },
      {
        title: "Bài tập thực hành chương 2",
        duration: "10:00",
        type: "quiz",
        isFree: false,
      },
    ],
  },
  {
    title: "Chương 3: Thực hành chuyên sâu",
    lessons: [
      {
        title: "Xây dựng dự án đầu tiên",
        duration: "45:00",
        type: "video",
        isFree: false,
      },
      {
        title: "Tối ưu hóa mã nguồn",
        duration: "25:40",
        type: "video",
        isFree: false,
      },
      {
        title: "Tài liệu tham khảo nâng cao",
        duration: "5 trang",
        type: "reading",
        isFree: false,
      },
    ],
  },
];

enum CourseTab {
  OVERVIEW = "overview",
  CURRICULUM = "curriculum",
  INSTRUCTOR = "instructor",
}

export function CourseDetail({ course }: CourseDetailProps) {
  const [activeTab, setActiveTab] = useQueryState(
    "tab",
    parseAsStringEnum<CourseTab>(Object.values(CourseTab)).withDefault(
      CourseTab.OVERVIEW,
    ),
  );

  const TABS = [
    {
      id: CourseTab.OVERVIEW,
      label: "Tổng quan",
      icon: <IconFileText size={18} />,
    },
    {
      id: CourseTab.CURRICULUM,
      label: "Chương trình",
      icon: <IconBook2 size={18} />,
    },
    {
      id: CourseTab.INSTRUCTOR,
      label: "Giảng viên",
      icon: <IconUsers size={18} />,
    },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="md:hidden -ml-2 rounded-full h-8 w-8"
          >
            <Link href="/manage/courses">
              <IconArrowLeft size={18} />
            </Link>
          </Button>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className="flex items-center gap-1.5 hover:text-primary transition-colors text-xs font-medium"
                >
                  <Link href="/manage">
                    <IconHome size={14} stroke={2} />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-muted-foreground/30">
                <IconChevronRight size={12} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className="hover:text-primary transition-colors text-xs font-medium"
                >
                  <Link href="/manage/courses">Thư viện khóa học</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-muted-foreground/30">
                <IconChevronRight size={12} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs font-bold text-foreground max-w-[300px] truncate">
                  {course.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-xl gap-2 h-9">
            <IconShare size={16} />
            <span className="hidden sm:inline text-xs font-bold">Chia sẻ</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl h-9 w-9 p-0"
          >
            <IconDots size={16} />
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Course Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/15 border-none px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {course.level.replaceAll("_", " ")}
                </Badge>
                <Badge
                  variant="secondary"
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                >
                  Nổi bật
                </Badge>
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-muted-foreground font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {course.shortDescription ||
                  "Khóa học chuyên sâu giúp bạn làm chủ các kỹ năng cần thiết một cách bài bản và thực tế nhất."}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                  <IconStar size={18} fill="currentColor" />
                </div>
                <div>
                  <p className="font-bold">4.8 / 5.0</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    120 Đánh giá
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <IconUsers size={18} />
                </div>
                <div>
                  <p className="font-bold">1,240</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Học viên
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <IconClock size={18} />
                </div>
                <div>
                  <p className="font-bold">
                    {Math.floor(course.estimatedDurationMinutes / 60)} giờ học
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Thời lượng
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Horizontal Navigation */}
          <div className="space-y-10">
            <div className="sticky top-20 z-30 -mx-4 px-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
              <nav className="flex items-center gap-8 no-scrollbar overflow-x-auto">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "group relative py-5 text-sm font-bold transition-all duration-300 whitespace-nowrap",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            "size-5 transition-colors",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground",
                          )}
                        >
                          {tab.icon}
                        </div>
                        <span>{tab.label}</span>
                      </div>

                      {/* Premium Underline Indicator */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full animate-in fade-in slide-in-from-bottom-2 duration-300" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content Rendering */}
            <div className="min-h-[500px]">
              {(() => {
                switch (activeTab) {
                  case CourseTab.OVERVIEW:
                    return <CourseOverview course={course} />;
                  case CourseTab.CURRICULUM:
                    return <CourseCurriculum curriculum={MOCK_CURRICULUM} />;
                  case CourseTab.INSTRUCTOR:
                    return <CourseInstructor />;
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Actions */}
        <CourseActionCard course={course} />
      </div>
    </div>
  );
}
