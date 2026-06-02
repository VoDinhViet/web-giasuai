import values from "lodash/values"

type EnumLike = Record<string, number | string>

/**
 * Gets the runtime values from a TypeScript enum-like object.
 *
 * @param enumObject - Enum-like object to read.
 * @returns The enum values as a typed array.
 */
export function getEnumValues<TEnum extends EnumLike>(enumObject: TEnum) {
  return values(enumObject) as Array<TEnum[keyof TEnum]>
}

/**
 * Checks whether a value belongs to a TypeScript enum-like object.
 *
 * @param enumObject - Enum-like object to check against.
 * @param value - Unknown value to validate.
 * @returns `true` when the value is one of the enum values.
 */
export function isEnumValue<TEnum extends EnumLike>(
  enumObject: TEnum,
  value: unknown
): value is TEnum[keyof TEnum] {
  return getEnumValues(enumObject).includes(value as TEnum[keyof TEnum])
}
