import { z } from "zod";
import { UserRole } from "@/types/user";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, { message: "Họ và tên phải có ít nhất 2 ký tự" }),
    username: z
      .string()
      .trim()
      .min(3, { message: "Tên đăng nhập phải có ít nhất 3 ký tự" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message:
          "Tên đăng nhập chỉ bao gồm chữ cái, số và dấu gạch dưới",
      }),
    email: z
      .string()
      .trim()
      .email({ message: "Địa chỉ email không hợp lệ" }),
    password: z
      .string()
      .trim()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { message: "Vui lòng xác nhận lại mật khẩu" }),
    role: z
      .nativeEnum(UserRole, {
        message: "Vui lòng chọn vai trò của bạn",
      })
      .refine((val) => val === UserRole.TEACHER || val === UserRole.STUDENT, {
        message: "Vui lòng chọn vai trò hợp lệ",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
