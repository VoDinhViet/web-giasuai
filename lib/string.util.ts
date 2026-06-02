/**
 * Checks whether a value is a string with non-whitespace content.
 *
 * @param value - Unknown value to check.
 * @returns `true` when the value is a non-empty string.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

/**
 * Trims a string and converts empty output to `undefined`.
 *
 * @param value - String or empty value to trim.
 * @returns A trimmed string, or `undefined` when empty.
 */
export function trimToUndefined(value: string | null | undefined) {
  const trimmedValue = value?.trim()

  return trimmedValue || undefined
}

/**
 * Normalizes text for simple case-insensitive and accent-insensitive search.
 *
 * @param value - Text to normalize.
 * @returns A lowercased, accent-stripped, trimmed string.
 */
export function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

/**
 * Builds initials from the last words in a display name.
 *
 * @param name - Full display name.
 * @param maxParts - Maximum number of name parts used for initials.
 * @returns Uppercase initials.
 */
export function getNameInitials(name: string, maxParts = 2) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(-maxParts)
    .map((namePart) => namePart[0])
    .join("")
    .toUpperCase()
}
