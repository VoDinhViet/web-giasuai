"use client"

import { useId, useState } from "react"
import { Camera, ImagePlus, Trash2 } from "lucide-react"
import { useDropzone } from "react-dropzone"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { resolveApiAssetUrl } from "@/lib/asset-url"
import { cn } from "@/lib/utils"

const MAX_PRODUCT_IMAGE_SIZE_IN_BYTES = 5 * 1024 * 1024
const PRODUCT_IMAGE_ACCEPT = {
  "image/gif": [".gif"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
}

type ProductImageFieldProps = {
  canClear?: boolean
  imageUrl: string | null
  label: string
  onClear?: () => void
  onFileChange: (file: File | null) => void
}

export function ProductImageField({
  canClear = false,
  imageUrl,
  label,
  onClear,
  onFileChange,
}: ProductImageFieldProps) {
  const inputId = useId()
  const [fileError, setFileError] = useState<string | null>(null)
  const imageSrc = resolveApiAssetUrl(imageUrl)
  const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
    accept: PRODUCT_IMAGE_ACCEPT,
    maxFiles: 1,
    maxSize: MAX_PRODUCT_IMAGE_SIZE_IN_BYTES,
    multiple: false,
    noClick: false,
    onDrop: (acceptedFiles, fileRejections) => {
      const acceptedFile = acceptedFiles[0] ?? null

      if (acceptedFile) {
        setFileError(null)
        onFileChange(acceptedFile)
        return
      }

      const rejectedCode = fileRejections[0]?.errors[0]?.code

      if (rejectedCode === "file-too-large") {
        setFileError("Ảnh không được vượt quá 5MB.")
      } else if (rejectedCode === "file-invalid-type") {
        setFileError("Chỉ hỗ trợ PNG, JPG, WebP hoặc GIF.")
      } else {
        setFileError("Không thể chọn ảnh này.")
      }

      onFileChange(null)
    },
  })

  return (
    <Field>
      <FieldLabel
        htmlFor={inputId}
        className="text-[10px] leading-4 font-semibold tracking-[0.08em] text-muted-foreground uppercase"
      >
        {label}
      </FieldLabel>
      <div
        {...getRootProps({
          className: cn(
            "flex aspect-square min-h-40 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-border bg-background text-center transition-colors hover:bg-muted/35",
            isDragActive && "border-primary bg-primary/5"
          ),
        })}
      >
        <input {...getInputProps({ id: inputId })} />
        {imageSrc ? (
          <span
            aria-label={label}
            className="block size-full rounded-md bg-cover bg-center"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
        ) : (
          <>
            <span className="mb-3 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Camera className="size-5" />
            </span>
            <span className="text-sm font-semibold text-foreground">
              Tải lên ảnh
            </span>
            <span className="mt-1 max-w-36 text-[10px] leading-4 text-muted-foreground">
              PNG, JPG, WebP hoặc GIF; tối đa 5MB
            </span>
          </>
        )}
      </div>
      {fileError ? (
        <p className="text-xs leading-5 text-destructive">{fileError}</p>
      ) : null}
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline" size="sm" onClick={open}>
          <ImagePlus className="size-4" />
          Chọn ảnh
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canClear}
          onClick={() => {
            setFileError(null)
            onClear?.()
          }}
        >
          <Trash2 className="size-4" />
          Gỡ ảnh
        </Button>
      </div>
    </Field>
  )
}
