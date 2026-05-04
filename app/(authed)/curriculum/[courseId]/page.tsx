import { CourseCurriculumSync } from "@/features/courses/components/create/CourseCurriculumSync";
import { 
  getCourseByIdAction, 
  getCourseCurriculumAction 
} from "@/features/courses/actions/course.actions";
import { notFound } from "next/navigation";

export default async function ManageCurriculumPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  
  const [courseRes, curriculumRes] = await Promise.all([
    getCourseByIdAction(courseId),
    getCourseCurriculumAction(courseId)
  ]);

  if (!courseRes.success || !courseRes.data) {
    return notFound();
  }

  // Combine metadata and curriculum for the component
  const initialData = {
    ...courseRes.data,
    courseSections: curriculumRes.success ? curriculumRes.data : []
  };

  return (
    <div className="h-screen -m-6 overflow-hidden">
      <CourseCurriculumSync courseId={courseId} initialData={initialData} />
    </div>
  );
}
