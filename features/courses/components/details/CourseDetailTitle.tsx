"use client";

import Link from "next/link";
import {
  IconChevronRight,
  IconDots,
  IconHome,
  IconShare,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface CourseDetailTitleProps {
  title: string;
}

export function CourseDetailTitle({ title }: CourseDetailTitleProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/manage">
                <IconHome size={15} stroke={2} />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <IconChevronRight size={12} className="text-muted-foreground/60" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/manage/courses">Thư viện khóa học</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <IconChevronRight size={12} className="text-muted-foreground/60" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="max-w-[320px] truncate">
              {title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <IconShare size={15} />
          <span className="hidden sm:inline">Chia sẻ</span>
        </Button>
        <Button variant="outline" size="icon-sm">
          <IconDots size={15} />
        </Button>
      </div>
    </div>
  );
}
