"use client"

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react"
import Link from "next/link"
import type { Route } from "next"
import { useRouter } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import { CloudUpload, X } from "lucide-react"
import { useDropzone, type FileRejection } from "react-dropzone"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { updateSupplier } from "../../actions/update-supplier"
import { supplierTypeOptions } from "../../constants/supplier-create-page-constants"
import {
  supplierEditPageSchema,
  type SupplierEditPageInput,
} from "../../schemas/supplier-create-page.schema"
import type { Supplier, SupplierGroup } from "../../types"

const supplierLogoMaxSizeInBytes = 2 * 1024 * 1024
const supplierLogoAccept = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
}

type EditSupplierPageProps = {
  supplier: Supplier
  supplierGroupOptions: SupplierGroup[]
}

type FormFeedback = {
  type: "error" | "success"
  message: string
}

export function EditSupplierPage({
  supplier,
  supplierGroupOptions,
}: EditSupplierPageProps) {
  const router = useRouter()
  const [formFeedback, setFormFeedback] = useState<FormFeedback | null>(null)

  const form = useForm({
    defaultValues: getDefaultEditSupplierValues(supplier),
    validators: {
      onSubmit: supplierEditPageSchema,
    },
    onSubmit: async ({ value }) => {
      setFormFeedback(null)

      const updateSupplierResult = await updateSupplier(supplier.id, {
        name: value.name,
        supplierGroupId: value.supplierGroupId,
        supplierType: value.supplierType,
        taxCode: value.taxCode,
        email: value.email,
        phoneNumber: value.phoneNumber,
        representativeName: value.representativeName,
        representativePhone: value.representativePhone,
        address: value.address,
        note: value.note,
      })

      if (!updateSupplierResult.success) {
        setFormFeedback({
          type: "error",
          message: updateSupplierResult.message,
        })
        return
      }

      router.push("/manage/suppliers" as Route)
    },
  })

  return (
    <form
      className="flex min-h-[calc(100svh-8rem)] flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        form.handleSubmit()
      }}
      noValidate
    >
      <Card className="gap-5">
        <CardHeader className="pb-0">
          <CardTitle className="text-base font-bold text-primary uppercase">
            1. Thông tin nhà cung cấp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_18rem]">
            <form.Field name="supplierCode">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Mã nhà cung cấp
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      disabled
                      placeholder="Tự động"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid} className="xl:col-span-2">
                    <RequiredFieldLabel htmlFor={field.name}>
                      Tên nhà cung cấp
                    </RequiredFieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Nhập tên nhà cung cấp"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="logoFile">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field
                    data-invalid={isInvalid}
                    className="row-span-3 xl:col-start-4 xl:row-start-1"
                  >
                    <FieldLabel htmlFor={field.name}>Logo</FieldLabel>
                    <LogoDropzone
                      inputId={field.name}
                      isInvalid={isInvalid}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={field.handleChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Định dạng: JPG, PNG (Tối đa 2MB)
                    </p>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="supplierGroupId">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Nhóm NCC</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger
                        id={field.name}
                        className="w-full"
                        aria-invalid={isInvalid}
                      >
                        <SelectValue placeholder="Chọn nhóm nhà cung cấp" />
                      </SelectTrigger>
                      <SelectContent>
                        {supplierGroupOptions.map((supplierGroup) => (
                          <SelectItem
                            key={supplierGroup.id}
                            value={supplierGroup.id}
                          >
                            {supplierGroup.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="supplierType">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid} className="xl:col-span-2">
                    <RequiredFieldLabel>
                      Loại hình nhà cung cấp
                    </RequiredFieldLabel>
                    <RadioGroup
                      value={field.state.value}
                      orientation="horizontal"
                      className="min-h-10"
                      aria-invalid={isInvalid}
                      onValueChange={(value) =>
                        field.handleChange(
                          value as SupplierEditPageInput["supplierType"]
                        )
                      }
                    >
                      {supplierTypeOptions.map((option) => (
                        <label
                          key={option.value}
                          htmlFor={`${field.name}-${option.value}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
                        >
                          <RadioGroupItem
                            id={`${field.name}-${option.value}`}
                            value={option.value}
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </RadioGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="taxCode">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Mã số thuế</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Nhập mã số thuế"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <div className="hidden xl:block xl:col-span-2" />

            <form.Field name="phoneNumber">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Điện thoại</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Nhập số điện thoại"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Nhập email"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="representativeName">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Người đại diện
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Nhập họ và tên người đại diện"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="representativePhone">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Điện thoại người đại diện
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Nhập số điện thoại"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="address">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid} className="xl:col-span-4">
                    <FieldLabel htmlFor={field.name}>Địa chỉ</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Nhập địa chỉ chi tiết"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="note">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid} className="xl:col-span-4">
                    <FieldLabel htmlFor={field.name}>Ghi chú</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Nhập ghi chú thêm về nhà cung cấp"
                      className="min-h-18"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <form.Subscribe
        selector={(state) => ({
          canSubmit: state.canSubmit,
          isSubmitting: state.isSubmitting,
        })}
      >
        {({ canSubmit, isSubmitting }) => (
          <div className="sticky bottom-0 z-10 -mx-4 -mb-6 mt-auto flex flex-col gap-3 border-t border-border/70 bg-card px-4 py-4 shadow-[0_-8px_24px_rgba(15,23,42,0.04)] sm:-mx-6 sm:flex-row sm:items-center sm:justify-end sm:px-6 lg:-mx-8 lg:px-8">
            <div className="min-w-0 flex-1">
              {formFeedback?.type === "error" ? (
                <FieldError>{formFeedback.message}</FieldError>
              ) : null}
              {formFeedback?.type === "success" ? (
                <p className="text-sm font-medium text-primary">
                  {formFeedback.message}
                </p>
              ) : null}
            </div>
            <Button asChild type="button" variant="outline" size="lg">
              <Link href={"/manage/suppliers" as Route}>Hủy</Link>
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? "Đang cập nhật..." : "Cập nhật nhà cung cấp"}
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}

function getDefaultEditSupplierValues(
  supplier: Supplier
): SupplierEditPageInput {
  return {
    supplierCode: supplier.code,
    logoFile: null,
    name: supplier.name,
    supplierGroupId: supplier.supplierGroupId,
    supplierType: supplier.supplierType,
    taxCode: supplier.taxCode,
    phoneNumber: supplier.phoneNumber ?? "",
    email: supplier.email ?? "",
    representativeName: supplier.representativeName ?? "",
    representativePhone: supplier.representativePhone ?? "",
    address: supplier.address ?? "",
    note: supplier.note ?? "",
  }
}

type RequiredFieldLabelProps = {
  children: ReactNode
  htmlFor?: string
}

function RequiredFieldLabel({ children, htmlFor }: RequiredFieldLabelProps) {
  return (
    <FieldLabel htmlFor={htmlFor}>
      {children}
      <span className="text-destructive">*</span>
    </FieldLabel>
  )
}

type LogoDropzoneProps = {
  inputId: string
  isInvalid: boolean
  value: File | null
  onBlur: () => void
  onChange: (file: File | null) => void
}

function LogoDropzone({
  inputId,
  isInvalid,
  value,
  onBlur,
  onChange,
}: LogoDropzoneProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const previewUrlRef = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      revokePreviewUrl(previewUrlRef)
    }
  }, [])

  const { getInputProps, getRootProps, inputRef, isDragActive, isDragReject } =
    useDropzone({
      accept: supplierLogoAccept,
      maxFiles: 1,
      maxSize: supplierLogoMaxSizeInBytes,
      multiple: false,
      onDrop: (acceptedFiles, fileRejections) => {
        const logoFile = acceptedFiles[0] ?? null

        if (logoFile) {
          handleLogoFileChange(logoFile)
          return
        }

        if (fileRejections.length) {
          handleLogoFileChange(null)
          setFileError(getLogoFileRejectionMessage(fileRejections[0]))
        }
      },
    })

  function handleLogoFileChange(logoFile: File | null) {
    revokePreviewUrl(previewUrlRef)
    setPreviewUrl(
      logoFile ? createPreviewUrl(logoFile, previewUrlRef) : null
    )
    setFileError(null)
    onChange(logoFile)
  }

  function handleClear(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    handleLogoFileChange(null)

    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <>
      <div
        {...getRootProps()}
        className={cn(
          "relative flex min-h-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded border border-dashed border-input bg-background px-4 py-6 text-center transition-colors hover:border-primary/50 hover:bg-primary/5",
          isDragActive && "border-primary bg-primary/5",
          (isDragReject || isInvalid) && "border-destructive bg-destructive/5"
        )}
      >
        <input
          {...getInputProps({
            id: inputId,
            onBlur,
          })}
        />
        {value && previewUrl ? (
          <>
            <span
              role="img"
              aria-label="Logo đã chọn"
              className="absolute inset-3 block rounded bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${previewUrl})` }}
            />
            <span className="absolute inset-x-0 bottom-0 bg-background/95 px-3 py-2 text-xs font-medium text-primary">
              <span className="block truncate">{value.name}</span>
            </span>
            <button
              type="button"
              className="absolute top-2 right-2 inline-flex size-7 items-center justify-center rounded border border-border bg-background text-muted-foreground shadow-xs hover:bg-muted hover:text-foreground"
              aria-label="Gỡ logo"
              onClick={handleClear}
            >
              <X className="size-4" />
            </button>
          </>
        ) : (
          <>
            <CloudUpload className="size-9 text-muted-foreground" />
            <span className="mt-3 text-sm font-semibold text-foreground">
              {isDragActive ? "Thả ảnh vào đây" : "Kéo thả ảnh vào đây"}
            </span>
            <span className="mt-1 text-sm text-muted-foreground">
              hoặc{" "}
              <span className="font-medium text-primary underline underline-offset-3">
                chọn file
              </span>
            </span>
          </>
        )}
      </div>
      {fileError ? (
        <p className="text-xs text-destructive">{fileError}</p>
      ) : null}
    </>
  )
}

function createPreviewUrl(
  logoFile: File,
  previewUrlRef: React.RefObject<string | null>
) {
  const nextPreviewUrl = URL.createObjectURL(logoFile)
  previewUrlRef.current = nextPreviewUrl

  return nextPreviewUrl
}

function revokePreviewUrl(previewUrlRef: React.RefObject<string | null>) {
  if (!previewUrlRef.current) {
    return
  }

  URL.revokeObjectURL(previewUrlRef.current)
  previewUrlRef.current = null
}

function getLogoFileRejectionMessage(fileRejection: FileRejection) {
  const rejectedCode = fileRejection.errors[0]?.code

  if (rejectedCode === "file-too-large") {
    return "Logo không được vượt quá 2MB."
  }

  if (rejectedCode === "file-invalid-type") {
    return "Logo chỉ hỗ trợ JPG hoặc PNG."
  }

  return "Không thể chọn logo này."
}
