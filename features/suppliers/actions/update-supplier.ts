"use server"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import type { ActionResponse } from "@/types/api"
import {
  supplierUpdateFormSchema,
  type SupplierUpdateFormInput,
} from "../schemas/supplier.schema"
import type { Supplier } from "../types"

export async function updateSupplier(
  supplierId: string,
  input: SupplierUpdateFormInput
): Promise<ActionResponse<Supplier>> {
  try {
    const reqDto = supplierUpdateFormSchema.parse(input)
    const supplier = await api<Supplier>(`/api/suppliers/${supplierId}`, {
      method: "PATCH",
      body: omitEmptyFields({
        name: reqDto.name,
        supplierGroupId: reqDto.supplierGroupId,
        supplierType: reqDto.supplierType,
        taxCode: reqDto.taxCode,
        email: reqDto.email,
        phoneNumber: reqDto.phoneNumber,
        representativeName: reqDto.representativeName,
        representativePhone: reqDto.representativePhone,
        address: reqDto.address,
        note: reqDto.note,
      }),
    })

    return {
      success: true,
      data: supplier,
    }
  } catch (updateSupplierError) {
    console.error("Update supplier error:", updateSupplierError)

    return {
      success: false,
      message: "Không thể cập nhật nhà cung cấp. Vui lòng thử lại.",
    }
  }
}
