export function setJsonStorage<TStorageValue>(
  storageKey: string,
  storageValue: TStorageValue,
  storage: Storage = window.localStorage
) {
  storage.setItem(storageKey, JSON.stringify(storageValue))
}

export function getJsonStorage<TStorageValue>(
  storageKey: string,
  storage: Storage = window.localStorage
): TStorageValue | null {
  const storageValue = storage.getItem(storageKey)

  if (!storageValue) {
    return null
  }

  try {
    return JSON.parse(storageValue) as TStorageValue
  } catch {
    return null
  }
}

export function removeJsonStorage(
  storageKey: string,
  storage: Storage = window.localStorage
) {
  storage.removeItem(storageKey)
}
