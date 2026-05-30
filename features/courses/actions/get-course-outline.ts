"use server";

import { api } from "@/lib/api";

export interface LessonOutline {
  id: string;
  title: string;
  durationMinutes: number;
  durationText: string;
  position: number;
  isPreview: boolean;
  isPublished: boolean;
  isCurrent: boolean;
  isCompleted: boolean;
  isLocked: boolean;
}

export interface SectionOutline {
  id: string;
  title: string;
  position: number;
  totalLessons: number;
  totalDurationMinutes: number;
  totalDurationText: string;
  lessons: LessonOutline[];
}

export interface CourseOutline {
  courseId: string;
  title: string;
  totalSections: number;
  totalLessons: number;
  totalDurationMinutes: number;
  totalDurationText: string;
  sections: SectionOutline[];
}

interface CourseSectionResponse {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  position: number;
  lessons: CourseLessonResponse[];
  createdAt: string;
  updatedAt: string;
}

interface CourseLessonResponse {
  id: string;
  sectionId: string;
  title: string;
  durationMinutes: number;
  position: number;
  isPreview: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getCourseOutline(courseId: string): Promise<CourseOutline | null> {
  try {
    const sections = await api<CourseSectionResponse[]>(`/api/v1/courses/${courseId}/sections`, {
      method: "GET",
    });

    return toCourseOutline(courseId, sections);
  } catch (error) {
    console.error("Error fetching course outline:", error);
    return null;
  }
}

function toCourseOutline(
  courseId: string,
  sections: CourseSectionResponse[],
): CourseOutline {
  const normalizedSections = sections
    .toSorted((a, b) => a.position - b.position)
    .map<SectionOutline>((section) => {
      const lessons = section.lessons
        .toSorted((a, b) => a.position - b.position)
        .map<LessonOutline>((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          durationMinutes: lesson.durationMinutes,
          durationText: formatDuration(lesson.durationMinutes),
          position: lesson.position,
          isPreview: lesson.isPreview,
          isPublished: lesson.isPublished,
          isCurrent: false,
          isCompleted: false,
          isLocked: false,
        }));
      const totalDurationMinutes = lessons.reduce(
        (total, lesson) => total + lesson.durationMinutes,
        0,
      );

      return {
        id: section.id,
        title: section.title,
        position: section.position,
        totalLessons: lessons.length,
        totalDurationMinutes,
        totalDurationText: formatDuration(totalDurationMinutes),
        lessons,
      };
    });

  const totalLessons = normalizedSections.reduce(
    (total, section) => total + section.totalLessons,
    0,
  );
  const totalDurationMinutes = normalizedSections.reduce(
    (total, section) => total + section.totalDurationMinutes,
    0,
  );

  return {
    courseId,
    title: "Khóa học",
    totalSections: normalizedSections.length,
    totalLessons,
    totalDurationMinutes,
    totalDurationText: formatDuration(totalDurationMinutes),
    sections: normalizedSections,
  };
}

function formatDuration(totalMinutes: number): string {
  if (totalMinutes <= 0) {
    return "";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} phút`;
  }

  if (minutes === 0) {
    return `${hours} giờ`;
  }

  return `${hours} giờ ${minutes} phút`;
}
