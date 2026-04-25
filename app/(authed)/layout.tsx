import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { AuthProvider } from "@/components/providers/auth-provider";
import { getMe } from "@/features/users/actions/get-me";

export default async function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }

  const user = await getMe();

  return (
    <AuthProvider initialUser={user}>
      {children}
    </AuthProvider>
  );
}
