/**
 * Lấy ký tự đầu từ tên (Initials)
 * Ví dụ: "Nguyễn Văn A" -> "NA"
 */
export function getInitials(name?: string | null): string {
  if (!name || name === "-") return "U";
  
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  
  return `${first}${last}`.toUpperCase();
}

/**
 * Map Role sang tiếng Việt
 */
export function getRoleLabel(role?: string | null): string {
  const ROLE_MAP: Record<string, string> = {
    ADMIN: "Quản trị viên",
    TEACHER: "Giáo viên",
    USER: "Học viên",
  };
  
  return (role && ROLE_MAP[role]) || "-";
}
