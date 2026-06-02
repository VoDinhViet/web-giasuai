"use client";

import * as React from "react";
import type { Route } from "next";

import { SidebarInset } from "@/components/ui/sidebar";
import type { CourseSectionWithLessons } from "@/features/courses/types/course-section.type";
import type { LessonPart } from "@/features/courses/types/lesson-part.type";
import {
  LessonStep,
  LESSON_STEP_LABELS,
  LESSON_STEP_ORDER,
} from "@/features/courses/types/learn";
import type { PaginatedResponse } from "@/types/api";

import { CourseSectionsSidebar } from "./CourseSectionsSidebar";
import { LessonHeader } from "./LessonHeader";
import { LessonPracticeStep } from "./LessonPracticeStep";
import { LessonQuizStep } from "./LessonQuizStep";
import { LessonStepIndicator } from "./LessonStepIndicator";
import { LessonTheoryStep } from "./LessonTheoryStep";

interface LearnPageProps {
  courseId: string;
  lessonId: string;
  courseSections: CourseSectionWithLessons[] | null;
  lessonParts: PaginatedResponse<LessonPart>;
}

export function LearnPage({
  courseId,
  lessonId,
  courseSections,
  lessonParts,
}: LearnPageProps) {
  const [currentStep, setCurrentStep] = React.useState<LessonStep>(
    LessonStep.THEORY,
  );
  const currentIndex = LESSON_STEP_ORDER.indexOf(currentStep);
  const totalSteps = LESSON_STEP_ORDER.length;

  const sections = React.useMemo(() => courseSections ?? [], [courseSections]);

  const totalLessons = React.useMemo(() => {
    return sections.reduce((acc, sec) => acc + sec.lessons.length, 0);
  }, [sections]);


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
    <>
      <CourseSectionsSidebar
        courseId={courseId}
        courseSections={sections}
        totalLessons={totalLessons}
      />

      <SidebarInset className="h-svh overflow-hidden bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <LessonHeader
          courseTitle="Khóa học"
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
                <LessonTheoryStep
                  key={`${lessonId}-${lessonParts.pagination.currentPage}`}
                  courseId={courseId}
                  lessonId={lessonId}
                  lessonParts={lessonParts}
                  onNext={nextStep}
                />
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
    </>
  );
}
