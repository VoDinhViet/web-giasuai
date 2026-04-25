import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { env } from "./env";
import type { AppPermission, UserRole } from "@/types/user";

export interface SessionData {
  userId?: string;
  role?: UserRole;
  permissions?: AppPermission[];
  accessToken?: string;
  refreshToken?: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: env.SESSION_COOKIE_PASSWORD,
  cookieName: "giasuai-session",
  cookieOptions: {
    secure: env.NODE_ENV === "production",
    httpOnly: true,
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  if (session.isLoggedIn === undefined) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  if (session.isLoggedIn) {
    console.log(`🔑 [Session] User Role: ${session.role}`);
  }

  return session;
}
