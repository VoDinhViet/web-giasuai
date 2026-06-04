"use client"

import { useState, type ReactNode } from "react"
import type { Route } from "next"
import { useRouter } from "next/navigation"
import { PackagePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createProduct } from "../../actions/create-product"
import { uploadProductImage } from "../../actions/upload-product-image"
import type { ProductFormOptions } from "../../types"
import { CreateProductForm } from "../forms/create-product-form"

type CreateProductDialogProps = {
  formOptions: ProductFormOptions
  trigger?: ReactNode
}

export function CreateProductDialog({
  formOptions,
  trigger,
}: CreateProductDialogProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button type="button" size="lg">
            <PackagePlus className="size-4" />
            Tạo sản phẩm
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-180">
        <DialogHeader>
          <DialogTitle>Tạo sản phẩm</DialogTitle>
          <DialogDescription>
            Nhập thông tin master sản phẩm. Sau khi lưu có thể khai báo BOM -
            Routing ở trang chi tiết sản phẩm.
          </DialogDescription>
        </DialogHeader>
        <CreateProductForm
          variant="dialog"
          formOptions={formOptions}
          onCancel={() => setOpen(false)}
          onSuccess={(product) => {
            setOpen(false)
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
      </DialogContent>
    </Dialog>
  )
}
