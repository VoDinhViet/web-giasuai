import { notFound } from "next/navigation";

import { getCourseDetail } from "@/features/courses/actions/get-course-detail";
import { getCourseOutline } from "@/features/courses/actions/get-course-outline";
import { CourseDetail } from "@/features/courses/components/details/CourseDetail";

interface CourseDetailPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { courseId } = await params;
  
  const [course, courseOutline] = await Promise.all([
    getCourse(courseId),
    getCourseOutline(courseId).catch(() => null),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <CourseDetail course={course} courseOutline={courseOutline} />
    </div>
  );
}

async function getCourse(courseId: string) {
  try {
    return await getCourseDetail(courseId);
  } catch {
    notFound();
  }
}
