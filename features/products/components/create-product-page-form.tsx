"use client"

import type { Route } from "next"
import { useRouter } from "next/navigation"

import { createProduct } from "../actions/create-product"
import { uploadProductImage } from "../actions/upload-product-image"
import type { ProductFormOptions } from "../types"
import { CreateProductForm } from "./create-product-form"

type CreateProductPageFormProps = {
  formOptions: ProductFormOptions
}

const productsRoute = "/manage/products" as Route

export function CreateProductPageForm({
  formOptions,
}: CreateProductPageFormProps) {
  const router = useRouter()

  return (
    <CreateProductForm
      formOptions={formOptions}
      onCancel={() => router.push(productsRoute)}
      onSuccess={(product) => {
        router.push(`/manage/products/${product.id}` as Route)
        router.refresh()
      }}
      onSubmit={async (value, imageFile) => {
        const product = await createProduct(value)

        if (!imageFile) {
          return product
        }

        const formData = new FormData()
        formData.set("image", imageFile)

        return uploadProductImage(product.id, formData)
      }}
    />
  )
}
