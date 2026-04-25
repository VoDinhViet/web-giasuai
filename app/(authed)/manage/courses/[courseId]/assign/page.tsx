import { getClasses } from "@/features/classes/actions/get-classes";
import { getCourseDetail } from "@/features/courses/actions/get-course-detail";
import { CourseAssignToClassPage } from "@/features/courses/components/CourseAssignToClassPage";

interface CourseAssignPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseAssignPage({
  params,
}: CourseAssignPageProps) {
  const { courseId } = await params;

  const [course, classes] = await Promise.all([
    getCourseDetail(courseId),
    getClasses({ limit: 100, page: 1 }),
  ]);

  return <CourseAssignToClassPage course={course} classes={classes.data} />;
}
