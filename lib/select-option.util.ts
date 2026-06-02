import map from "lodash/map"

export type SelectOption<TValue extends string = string> = {
  label: string
  value: TValue
}

/**
 * Converts a label map into select-friendly `{ label, value }` options.
 *
 * @param labelMap - Record where each key is an option value and each value is the display label.
 * @returns A list of select options.
 */
export function createSelectOptionsFromLabelMap<TValue extends string>(
  labelMap: Record<TValue, string>
): SelectOption<TValue>[] {
  return map(labelMap, (label, value) => ({
    label,
    value: value as TValue,
  }))
}
