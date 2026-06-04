"use client"

import useSWR from "swr"

import { getRoles } from "../actions/get-roles"
import type { Role } from "@/features/users/types"

const ROLES_SWR_KEY = "roles"

export function useRoles(initialRoles: Role[] = []) {
  return useSWR<Role[]>(ROLES_SWR_KEY, getRoles, {
    fallbackData: initialRoles,
    revalidateOnFocus: false,
  })
}
