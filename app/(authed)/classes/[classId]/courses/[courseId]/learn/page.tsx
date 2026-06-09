import { CourseLearningPage } from "@/features/course-learning/components/pages/course-learning-page"
import { getCourseCurriculumById } from "@/features/course-learning/actions/get-course-curriculum"

export default async function CourseLearningRoute({
  params,
}: PageProps<"/classes/[classId]/courses/[courseId]/learn">) {
  const { classId, courseId } = await params
  const curriculum = await getCourseCurriculumById(courseId)

  return <CourseLearningPage curriculum={curriculum} classId={classId} />
}
