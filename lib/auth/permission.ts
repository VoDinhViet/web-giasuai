import { permissionsByRole, WILDCARD_PERMISSION } from "@/config/permissions"
import { getRoutePermissions } from "@/config/route-permissions"
import type { Permission, User } from "@/features/users/types"

export type PermissionInput = Permission | readonly Permission[]

export function getPermissions(myUser: Pick<User, "permissions" | "role">) {
  if (myUser.permissions?.length) {
    return myUser.permissions
  }

  return permissionsByRole[myUser.role] ?? []
}

export function has(
  userPermissions: readonly Permission[],
  permission: Permission
) {
  return (
    userPermissions.includes(WILDCARD_PERMISSION) ||
    userPermissions.includes(permission)
  )
}

export function can(
  myUser: Pick<User, "permissions" | "role">,
  requirement?: PermissionInput
) {
  if (!requirement) {
    return true
  }

  const userPermissions = getPermissions(myUser)
  const requiredPermissions = Array.isArray(requirement)
    ? requirement
    : [requirement]

  return requiredPermissions.every((permission) =>
    has(userPermissions, permission)
  )
}

export function canAccess(
  myUser: Pick<User, "permissions" | "role">,
  pathname: string
) {
  const routePermission = getRoutePermissions(pathname)

  if (!routePermission) {
    return true
  }

  return can(myUser, routePermission)
}
