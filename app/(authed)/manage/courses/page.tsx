import { getCourses } from "@/features/classes/actions/get-courses";
import { CoursesManagementPage } from "@/features/courses/components/CoursesManagementPage";
import { courseParamsCache } from "@/features/courses/params/course-params";
import { requireRole } from "@/lib/guards";
import { UserRole } from "@/types/user";

interface CoursesManagePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CoursesManagePage({
  searchParams,
}: CoursesManagePageProps) {
  await requireRole(UserRole.ADMIN);

  const params = courseParamsCache.parse(await searchParams);
  const result = await getCourses(params);

  return (
    <CoursesManagementPage
      courses={result.data}
      pagination={result.pagination}
    />
  );
}
