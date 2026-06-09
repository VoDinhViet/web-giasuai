"use server"

import { api } from "@/lib/api"

export async function updateLessonTheories(lessonId: string, files: File[]) {
  const formData = new FormData()

  files.forEach((file) => {
    formData.append("files", file)
  })

  return api(`/api/v1/lessons/${lessonId}/theories`, {
    method: "PUT",
    body: formData,
  })
}
