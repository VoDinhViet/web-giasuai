"use server";

import { api } from "@/lib/api";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function logout() {
  try {
    // Call backend logout API to invalidate tokens/session if necessary
    await api("/api/v1/auth/logout", {
      method: "POST",
    });
  } catch (error) {
    // Even if backend fails, we should clear the local session
    console.error("Logout API error:", error);
  }

  const session = await getSession();
  session.destroy();
  
  redirect("/login");
}
