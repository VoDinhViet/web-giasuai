import { env } from "@/env"
import type { AppSession } from "@/lib/session"

export const REFRESH_TOKEN_PATH = "/api/v1/auth/refresh-token"

const TOKEN_EXPIRY_SKEW_MS = 30_000

type RefreshTokenResponse = {
  accessToken: string
  refreshToken?: string
  tokenExpires?: number
}

export function isAccessTokenExpiredSoon(tokenExpires?: number) {
  if (!tokenExpires) {
    return false
  }

  const expiryTimeMs =
    tokenExpires < 1_000_000_000_000 ? tokenExpires * 1000 : tokenExpires

  return expiryTimeMs - TOKEN_EXPIRY_SKEW_MS <= Date.now()
}

export async function refreshSessionAccessToken(session: AppSession) {
  if (
    !session.refreshToken ||
    !isAccessTokenExpiredSoon(session.tokenExpires)
  ) {
    return Boolean(session.accessToken)
  }

  try {
    const refreshResponse = await fetch(
      new URL(REFRESH_TOKEN_PATH, env.NEXT_PUBLIC_API_URL),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: session.refreshToken }),
      }
    )

    if (!refreshResponse.ok) {
      session.destroy()
      return false
    }

    const token = (await refreshResponse.json()) as RefreshTokenResponse

    session.accessToken = token.accessToken
    session.refreshToken = token.refreshToken ?? session.refreshToken
    session.tokenExpires = token.tokenExpires ?? session.tokenExpires
    session.isLoggedIn = true

    await session.save()

    return true
  } catch (error) {
    console.error("Refresh token error:", error)
    session.destroy()
    return false
  }
}
