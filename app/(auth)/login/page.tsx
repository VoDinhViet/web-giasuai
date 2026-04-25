import { LoginForm } from "@/features/auth/login/components/LoginForm";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LoginPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const redirectTo =
    typeof params.redirectTo === "string" ? params.redirectTo : undefined;

  return (
    <ScrollArea className="h-screen w-full">
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-xl">
          <LoginForm redirectTo={redirectTo} />
        </div>
      </div>
    </ScrollArea>
  );
}
