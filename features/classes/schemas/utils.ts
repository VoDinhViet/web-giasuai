export function emptyStringToUndefined(value: string) {
  return value || undefined
}

export function isValidUrl(value: string) {
  if (!value) {
    return true
  }

  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}
