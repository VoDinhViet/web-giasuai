"use server";

import { api } from "@/lib/api";
import { CreateCourseFormValues } from "../schemas/create-course.schema";
import { ActionResponse } from "@/types/api";

/**
 * Fetch school levels
 */
export async function getSchoolLevelsAction() {
  return await api("/api/v1/academic-catalog/school-levels", {
    method: "GET",
  });
}

/**
 * Fetch grades filtered by school level
 */
export async function getGradesAction(levelId?: string) {
  return await api("/api/v1/academic-catalog/grades", {
    method: "GET",
    query: { levelId },
  });
}

/**
 * Fetch majors filtered by school level
 */
export async function getMajorsAction(levelId?: string) {
  return await api("/api/v1/academic-catalog/majors", {
    method: "GET",
    query: { levelId },
  });
}

/**
 * Fetch subjects based on school level, grade, or major
 */
export async function getSubjectsAction(params: {
  levelId?: string;
  gradeId?: string;
  majorId?: string;
  q?: string;
}) {
  return await api("/api/v1/academic-catalog/subjects", {
    method: "GET",
    query: params,
  });
}

/**
 * Submit the course creation form
 */
export async function createCourseAction(data: FormData): Promise<
  ActionResponse<{
    courseId: string;
  }>
> {
  try {
    const result = await api<{
      id: string;
    }>("/api/v1/courses", {
      method: "POST",
      body: data,
    });

    const courseId = result.id;
    console.log("Course ID: ", courseId);

    return {
      success: true,
      data: { courseId },
      message: "Khóa học đã được tạo thành công!",
    };
  } catch (error) {
    console.error("Server Action Error [createCourseAction]:", error);
    return {
      success: false,
      message: "Đã có lỗi xảy ra khi tạo khóa học.",
    };
  }
}

/**
 * Update an existing course
 */
export async function updateCourseAction(
  courseId: string,
  data: FormData,
): Promise<ActionResponse> {
  try {
    await api(`/api/v1/courses/${courseId}`, {
      method: "PATCH",
      body: data,
    });

    return {
      success: true,
      message: "Khóa học đã được cập nhật thành công!",
    };
  } catch (error) {
    console.error("Server Action Error [updateCourseAction]:", error);
    return {
      success: false,
      message: "Đã có lỗi xảy ra khi cập nhật khóa học.",
    };
  }
}

/**
 * Update course curriculum (sections, lessons, files)
 */
export async function updateCourseCurriculumAction(
  courseId: string,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    await api(`/api/v1/courses/${courseId}/curriculum`, {
      method: "PUT",
      body: formData,
    });

    return {
      success: true,
      message: "Đề cương khóa học đã được cập nhật thành công!",
    };
  } catch (error) {
    console.error("Server Action Error [updateCourseCurriculumAction]:", error);
    return {
      success: false,
      message: "Đã có lỗi xảy ra khi cập nhật đề cương.",
    };
  }
}

/**
 * Fetch a course by ID
 */
export async function getCourseByIdAction(courseId: string) {
  try {
    const result = await api<any>(`/api/v1/courses/${courseId}`, {
      method: "GET",
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Server Action Error [getCourseByIdAction]:", error);
    return {
      success: false,
      message: "Không thể lấy thông tin khóa học.",
    };
  }
}

/**
 * Delete a course
 */
export async function deleteCourseAction(
  courseId: string,
): Promise<ActionResponse> {
  try {
    await api(`/api/v1/courses/${courseId}`, {
      method: "DELETE",
    });

    return {
      success: true,
      message: "Khóa học đã được xóa thành công!",
    };
  } catch (error: any) {
    console.error("Server Action Error [deleteCourseAction]:", error);
    return {
      success: false,
      message: "Đã có lỗi xảy ra khi xóa khóa học.",
    };
  }
}

/**
 * Sync course curriculum (monolithic sync)
 */
export async function syncCourseCurriculumAction(
  courseId: string,
  data: FormData,
): Promise<ActionResponse> {
  console.log("Data: ", data);
  try {
    await api(`/api/v1/courses/${courseId}/curriculum`, {
      method: "PUT",
      body: data,
    });

    return {
      success: true,
      message: "Đề cương khóa học đã được cập nhật thành công!",
    };
  } catch (error) {
    console.error("Server Action Error [syncCourseCurriculumAction]:", error);
    return {
      success: false,
      message: "Đã có lỗi xảy ra khi cập nhật đề cương.",
    };
  }
}
/**
 * Fetch course curriculum by course ID
 */
export async function getCourseCurriculumAction(courseId: string) {
  const result = await api<any>(`/api/v1/courses/${courseId}/curriculum`, {
    method: "GET",
  });
  console.log("Result: ", JSON.stringify(result));
  return result;
}
