export enum LessonStep {
  THEORY = "theory",
  PRACTICE = "practice",
  QUIZ = "quiz"
}

export const LESSON_STEP_ORDER: LessonStep[] = [
  LessonStep.THEORY,
  LessonStep.PRACTICE,
  LessonStep.QUIZ
];

export const LESSON_STEP_LABELS: Record<LessonStep, string> = {
  [LessonStep.THEORY]: "Kiến thức cốt lõi",
  [LessonStep.PRACTICE]: "Video & Thực hành",
  [LessonStep.QUIZ]: "Kiểm tra năng lực"
};
