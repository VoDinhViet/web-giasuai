const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ""

/**
 * Resolves API-relative asset URLs while preserving absolute, blob, and data URLs.
 *
 * @param url - Asset URL from API data.
 * @returns A browser-ready URL, or `null` when the input is empty.
 */
export function resolveApiAssetUrl(url: string | null | undefined) {
  if (!url) {
    return null
  }

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("blob:") ||
    url.startsWith("data:")
  ) {
    return url
  }

  if (url.startsWith("/")) {
    return `${API_BASE_URL}${url}`
  }

  return url
}
