import { createSelectOptionsFromLabelMap } from "@/lib/select-option.util"
import { ProductItemType, ProductStatus } from "../types"

export const productItemTypeLabel: Record<ProductItemType, string> = {
  [ProductItemType.FG]: "Thành phẩm",
  [ProductItemType.WIP]: "Bán thành phẩm",
  [ProductItemType.RM]: "Nguyên vật liệu",
  [ProductItemType.CONSUMABLE]: "Vật tư phụ",
}

export const productStatusLabel: Record<ProductStatus, string> = {
  [ProductStatus.ACTIVE]: "Đang dùng",
  [ProductStatus.INACTIVE]: "Ngưng dùng",
  [ProductStatus.LOCKED]: "Đã khóa",
}

export const productItemTypeOptions =
  createSelectOptionsFromLabelMap(productItemTypeLabel)

export const productStatusOptions =
  createSelectOptionsFromLabelMap(productStatusLabel)

export const editableProductStatusOptions = productStatusOptions.filter(
  (productStatusOption) => productStatusOption.value !== ProductStatus.LOCKED
)
