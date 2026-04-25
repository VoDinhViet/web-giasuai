import { getCourseDetail } from "@/features/courses/actions/get-course-detail";
import { CourseDetail } from "@/features/courses/components/CourseDetail";

interface CourseDetailPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { courseId } = await params;
  const course = await getCourseDetail(courseId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <CourseDetail course={course} />
    </div>
  );
}
