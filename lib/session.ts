import { cookies } from "next/headers";
import { getIronSession, type IronSession, type SessionOptions } from "iron-session";

import { env } from "@/env";
import type { Permission, UserRole } from "@/types/user";

const SESSION_COOKIE = "app_session";

export interface SessionData {
  userId?: string;
  role?: UserRole;
  permissions?: Permission[];
  accessToken?: string;
  refreshToken?: string;
  isLoggedIn?: boolean;
}

export type AppSession = IronSession<SessionData>;

const sessionOptions: SessionOptions = {
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
