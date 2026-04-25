"use client";

import * as React from "react";
import { LessonHeader } from "@/features/courses/components/learn/LessonHeader";
import { LessonNavigation } from "@/features/courses/components/learn/LessonNavigation";
import { LessonStepIndicator } from "@/features/courses/components/learn/LessonStepIndicator";
import { LessonTheoryStep } from "@/features/courses/components/learn/LessonTheoryStep";
import { LessonPracticeStep } from "@/features/courses/components/learn/LessonPracticeStep";
import { LessonQuizStep } from "@/features/courses/components/learn/LessonQuizStep";
import { MOCK_CURRICULUM } from "@/features/courses/constants/learn-mock";

import {
  LessonStep,
  LESSON_STEP_LABELS,
  LESSON_STEP_ORDER,
} from "@/features/courses/types/learn";

export default function LessonLearnPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const resolvedParams = React.use(params);
  const { courseId, lessonId } = resolvedParams;

  const [currentStep, setCurrentStep] = React.useState<LessonStep>(
    LessonStep.THEORY,
  );
  const currentIndex = LESSON_STEP_ORDER.indexOf(currentStep);
  const totalSteps = LESSON_STEP_ORDER.length;

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

  const STEPS = LESSON_STEP_ORDER.map((step) => LESSON_STEP_LABELS[step]);


  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white text-zinc-900">
      <LessonHeader
        courseTitle="Next.js 15 Pro Max"
        progress={Math.round(((currentIndex + 1) / totalSteps) * 100)}
        backUrl={`/manage/courses/${courseId}`}
      />

      <div className="flex-1 flex overflow-hidden">
        <LessonNavigation
          curriculum={MOCK_CURRICULUM}
          activeLessonId={lessonId}
        />

        <main className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-5xl mx-auto px-8 lg:px-20 py-16 pb-40">
            {/* Step Navigation with ample breathing room */}
            <div className="mb-24">
              <LessonStepIndicator
                steps={STEPS}
                currentStep={currentIndex}
                onStepClick={(idx) => setCurrentStep(LESSON_STEP_ORDER[idx])}
              />
            </div>

            {/* Dynamic Content Sections */}
            <div className="relative min-h-[600px]">
              {(() => {
                switch (currentStep) {
                  case LessonStep.THEORY:
                    return <LessonTheoryStep onNext={nextStep} />;
                  case LessonStep.PRACTICE:
                    return <LessonPracticeStep onNext={nextStep} onBack={prevStep} />;
                  case LessonStep.QUIZ:
                    return <LessonQuizStep onBack={prevStep} />;
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
