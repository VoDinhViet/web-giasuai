import { z } from "zod"

export const courseStatusSchema = z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"])

export const courseLevelSchema = z.enum([
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
  "ALL_LEVELS",
])
