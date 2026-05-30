"use client";

import * as React from "react";
import { IconPlus } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateClassForm } from "./CreateClassForm";

interface CreateClassDialogProps {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}

export function CreateClassDialog({
  buttonVariant = "default",
}: CreateClassDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size={'lg'}>
          <IconPlus />
          Tạo lớp học mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Tạo lớp học mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin cơ bản để mở một lớp học mới và bắt đầu quản lý học viên.
          </DialogDescription>
        </DialogHeader>
        <CreateClassForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
