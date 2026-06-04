"use server"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import type { ActionResponse } from "@/types/api"
import {
  supplierFormSchema,
  type SupplierFormInput,
} from "../schemas/supplier.schema"
import type { Supplier } from "../types"

export async function createSupplier(
  input: SupplierFormInput
): Promise<ActionResponse<Supplier>> {
  try {
    const reqDto = supplierFormSchema.parse(input)
    const supplier = await api<Supplier>("/api/suppliers", {
      method: "POST",
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
  } catch (createSupplierError) {
    console.error("Create supplier error:", createSupplierError)

    return {
      success: false,
      message: "Không thể tạo nhà cung cấp. Vui lòng thử lại.",
    }
  }
}
