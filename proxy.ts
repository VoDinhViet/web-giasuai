import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "giasuai-session";
const AUTH_PAGES = new Set(["/login", "/register"]);
const DEFAULT_AUTHENTICATED_REDIRECT = "/manage/users";

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname, search } = nextUrl;
  const isLoggedIn = request.cookies.has(SESSION_COOKIE_NAME);
  const isHomePage = pathname === "/";
  const isAuthPage = AUTH_PAGES.has(pathname);
  const isProtectedPage = pathname.startsWith("/manage");

  if (isHomePage) {
    return NextResponse.redirect(
      new URL(isLoggedIn ? DEFAULT_AUTHENTICATED_REDIRECT : "/login", request.url)
    );
  }

  if (!isLoggedIn && isProtectedPage) {
    const loginUrl = new URL("/login", request.url);
    const redirectTo = `${pathname}${search}`;

    loginUrl.searchParams.set("redirectTo", redirectTo);

    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(
      new URL(DEFAULT_AUTHENTICATED_REDIRECT, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/manage/:path*", "/login", "/register"],
};
