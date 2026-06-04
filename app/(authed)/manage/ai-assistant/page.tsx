import { redirect } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { AiAssistantPage } from "@/features/ai-assistant/components/pages/ai-assistant-page"
import { getCurrentUser } from "@/features/auth/actions/get-current-user"

export default async function AiAssistantRoute() {
  const currentUserResponse = await getCurrentUser()

  if (!currentUserResponse.success || !currentUserResponse.data) {
    redirect("/login")
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="AI Tutor"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "AI Tutor" },
        ]}
      />
      <AiAssistantPage user={currentUserResponse.data} />
    </div>
  )
}
