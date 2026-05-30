"use client";

import * as React from "react";
import type { Route } from "next";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { CourseOutline } from "@/features/courses/actions/get-course-outline";
import { MOCK_CURRICULUM } from "@/features/courses/constants/learn-mock";
import {
  LessonStep,
  LESSON_STEP_LABELS,
  LESSON_STEP_ORDER,
} from "@/features/courses/types/learn";

import {
  LessonLearnSidebar,
  type LessonLearnSidebarChapter,
} from "./LessonLearnSidebar";
import { LessonHeader } from "./LessonHeader";
import { LessonPracticeStep } from "./LessonPracticeStep";
import { LessonQuizStep } from "./LessonQuizStep";
import { LessonStepIndicator } from "./LessonStepIndicator";
import { LessonTheoryStep } from "./LessonTheoryStep";

interface LessonLearnClientProps {
  courseId: string;
  lessonId: string;
  outline: CourseOutline | null;
}

export function LessonLearnClient({
  courseId,
  lessonId,
  outline,
}: LessonLearnClientProps) {
  const [currentStep, setCurrentStep] = React.useState<LessonStep>(
    LessonStep.THEORY,
  );
  const currentIndex = LESSON_STEP_ORDER.indexOf(currentStep);
  const totalSteps = LESSON_STEP_ORDER.length;

  const curriculum = React.useMemo(
    () => toNavigationCurriculum(outline),
    [outline],
  );

  const nextStep = () => {
    if (currentIndex < totalSteps - 1) {
      setCurrentStep(LESSON_STEP_ORDER[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    if (currentIndex > 0) {
      setCurrentStep(LESSON_STEP_ORDER[currentIndex - 1]);
    }
  };

  const steps = LESSON_STEP_ORDER.map((step) => LESSON_STEP_LABELS[step]);

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "21rem" } as React.CSSProperties}
    >
      <LessonLearnSidebar
        courseId={courseId}
        curriculum={curriculum}
        activeLessonId={lessonId}
        totalLessons={outline?.totalLessons ?? curriculum.reduce((acc, chapter) => acc + chapter.lessons.length, 0)}
        totalDurationText={outline?.totalDurationText}
      />

      <SidebarInset className="h-svh overflow-hidden bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <LessonHeader
          courseTitle={outline?.title ?? "Khóa học"}
          progress={Math.round(((currentIndex + 1) / totalSteps) * 100)}
          backUrl={`/courses/${courseId}` as Route}
        />

        <main className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-5xl px-5 py-10 pb-32 sm:px-8 lg:px-20 lg:py-16">
            <div className="mb-16 lg:mb-24">
              <LessonStepIndicator
                steps={steps}
                currentStep={currentIndex}
                onStepClick={(idx) => setCurrentStep(LESSON_STEP_ORDER[idx])}
              />
            </div>

            <div className="relative min-h-[600px]">
              {currentStep === LessonStep.THEORY ? (
                <LessonTheoryStep onNext={nextStep} />
              ) : null}
              {currentStep === LessonStep.PRACTICE ? (
                <LessonPracticeStep onNext={nextStep} onBack={prevStep} />
              ) : null}
              {currentStep === LessonStep.QUIZ ? (
                <LessonQuizStep onBack={prevStep} />
              ) : null}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function toNavigationCurriculum(
  outline: CourseOutline | null,
): LessonLearnSidebarChapter[] {
  if (!outline?.sections?.length) {
    return MOCK_CURRICULUM.map((chapter, index) => ({
      id: `mock-section-${index + 1}`,
      title: chapter.title,
      totalLessons: chapter.lessons.length,
      totalDurationText: "",
      lessons: chapter.lessons.map((lesson, lessonIndex) => ({
        id: lesson.id,
        title: lesson.title,
        durationText: lesson.duration,
        position: lessonIndex + 1,
        isCompleted: lesson.isCompleted,
        isLocked: lesson.isLocked,
      })),
    }));
  }

  return outline.sections.map((section) => ({
    id: section.id,
    title: section.title,
    totalLessons: section.totalLessons,
    totalDurationText: section.totalDurationText,
    lessons: section.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      durationText: lesson.durationText,
      position: lesson.position,
      isCompleted: lesson.isCompleted,
      isLocked: lesson.isLocked,
    })),
  }));
}
