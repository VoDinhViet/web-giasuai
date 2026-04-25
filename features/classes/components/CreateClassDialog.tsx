"use client";

import * as React from "react";
import { IconPlus } from "@tabler/icons-react";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserRole } from "@/types/user";
import { CreateClassForm } from "./CreateClassForm";

interface CreateClassDialogProps {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}

export function CreateClassDialog({
  buttonVariant = "default",
}: CreateClassDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <PermissionGuard role={UserRole.TEACHER}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={buttonVariant} className="group">
            <IconPlus className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            {"T\u1EA1o l\u1EDBp h\u1ECDc m\u1EDBi"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{"T\u1EA1o l\u1EDBp h\u1ECDc m\u1EDBi"}</DialogTitle>
            <DialogDescription>
              {
                "Nh\u1EADp th\u00F4ng tin c\u01A1 b\u1EA3n \u0111\u1EC3 m\u1EDF m\u1ED9t l\u1EDBp h\u1ECDc m\u1EDBi v\u00E0 b\u1EAFt \u0111\u1EA7u qu\u1EA3n l\u00FD h\u1ECDc vi\u00EAn."
              }
            </DialogDescription>
          </DialogHeader>
          <CreateClassForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </PermissionGuard>
  );
}
