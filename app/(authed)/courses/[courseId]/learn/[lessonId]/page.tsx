import { getCourseOutline } from "@/features/courses/actions/get-course-outline";
import { LessonLearnClient } from "@/features/courses/components/learn/LessonLearnClient";

interface LessonLearnPageProps {
  params: Promise<{ courseId: string; lessonId: string }>;
}

export default async function LessonLearnPage({ params }: LessonLearnPageProps) {
  const { courseId, lessonId } = await params;
  const outline = await getCourseOutline(courseId);

  return (
    <LessonLearnClient courseId={courseId} lessonId={lessonId} outline={outline} />
  );
}
