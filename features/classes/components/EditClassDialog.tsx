"use client";

import * as React from "react";
import { IconPencil } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Class } from "@/types/class";

import { EditClassForm } from "./EditClassForm";

interface EditClassDialogProps {
  classData: Class;
  trigger?: React.ReactNode;
}

export function EditClassDialog({
  classData,
  trigger,
}: EditClassDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" size="sm" >
            Sửa lớp
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa lớp học</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin chi tiết và trạng thái của lớp học.
          </DialogDescription>
        </DialogHeader>
        <EditClassForm
          classData={classData}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
