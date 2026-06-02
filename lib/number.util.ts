type NumericValue = number | string | null | undefined

const defaultLocale = "vi-VN"

/**
 * Converts a numeric-like value into a finite number.
 *
 * @param value - Number, numeric string, or empty value to convert.
 * @param fallback - Number returned when the value is not finite.
 * @returns A finite number.
 */
export function toFiniteNumber(value: NumericValue, fallback = 0) {
  const numericValue = Number(value ?? fallback)

  return Number.isFinite(numericValue) ? numericValue : fallback
}

/**
 * Formats a numeric-like value with the default Vietnamese locale.
 *
 * @param value - Number, numeric string, or empty value to format.
 * @param options - Intl number format options.
 * @returns A localized number string.
 */
export function formatNumber(
  value: NumericValue,
  options?: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat(defaultLocale, options).format(
    toFiniteNumber(value)
  )
}

/**
 * Formats a numeric-like value as currency.
 *
 * @param value - Number, numeric string, or empty value to format.
 * @param currency - ISO currency code used by `Intl.NumberFormat`.
 * @param options - Additional Intl number format options.
 * @returns A localized currency string.
 */
export function formatCurrency(
  value: NumericValue,
  currency = "VND",
  options?: Intl.NumberFormatOptions
) {
  return formatNumber(value, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    ...options,
  })
}

/**
 * Formats a numeric-like value as a percentage.
 *
 * @param value - Number, numeric string, or empty value to format.
 * @param options - Additional Intl number format options.
 * @returns A localized percentage string.
 */
export function formatPercent(
  value: NumericValue,
  options?: Intl.NumberFormatOptions
) {
  return formatNumber(value, {
    style: "percent",
    maximumFractionDigits: 2,
    ...options,
  })
}
