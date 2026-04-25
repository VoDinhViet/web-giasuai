import { JoinClassInvitePage } from "@/features/classes/components/JoinClassInvitePage";
import { getClassByCode } from "@/features/classes/actions/get-class-by-code";
import { getSession } from "@/lib/session";

interface JoinInvitePageProps {
  params: Promise<{ inviteCode: string }>;
}

export default async function JoinInvitePage({
  params,
}: JoinInvitePageProps) {
  const { inviteCode } = await params;
  const session = await getSession();
  const classInfo = await getClassByCode(inviteCode).catch(() => null);

  return (
    <JoinClassInvitePage
      inviteCode={inviteCode}
      isLoggedIn={session.isLoggedIn}
      classInfo={classInfo}
    />
  );
}
