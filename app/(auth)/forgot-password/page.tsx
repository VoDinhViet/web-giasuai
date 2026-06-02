import { ScrollArea } from "@/components/ui/scroll-area";
import { ForgotPasswordForm } from "@/features/auth/password-reset/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <ScrollArea className="h-screen w-full">
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-xl">
          <ForgotPasswordForm />
        </div>
      </div>
    </ScrollArea>
  );
}
