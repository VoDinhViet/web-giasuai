import type { Permission } from "@/features/users/types"

export const routePermissions = {
  "/manage/users": ["users:read"],
  "/manage/students": ["users:read"],
  "/manage/courses/create": ["courses:write"],
  "/manage/classes/create": ["classes:write"],
} as const satisfies Record<string, readonly Permission[]>

export function getRoutePermissions(pathname: string) {
  const paths = Object.keys(routePermissions) as Array<
    keyof typeof routePermissions
  >
  const matchedPath = paths
    .sort((firstPath, secondPath) => secondPath.length - firstPath.length)
    .find((path) => pathname === path || pathname.startsWith(`${path}/`))

  return matchedPath ? routePermissions[matchedPath] : undefined
}
