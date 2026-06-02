import { createSelectOptionsFromLabelMap } from "@/lib/select-option.util"
import { ClientType } from "../types"

export const clientTypeLabel: Record<ClientType, string> = {
  [ClientType.INDIVIDUAL]: "Cá nhân",
  [ClientType.COMPANY]: "Doanh nghiệp",
}

export const clientTypeOptions =
  createSelectOptionsFromLabelMap(clientTypeLabel)
