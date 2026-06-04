import { revalidatePath } from "next/cache"

export function revalidateCoursePaths(courseCode: string, lessonCode?: string) {
  revalidatePath("/manage/courses")
  revalidatePath(`/manage/courses/${courseCode}/lessons`)
  revalidatePath(`/manage/courses/${courseCode}/assignments`)

  if (lessonCode) {
    revalidatePath(`/manage/courses/${courseCode}/lessons/${lessonCode}`)
  }
}
