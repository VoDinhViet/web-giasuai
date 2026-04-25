import React from "react";
import { IconBook2 } from "@tabler/icons-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { CreateClassDialog } from "./CreateClassDialog";

export function ClassEmptyState() {
  return (
    <EmptyState
      icon={IconBook2}
      title="Chưa có lớp học nào"
      description="Hệ thống chưa ghi nhận lớp học nào do bạn phụ trách. Tạo lớp đầu tiên để bắt đầu quản lý học viên."
      action={<CreateClassDialog />}
    />
  );
}
