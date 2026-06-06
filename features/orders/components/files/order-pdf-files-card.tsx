"use client"

import { useState, useTransition } from "react"
import { FileText, Trash2, Upload } from "lucide-react"
import { useDropzone } from "react-dropzone"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { resolveApiAssetUrl } from "@/lib/asset-url"
import { cn } from "@/lib/utils"
import { deleteOrderFile } from "../../actions/delete-order-file"
import { uploadOrderPdf } from "../../actions/upload-order-pdf"
import type { Order } from "../../types"

type OrderPdfFilesCardProps = {
  editable: boolean
  order: Order
}

export function OrderPdfFilesCard({ editable, order }: OrderPdfFilesCardProps) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    disabled: !editable || isPending,
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    onDrop: (acceptedFiles) => {
      const pdfFile = acceptedFiles[0]

      if (!pdfFile) {
        return
      }

      setError(null)
      startTransition(async () => {
        try {
          const formData = new FormData()
          formData.set("file", pdfFile)
          await uploadOrderPdf(order.id, formData)
        } catch {
          setError("Không thể upload file PO PDF.")
        }
      })
    },
  })

  function handleDelete(fileId: string) {
    setError(null)
    startTransition(async () => {
      try {
        await deleteOrderFile(order.id, fileId)
      } catch {
        setError("Không thể xóa file PO PDF.")
      }
    })
  }

  return (
    <Card>
      <CardHeader className="border-b border-border/70">
        <div>
          <CardTitle>File PO PDF</CardTitle>
          <CardDescription className="mt-1">
            File đặt hàng của khách hàng, chỉ dùng cho luồng thương mại.
          </CardDescription>
        </div>
        <CardAction>
          {editable ? (
            <span className="text-xs font-medium text-muted-foreground">
              PDF tối đa 10 MB
            </span>
          ) : null}
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-4">
        {editable ? (
          <div
            {...getRootProps()}
            className={cn(
              "grid cursor-pointer justify-items-center gap-2 rounded-md border border-dashed border-border bg-muted/15 px-4 py-5 text-center transition-colors",
              isDragActive && "border-primary bg-primary/5",
              isPending && "pointer-events-none opacity-60"
            )}
          >
            <input {...getInputProps()} />
            <span className="flex size-10 items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-border">
              <Upload className="size-4" />
            </span>
            <p className="text-sm font-medium text-foreground">
              {isPending ? "Đang xử lý..." : "Kéo thả hoặc chọn file PDF"}
            </p>
          </div>
        ) : null}

        <div className="grid gap-2">
          {order.files.length ? (
            order.files.map((orderFile) => {
              const fileUrl = resolveApiAssetUrl(orderFile.url)

              return (
                <div
                  key={orderFile.id}
                  className="flex min-w-0 items-center justify-between gap-3 rounded-md border border-border/70 bg-background p-3"
                >
                  <a
                    href={fileUrl ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-w-0 items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
                  >
                    <FileText className="size-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{orderFile.originalName}</span>
                  </a>

                  {editable ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      disabled={isPending}
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(orderFile.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  ) : null}
                </div>
              )
            })
          ) : (
            <p className="rounded-md border border-border/70 bg-background p-3 text-sm text-muted-foreground">
              Chưa có file PO PDF.
            </p>
          )}
        </div>

        {error ? <p className="text-xs text-destructive">{error}</p> : null}
      </CardContent>
    </Card>
  )
}
