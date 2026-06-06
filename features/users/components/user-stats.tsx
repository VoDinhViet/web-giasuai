import {
  IconLock,
  IconSparkles,
  IconUserCheck,
  IconUsersGroup,
} from "@tabler/icons-react"

import { formatNumber } from "@/lib/number.util"
import type { UserStats } from "../actions/get-user-stats"
import {
  UserStatCard,
  type UserStatCardProps,
} from "./user-stat-card"

type UserStatsProps = {
  stats: UserStats
}

export function UserStats({ stats }: UserStatsProps) {
  const userStats = [
    {
      label: "Tổng người dùng",
      value: formatNumber(stats.total),
      helper: "Toàn hệ thống",
      icon: IconUsersGroup,
      tone: "info",
    },
    {
      label: "Mới hôm nay",
      value: formatNumber(stats.new),
      helper: "Tài khoản vừa tạo",
      icon: IconSparkles,
      tone: "primary",
    },
    {
      label: "Đang hoạt động",
      value: formatNumber(stats.active),
      helper: "Có phiên 24h qua",
      icon: IconUserCheck,
      tone: "success",
    },
    {
      label: "Đã khóa",
      value: formatNumber(stats.locked),
      helper: "Cần kiểm tra quyền truy cập",
      icon: IconLock,
      tone: "danger",
    },
  ] satisfies UserStatCardProps[]

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {userStats.map((userStat) => (
        <UserStatCard key={userStat.label} {...userStat} />
      ))}
    </section>
  )
}
