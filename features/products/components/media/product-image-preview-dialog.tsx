"use client"

import * as React from "react"
import {
  Download,
  ImageIcon,
  RefreshCcw,
  RotateCcw,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog"
import { resolveApiAssetUrl } from "@/lib/asset-url"
import { cn } from "@/lib/utils"

const MIN_ZOOM_LEVEL = 0.5
const MAX_ZOOM_LEVEL = 3
const ZOOM_STEP = 0.25

type ProductImagePreviewDialogProps = {
  code: string
  imageUrl: string | null
  name: string
  size?: "sm" | "md"
}

export function ProductImagePreviewDialog({
  code,
  imageUrl,
  name,
  size = "md",
}: ProductImagePreviewDialogProps) {
  const imageSizeClassName = size === "sm" ? "size-10" : "size-12"
  const imageSrc = resolveApiAssetUrl(imageUrl)
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)
  const [zoomLevel, setZoomLevel] = React.useState(1)
  const [rotationDeg, setRotationDeg] = React.useState(0)

  function handleOpenChange(nextOpen: boolean) {
    setIsPreviewOpen(nextOpen)

    if (nextOpen) {
      setZoomLevel(1)
      setRotationDeg(0)
    }
  }

  function handleZoomOut() {
    setZoomLevel((currentZoomLevel) =>
      Math.max(MIN_ZOOM_LEVEL, currentZoomLevel - ZOOM_STEP)
    )
  }

  function handleZoomIn() {
    setZoomLevel((currentZoomLevel) =>
      Math.min(MAX_ZOOM_LEVEL, currentZoomLevel + ZOOM_STEP)
    )
  }

  function handleResetTransform() {
    setZoomLevel(1)
    setRotationDeg(0)
  }

  function handleRotateLeft() {
    setRotationDeg((currentRotationDeg) => currentRotationDeg - 90)
  }

  function handleRotateRight() {
    setRotationDeg((currentRotationDeg) => currentRotationDeg + 90)
  }

  const triggerContent = imageSrc ? (
    <span
      aria-hidden="true"
      className="block size-full rounded-[inherit] bg-cover bg-center transition-transform duration-200 group-hover/button:scale-105"
      style={{ backgroundImage: `url(${imageSrc})` }}
    />
  ) : (
    <ImageIcon className="size-4 text-muted-foreground" />
  )

  return (
    <Dialog open={isPreviewOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          aria-label={`Xem ảnh ${name}`}
          disabled={!imageSrc}
          className={cn(
            imageSizeClassName,
            "overflow-hidden rounded border border-border/70 bg-background p-0 shadow-xs hover:border-primary/40 hover:bg-muted disabled:opacity-100"
          )}
        >
          {triggerContent}
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="bg-foreground/45 backdrop-blur-[1px] dark:bg-background/75" />
        <DialogPrimitive.Content
          data-slot="product-image-preview"
          className="fixed inset-0 z-50 flex flex-col outline-none"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <DialogPrimitive.Title className="sr-only">
            {name}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            {code}
          </DialogPrimitive.Description>

          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              aria-label="Đóng preview ảnh"
              className="absolute top-4 right-4 z-10 rounded-full border border-background/20 bg-foreground/40 text-background shadow-lg shadow-black/10 backdrop-blur-md hover:bg-foreground/55 hover:text-background dark:border-foreground/15 dark:bg-background/60 dark:text-foreground dark:hover:bg-background/80 dark:hover:text-foreground"
            >
              <X className="size-5" />
            </Button>
          </DialogClose>

          <div className="flex min-h-0 flex-1 items-center justify-center px-5 py-16 sm:px-20">
            {imageSrc ? (
              <div
                role="img"
                aria-label={name}
                className="h-[min(78vh,760px)] w-[min(88vw,920px)] max-w-full bg-contain bg-center bg-no-repeat transition-transform duration-200 ease-out will-change-transform"
                style={{
                  backgroundImage: `url(${imageSrc})`,
                  transform: `scale(${zoomLevel}) rotate(${rotationDeg}deg)`,
                }}
              />
            ) : null}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-3 px-4">
            <div className="pointer-events-auto flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full border border-background/20 bg-foreground/40 px-3 py-1.5 text-xs font-medium text-background shadow-lg shadow-black/10 backdrop-blur-md dark:border-foreground/15 dark:bg-background/60 dark:text-foreground">
              <span className="shrink-0">1 / 1</span>
              <span
                className="h-4 w-px bg-background/30 dark:bg-foreground/20"
                aria-hidden="true"
              />
              <span className="truncate">{code}</span>
            </div>

            <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-background/20 bg-foreground/40 p-1.5 text-background shadow-lg shadow-black/10 backdrop-blur-md dark:border-foreground/15 dark:bg-background/60 dark:text-foreground">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Thu nhỏ ảnh"
                disabled={zoomLevel <= MIN_ZOOM_LEVEL}
                className="rounded-full text-background hover:bg-background/20 hover:text-background disabled:opacity-40 dark:text-foreground dark:hover:bg-foreground/10 dark:hover:text-foreground"
                onClick={handleZoomOut}
              >
                <ZoomOut />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Phóng to ảnh"
                disabled={zoomLevel >= MAX_ZOOM_LEVEL}
                className="rounded-full text-background hover:bg-background/20 hover:text-background disabled:opacity-40 dark:text-foreground dark:hover:bg-foreground/10 dark:hover:text-foreground"
                onClick={handleZoomIn}
              >
                <ZoomIn />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Xoay trái"
                className="rounded-full text-background hover:bg-background/20 hover:text-background dark:text-foreground dark:hover:bg-foreground/10 dark:hover:text-foreground"
                onClick={handleRotateLeft}
              >
                <RotateCcw />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Xoay phải"
                className="rounded-full text-background hover:bg-background/20 hover:text-background dark:text-foreground dark:hover:bg-foreground/10 dark:hover:text-foreground"
                onClick={handleRotateRight}
              >
                <RotateCw />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Đặt lại ảnh"
                className="rounded-full text-background hover:bg-background/20 hover:text-background dark:text-foreground dark:hover:bg-foreground/10 dark:hover:text-foreground"
                onClick={handleResetTransform}
              >
                <RefreshCcw />
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon-sm"
                aria-label="Tải ảnh"
                className="rounded-full text-background hover:bg-background/20 hover:text-background dark:text-foreground dark:hover:bg-foreground/10 dark:hover:text-foreground"
              >
                <a
                  href={imageSrc ?? "#"}
                  download={name}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download />
                </a>
              </Button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
