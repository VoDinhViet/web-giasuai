import { cookies } from "next/headers";
import { getIronSession, type IronSession, type SessionOptions } from "iron-session";

import { env } from "@/env";
import type { Permission } from "@/types/user";

export const SESSION_COOKIE = "app_session";

export interface SessionData {
  userId?: string;
  roleCode?: string;
  permissions?: Permission[];
  accessToken?: string;
  refreshToken?: string;
  tokenExpires?: number;
  isLoggedIn?: boolean;
}

export type AppSession = IronSession<SessionData>;

export const sessionOptions: SessionOptions = {
  cookieName: SESSION_COOKIE,
  password: env.IRON_SESSION_PASSWORD,
  cookieOptions: {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getSession(): Promise<AppSession> {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}
