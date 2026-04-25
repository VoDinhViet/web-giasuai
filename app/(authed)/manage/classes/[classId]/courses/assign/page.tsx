import { courseAssignSearchParamsCache } from "@/features/classes/params/course-assign-params";
import { ClassAssignCoursePage } from "@/features/classes/components/details/ClassAssignCoursePage";
import { getCourses } from "@/features/classes/actions/get-courses";
import { getClassCourseIds } from "@/features/classes/actions/get-class-course-ids";

export default async function AssignCourseToClassPage({
  params,
  searchParams,
}: PageProps<"/manage/classes/[classId]/courses/assign">) {
  const [{ classId }, { q, page, limit }] = await Promise.all([
    params,
    searchParams.then(courseAssignSearchParamsCache.parse),
  ]);

  const [coursesData, assignedCourseIds] = await Promise.all([
    getCourses({ limit, page, q }),
    getClassCourseIds(classId),
  ]);

  return (
    <ClassAssignCoursePage
      classId={classId}
      coursesData={coursesData}
      assignedCourseIds={assignedCourseIds}
    />
  );
}
