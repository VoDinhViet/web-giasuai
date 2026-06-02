type DateValue = Date | number | string | null | undefined

const defaultDateFallback = "--"
const defaultLocale = "vi-VN"

/**
 * Parses a date-like value into a valid `Date`.
 *
 * @param value - Date, timestamp, ISO string, or empty value to parse.
 * @returns A valid `Date`, or `null` when the value cannot be parsed.
 */
export function parseDate(value: DateValue) {
  if (!value) {
    return null
  }

  const parsedDate = value instanceof Date ? value : new Date(value)

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
}

/**
 * Formats a date-like value with the default Vietnamese locale.
 *
 * @param value - Date, timestamp, ISO string, or empty value to format.
 * @param fallback - Text returned when the value is empty or invalid.
 * @returns A localized date string or the fallback text.
 */
export function formatDate(value: DateValue, fallback = defaultDateFallback) {
  const parsedDate = parseDate(value)

  if (!parsedDate) {
    return fallback
  }

  return new Intl.DateTimeFormat(defaultLocale).format(parsedDate)
}

/**
 * Formats a date-like value with date and time using the default Vietnamese locale.
 *
 * @param value - Date, timestamp, ISO string, or empty value to format.
 * @param fallback - Text returned when the value is empty or invalid.
 * @returns A localized date-time string or the fallback text.
 */
export function formatDateTime(
  value: DateValue,
  fallback = defaultDateFallback
) {
  const parsedDate = parseDate(value)

  if (!parsedDate) {
    return fallback
  }

  return new Intl.DateTimeFormat(defaultLocale, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(parsedDate)
}

/**
 * Converts a date-like value to an HTML date input value.
 *
 * @param value - Date, timestamp, ISO string, or empty value to convert.
 * @returns A `yyyy-MM-dd` string, or an empty string when invalid.
 */
export function formatDateInputValue(value: DateValue) {
  if (!value) {
    return ""
  }

  if (typeof value === "string") {
    return value.split("T")[0]
  }

  const parsedDate = parseDate(value)

  if (!parsedDate) {
    return ""
  }

  const year = parsedDate.getFullYear()
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0")
  const day = String(parsedDate.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}
