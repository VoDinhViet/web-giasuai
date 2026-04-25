"use client";

import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { RegisterForm } from "@/features/auth/register/components/RegisterForm";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RegisterPage() {
  return (
     <ScrollArea className="h-screen w-full">
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-2xl">
          <RegisterForm />
        </div>
      </div>
    </ScrollArea>
  );
}
