import { env } from "@/env"
import { refreshSessionAccessToken } from "@/lib/auth-token"
import { getSession } from "@/lib/session"
import { $fetch } from "ofetch"

export const api = $fetch.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  async onRequest({ options }) {
    const session = await getSession()

    const isSessionValid = await refreshSessionAccessToken(session)

    if (!isSessionValid) {
      return
    }

    if (!session.accessToken) {
      return
    }

    const headers = new Headers(options.headers)

    if (!headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${session.accessToken}`)
    }

    options.headers = headers
  },
})
