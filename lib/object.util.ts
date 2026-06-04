import omitBy from "lodash/omitBy"

type EmptyFieldValue = "" | null | undefined

type NonEmptyFields<TObject extends Record<string, unknown>> = {
  [TKey in keyof TObject]?: Exclude<TObject[TKey], EmptyFieldValue>
}

/**
 * Removes empty string, null, and undefined fields from a shallow object.
 *
 * @param objectValue - Object to clean before sending to an API.
 * @returns A shallow object without empty string, null, or undefined fields.
 */
export function omitEmptyFields<TObject extends Record<string, unknown>>(
  objectValue: TObject
): NonEmptyFields<TObject> {
  return omitBy(
    objectValue,
    (fieldValue) =>
      fieldValue === "" || fieldValue === null || fieldValue === undefined
  ) as NonEmptyFields<TObject>
}
