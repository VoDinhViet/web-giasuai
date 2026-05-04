import { getCourseByIdAction } from "@/features/courses/actions/course.actions";
import { CourseGeneralInfoForm } from "@/features/courses/components/create/CourseGeneralInfoForm";
import { notFound } from "next/navigation";

interface EditCoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { courseId } = await params;
  const result = await getCourseByIdAction(courseId);

  if (!result.success || !result.data) {
    return notFound();
  }

  const course = result.data;

  return (
    <CourseGeneralInfoForm 
      courseId={courseId}
    />
  );
}
