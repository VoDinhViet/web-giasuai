import { revalidatePath } from "next/cache"

export function revalidateCoursePaths(courseId: string, lessonId?: string) {
  revalidatePath("/manage/courses")
  revalidatePath(`/manage/courses/${courseId}`)
  revalidatePath(`/manage/courses/${courseId}/assignments`)

  if (lessonId) {
    revalidatePath(`/manage/lessons/${lessonId}/edit`)
  }
}
