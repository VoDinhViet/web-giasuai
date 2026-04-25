"use server";

import { api } from "@/lib/api";
import { PaginatedResponse } from "@/types/api";
import { User } from "@/types/user";
import { UsersSearch } from "../schemas/users-search-schema";

export async function getUsers(params?: Partial<UsersSearch>): Promise<PaginatedResponse<User>> {
  // Loại bỏ các trường rỗng hoặc undefined để tránh lỗi validation ở backend (vd: q: '')
  const cleanParams = params ? Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== "" && v !== null && v !== undefined && v !== "all")
  ) : {};

  const result = await api<PaginatedResponse<User>>("/api/v1/users", {
    method: "GET",
    query: cleanParams,
  });

  return result;
}
