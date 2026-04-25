import { z } from "zod";

export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập email hoặc tên đăng nhập" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
