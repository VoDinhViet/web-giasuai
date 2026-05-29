export function formatBirthDate(birthDate: string) {
  if (!birthDate) {
    return "--"
  }

  const parsedBirthDate = new Date(birthDate)

  if (Number.isNaN(parsedBirthDate.getTime())) {
    return "--"
  }

  return new Intl.DateTimeFormat("vi-VN").format(parsedBirthDate)
}

export function formatDateInputValue(value?: string) {
  if (!value) {
    return ""
  }

  return value.split("T")[0]
}
