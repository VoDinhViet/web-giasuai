import type { Route } from "next"
import { redirect } from "next/navigation"

export default function CourseImportRoute() {
  redirect("/manage/courses/create" as Route)
}
