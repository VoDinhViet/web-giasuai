"use server"

import { getCourses } from "@/features/courses/actions/get-courses"
import { getUsers } from "@/features/users/actions/get-users"
import { UserRole } from "@/features/users/types"
import type { ClassFormOptions } from "../types"

export async function getClassFormOptions(): Promise<ClassFormOptions> {
  const [coursesResponse, teachersResponse] = await Promise.all([
    getCourses({
      limit: 50,
      page: 1,
      q: "",
      status: "all",
      category: "all",
    }),
    getUsers({
      limit: 50,
      page: 1,
      q: "",
      role: UserRole.TEACHER,
      isLocked: "false",
    }),
  ])

  return {
    courseOptions: coursesResponse.data.map((course) => ({
      value: course.id,
      label: `${course.code} - ${course.name}`,
    })),
    teacherOptions: teachersResponse.data.map((teacher) => ({
      value: teacher.id,
      label: teacher.fullName,
    })),
  }
}
