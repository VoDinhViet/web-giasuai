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
