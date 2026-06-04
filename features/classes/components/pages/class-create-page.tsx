"use client"

import { useRouter } from "next/navigation"

import type { ClassFormOption } from "../../types"
import { CreateClassForm } from "../forms/create-class-form"

type ClassCreatePageProps = {
  courseOptions: ClassFormOption[]
  teacherOptions: ClassFormOption[]
}

export function ClassCreatePage({
  courseOptions,
  teacherOptions,
}: ClassCreatePageProps) {
  const router = useRouter()

  return (
    <CreateClassForm
      courseOptions={courseOptions}
      teacherOptions={teacherOptions}
      onCancel={() => router.push("/manage/classes")}
      onSuccess={() => {
        router.push("/manage/classes")
        router.refresh()
      }}
    />
  )
}
