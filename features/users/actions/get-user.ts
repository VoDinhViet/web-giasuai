"use server";

import { api } from "@/lib/api";
import type { User } from "@/types/user";

export async function getUser(userId: string): Promise<User | null> {
  try {
    return await api<User>(`/api/v1/users/${userId}`);
  } catch {
    return null;
  }
}
