import { redirect } from "next/navigation";

import { getMe } from "@/features/users/actions/get-me";
import { CurrentUserProfilePage } from "@/features/users/components/CurrentUserProfilePage";

export default async function ProfileManagePage() {
  const user = await getMe();

  if (!user) {
    redirect("/login");
  }

  return <CurrentUserProfilePage user={user} />;
}
