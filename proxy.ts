import { getIronSession } from "iron-session"
import { NextResponse, type NextRequest } from "next/server"

import { refreshSessionAccessToken } from "@/lib/auth-token"
import { SESSION_COOKIE, sessionOptions, type SessionData } from "@/lib/session"

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions
  )

  try {
    const isSessionValid = await refreshSessionAccessToken(session)

    if (!isSessionValid) {
      request.cookies.delete(SESSION_COOKIE)
      return response
    }

    // Keep this request in sync with the renewed session cookie.
    const sessionCookie = response.cookies.get(SESSION_COOKIE)

    if (sessionCookie) {
      request.cookies.set(SESSION_COOKIE, sessionCookie.value)
    }
  } catch (error) {
    console.error("Refresh token error:", error)
    session.destroy()
    request.cookies.delete(SESSION_COOKIE)
  }

  return response
}

export const config = {
  matcher: ["/manage/:path*"],
}
