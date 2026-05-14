import * as React from "react";
import Image from "next/image";
import {
  IconGauge,
  IconSettingsAutomation,
  IconShieldCheck,
} from "@tabler/icons-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col bg-slate-50 lg:flex-row-reverse">

      <main className="flex min-h-screen flex-1 overflow-hidden bg-slate-50 lg:w-1/2">
        {children}
      </main>
    </div>
  );
}
