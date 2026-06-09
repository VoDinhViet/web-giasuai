import { z } from "zod"

export const lessonTypeSchema = z.enum([
  "VIDEO",
  "READING",
  "EXERCISE",
  "WORKSHOP",
  "QUIZ",
  "RESOURCE",
])

export const lessonStatusSchema = z.enum(["PUBLISHED", "DRAFT", "LOCKED"])
