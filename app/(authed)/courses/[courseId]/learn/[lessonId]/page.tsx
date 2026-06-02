import { getCourseLessonParts } from "@/features/courses/actions/get-course-lesson-parts";
import { getCourseSections } from "@/features/courses/actions/get-course-sections";
import { LearnPage } from "@/features/courses/components/learn/LearnPage";

interface LessonLearnPageProps {
  params: Promise<{ courseId: string; lessonId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const DEFAULT_PARTS_PAGE = 1;
const DEFAULT_PARTS_LIMIT = 2;

function getPositiveNumber(
  value: string | string[] | undefined,
  fallback: number,
) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const numberValue = Number(rawValue);

  return Number.isInteger(numberValue) && numberValue > 0
    ? numberValue
    : fallback;
}

export default async function LearnRoute({
  params,
  searchParams,
}: LessonLearnPageProps) {
  const { courseId, lessonId } = await params;
  const query = await searchParams;
  const partsPage = getPositiveNumber(query.partsPage, DEFAULT_PARTS_PAGE);
  const partsLimit = getPositiveNumber(query.partsLimit, DEFAULT_PARTS_LIMIT);
  const [courseSections, lessonParts] = await Promise.all([
    getCourseSections(courseId),
    getCourseLessonParts(courseId, lessonId, {
      page: partsPage,
      limit: partsLimit,
    }),
  ]);

  return (
    <LearnPage
      courseId={courseId}
      lessonId={lessonId}
      courseSections={courseSections}
      lessonParts={lessonParts}
    />
  );
}
