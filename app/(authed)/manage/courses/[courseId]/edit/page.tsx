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

  // Map API response to Form Values
  const initialData = {
    title: course.title,
    description: course.description,
    levelId: course.levelId,
    gradeId: course.gradeId,
    majorId: course.majorId,
    subjectId: course.subjectId,
    learningOutcomes: course.learningOutcomes || [],
    thumbnail: course.thumbnailUrl || null,
  };

  return (
    <CourseGeneralInfoForm 
      courseId={courseId}
      initialData={initialData}
    />
  );
}
