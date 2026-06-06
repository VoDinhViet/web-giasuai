export function ImportStatusBadge({
  status,
}: {
  status: "Hợp lệ" | "Cảnh báo" | "Lỗi"
}) {
  const className =
    status === "Hợp lệ"
      ? "bg-success-container text-success ring-success/20"
      : status === "Cảnh báo"
        ? "bg-tertiary-container text-tertiary ring-tertiary/20"
        : "bg-error-container text-destructive ring-destructive/20"

  return (
    <span
      className={`inline-flex h-7 items-center rounded px-2.5 text-xs font-bold ring-1 ${className}`}
    >
      {status}
    </span>
  )
}
