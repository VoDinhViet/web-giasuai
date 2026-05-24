import * as React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col">
      <main className="flex min-h-screen flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
