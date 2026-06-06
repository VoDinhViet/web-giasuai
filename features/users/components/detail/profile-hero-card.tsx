import type { ReactNode } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { resolveApiAssetUrl } from "@/lib/asset-url"
import { getNameInitials } from "@/lib/string.util"
import type { User } from "@/features/users/types"
import { getUserRoleLabel } from "@/features/users/utils/user-role.util"
import { ProfileStatCard, type ProfileStatItem } from "./profile-stat-card"

type ProfileHeroCardProps = {
  actions?: ReactNode
  stats: ProfileStatItem[]
  user: User
}

export function ProfileHeroCard({
  actions,
  stats,
  user,
}: ProfileHeroCardProps) {
  const avatarSrc = resolveApiAssetUrl(user.profile?.avatarUrl ?? "")
  const initials = getNameInitials(user.fullName || user.email)

  return (
    <Card data-tone="primary" className="text-primary-foreground">
      <CardHeader>
        <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-5 sm:gap-6">
            <div className="relative shrink-0">
              <Avatar className="size-28! border-4 border-primary-foreground/25 bg-primary-foreground/10 shadow-sm sm:!size-32">
                {avatarSrc ? (
                  <AvatarImage src={avatarSrc} alt={user.fullName} />
                ) : null}
                <AvatarFallback className="bg-primary-foreground text-3xl font-bold text-primary sm:text-4xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-primary-foreground/20 bg-primary-foreground/15 text-primary-foreground shadow-none">
                  {getUserRoleLabel(user.role)}
                </Badge>
                <Badge className="border-primary-foreground bg-primary-foreground text-primary shadow-none">
                  {user.isLocked ? "Đã khóa" : "Đang hoạt động"}
                </Badge>
              </div>
              <h2 className="mt-3 truncate text-2xl font-bold">
                {user.fullName}
              </h2>
              <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-primary-foreground/80">
                @{user.username} - Hồ sơ học tập cá nhân, mục tiêu tuần và hoạt
                động gần đây.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            {actions}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <ProfileStatCard key={stat.label} {...stat} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
