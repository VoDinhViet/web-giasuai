"use client"

import { useState, type ReactNode } from "react"
import { Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { updateProduct } from "../../actions/update-product"
import {
  deleteProductImage,
  uploadProductImage,
} from "../../actions/upload-product-image"
import { updateProductRevision } from "../../actions/update-product-revision"
import {
  ProductStatus,
  type Product,
  type ProductFormOptions,
} from "../../types"
import { EditProductForm } from "../forms/edit-product-form"

type EditProductDialogProps = {
  formOptions: ProductFormOptions
  product: Product
  trigger?: ReactNode
}

export function EditProductDialog({
  formOptions,
  product,
  trigger,
}: EditProductDialogProps) {
  const [open, setOpen] = useState(false)
  const isLocked = product.status === ProductStatus.LOCKED

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={
                  isLocked
                    ? `Sản phẩm ${product.code} đã khóa`
                    : `Chỉnh sửa ${product.name}`
                }
                disabled={isLocked}
                className="text-muted-foreground hover:text-foreground"
              >
                <Pencil />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            {isLocked ? "Sản phẩm đã khóa" : "Chỉnh sửa"}
          </TooltipContent>
        </Tooltip>
      )}
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-180">
        <DialogHeader>
          <DialogTitle>Cập nhật sản phẩm</DialogTitle>
          <DialogDescription>
            Chỉnh sửa thông tin master sản phẩm. BOM - Routing được quản lý
            riêng theo từng revision ở trang chi tiết.
          </DialogDescription>
        </DialogHeader>
        <EditProductForm
          variant="dialog"
          product={product}
          formOptions={formOptions}
          onCancel={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false)
          }}
          onSubmit={async (value, imageFile, shouldDeleteImage) => {
            const updatedProduct = await updateProduct(product.id, value)

            if (
              product.currentRevision &&
              value.revisionNo !== product.currentRevision.revisionNo
            ) {
              await updateProductRevision(
                product.id,
                product.currentRevision.id,
                {
                  revisionNo: value.revisionNo,
                  note: product.currentRevision.note ?? "",
                }
              )
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
      </DialogContent>
    </Dialog>
  )
}
