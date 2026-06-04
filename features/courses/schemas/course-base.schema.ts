import { z } from "zod"

export const courseStatusSchema = z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"])

export const courseLevelSchema = z.enum([
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
  "ALL_LEVELS",
])

export const courseLessonTypeSchema = z.enum([
  "VIDEO",
  "READING",
  "EXERCISE",
  "WORKSHOP",
  "QUIZ",
  "RESOURCE",
])

export const courseLessonStatusSchema = z.enum(["PUBLISHED", "DRAFT", "LOCKED"])
