"use client"

import { useEffect, useRef } from "react"

import {
  getJsonStorage,
  removeJsonStorage,
  setJsonStorage,
} from "@/lib/storage.util"
import {
  supplierCreatePageDraftSchema,
  type SupplierCreatePageDraftInput,
  type SupplierCreatePageInput,
} from "../schemas/supplier-create-page.schema"

const supplierCreateDraftStorageKey = "supplier-create-draft"

type SupplierCreateDraftForm = {
  reset: (values: SupplierCreatePageInput) => void
}

type UseSupplierCreateDraftParams = {
  defaultValues: SupplierCreatePageInput
  form: SupplierCreateDraftForm
}

export function useSupplierCreateDraft({
  defaultValues,
  form,
}: UseSupplierCreateDraftParams) {
  const hasLoadedDraftRef = useRef(false)

  useEffect(() => {
    if (hasLoadedDraftRef.current) {
      return
    }

    hasLoadedDraftRef.current = true

    const storedDraft = getJsonStorage<unknown>(supplierCreateDraftStorageKey)
    const parsedDraft = supplierCreatePageDraftSchema.safeParse(storedDraft)

    if (!parsedDraft.success) {
      return
    }

    const draftValue = { ...parsedDraft.data }

    delete draftValue.logoFileName

    form.reset({
      ...defaultValues,
      ...draftValue,
      logoFile: null,
    })
  }, [defaultValues, form])

  function saveDraft(value: SupplierCreatePageInput) {
    const { logoFile, ...draftValue } = value
    const supplierCreateDraft: SupplierCreatePageDraftInput = {
      ...draftValue,
      logoFileName: logoFile?.name ?? null,
    }

    setJsonStorage(supplierCreateDraftStorageKey, supplierCreateDraft)
  }

  function clearDraft() {
    removeJsonStorage(supplierCreateDraftStorageKey)
  }

  return {
    clearDraft,
    saveDraft,
  }
}
