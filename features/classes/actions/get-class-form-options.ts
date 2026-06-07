"use server"

import { getCourses } from "@/features/courses/actions/get-courses"
import { getUsers } from "@/features/users/actions/get-users"
import { UserRole } from "@/features/users/types"
import type { ClassFormOption, CourseOptions } from "../types"

export async function getCourseOptions(): Promise<CourseOptions> {
  const coursesResponse = await getCourses({
    limit: 50,
    page: 1,
    q: "",
    status: "all",
    category: "all",
  })

  return {
    courseOptions: coursesResponse.data.map((course) => ({
      value: course.id,
      label: `${course.code} - ${course.name}`,
    })),
  }
}

export async function getInstructorOptions(): Promise<ClassFormOption[]> {
  const instructorsResponse = await getUsers({
    limit: 50,
    page: 1,
    q: "",
    role: UserRole.INSTRUCTOR,
    isLocked: "false",
  })

  return instructorsResponse.data.map((instructor) => ({
    value: instructor.id,
    label: instructor.fullName,
    description: instructor.email,
  }))
}
