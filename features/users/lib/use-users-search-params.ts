"use client"

import { useQueryStates } from "nuqs"

import type { StatusFilter } from "../types"
import { usersSearchParams } from "./search-params"

export function useUsersSearchParams() {
  const [params, setParams] = useQueryStates(usersSearchParams)
  const {
    search: searchKeyword,
    position: positionFilter,
    status,
    page: currentPage,
  } = params
  const statusFilter: StatusFilter =
    status === "active" || status === "locked" ? status : "all"

  function setSearchKeyword(nextSearchKeyword: string) {
    setParams({
      search: nextSearchKeyword || null,
      page: 1,
    })
  }

  function setPositionFilter(nextPositionFilter: string) {
    setParams({
      position: nextPositionFilter === "all" ? null : nextPositionFilter,
      page: 1,
    })
  }

  function setStatusFilter(nextStatusFilter: StatusFilter) {
    setParams({
      status: nextStatusFilter === "all" ? null : nextStatusFilter,
      page: 1,
    })
  }

  function setCurrentPage(page: number) {
    setParams({ page })
  }

  return {
    searchKeyword,
    positionFilter,
    statusFilter,
    currentPage,
    setSearchKeyword,
    setPositionFilter,
    setStatusFilter,
    setCurrentPage,
  }
}
