// Proxy is temporarily disabled while UI screens are being designed.
// Restore the guarded implementation below when authentication flow is needed.

// import { getIronSession } from "iron-session"
// import { NextResponse, type NextRequest } from "next/server"

// import { sessionOptions, type SessionData } from "@/lib/session"

// const loginPath = "/login"
// const usersPath = "/users"

// export async function proxy(request: NextRequest) {
//   const response = NextResponse.next()
//   const session = await getIronSession<SessionData>(
//     request,
//     response,
//     sessionOptions
//   )
//   const isLoggedIn = session.isLoggedIn === true
//   const { pathname, search } = request.nextUrl

//   if (pathname === loginPath && isLoggedIn) {
//     return NextResponse.redirect(new URL(usersPath, request.url))
//   }

//   if (pathname !== loginPath && !isLoggedIn) {
//     const loginUrl = new URL(loginPath, request.url)
//     loginUrl.searchParams.set("redirectTo", `${pathname}${search}`)

//     return NextResponse.redirect(loginUrl)
//   }

//   return response
// }

export function proxy() {}

export const config = {
  matcher: [],
}
