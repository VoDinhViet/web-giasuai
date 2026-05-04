import { CourseCurriculumSync } from "@/features/courses/components/create/CourseCurriculumSync";
import { getCourseCurriculumAction } from "@/features/courses/actions/course.actions";

export default async function CourseCurriculumPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const result = await getCourseCurriculumAction(courseId);

  return (
    <div className="h-screen overflow-hidden">
      <CourseCurriculumSync
        courseId={courseId}
        initialData={result}
      />
    </div>
  );
}
