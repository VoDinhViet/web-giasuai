import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { CourseCreateForm } from "@/features/courses/components/create/CourseCreateForm";
import { requirePermission } from "@/lib/guards";

export default async function CreateCoursePage() {
  await requirePermission("courses.create");

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-20">
      <PageHeader
        title="Tạo khóa học"
        description="Tạo bản ghi khóa học trong kho nội dung trước khi bổ sung đề cương và bài học."
        actions={
          <Button asChild variant="outline">
            <Link href="/manage/courses">
              <IconArrowLeft className="mr-2 h-4 w-4" />
              Danh sách
            </Link>
          </Button>
        }
      />

      <CourseCreateForm />
    </div>
  );
}
