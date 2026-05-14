import { Suspense } from "react";

import { LoginForm } from "@/features/auth/login/components/LoginForm";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function LoginPage({}: PageProps<'/login'>) {
  return (
    <ScrollArea className="h-screen w-full">
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-xl">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  );
}
