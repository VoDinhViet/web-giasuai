export function formatDate(date: Date | string | null | undefined) {
  if (!date) {
    return "---"
  }

  const parsedDate = date instanceof Date ? date : new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return "---"
  }

  return parsedDate.toLocaleDateString("vi-VN")
}
