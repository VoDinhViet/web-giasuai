"use client"

import type { Route } from "next"
import { useRouter } from "next/navigation"

import { updateProduct } from "../actions/update-product"
import {
  deleteProductImage,
  uploadProductImage,
} from "../actions/upload-product-image"
import { updateProductRevision } from "../actions/update-product-revision"
import type { Product, ProductFormOptions } from "../types"
import { EditProductForm } from "./edit-product-form"

type EditProductPageFormProps = {
  product: Product
  formOptions: ProductFormOptions
}

const productsRoute = "/manage/products" as Route

export function EditProductPageForm({
  product,
  formOptions,
}: EditProductPageFormProps) {
  const router = useRouter()

  return (
    <EditProductForm
      product={product}
      formOptions={formOptions}
      onCancel={() => router.push(productsRoute)}
      onSuccess={() => {
        router.push(productsRoute)
        router.refresh()
      }}
      onSubmit={async (value, imageFile, shouldDeleteImage) => {
        const updatedProduct = await updateProduct(product.id, value)

        if (
          product.currentRevision &&
          value.revisionNo !== product.currentRevision.revisionNo
        ) {
          await updateProductRevision(product.id, product.currentRevision.id, {
            revisionNo: value.revisionNo,
            note: product.currentRevision.note ?? "",
          })
        }

        if (imageFile) {
          const formData = new FormData()
          formData.set("image", imageFile)

          return uploadProductImage(product.id, formData)
        }

        if (shouldDeleteImage) {
          return deleteProductImage(product.id)
        }

        return updatedProduct
      }}
    />
  )
}
