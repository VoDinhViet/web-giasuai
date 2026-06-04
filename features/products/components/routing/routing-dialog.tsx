"use client"

import * as React from "react"
import { Plus, Route, Save, Trash2, X } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getRouting } from "../../actions/get-routing"
import { updateRouting } from "../../actions/update-routing"
import {
  ProductItemType,
  type BomTreeNode,
  type ProductFormOptions,
} from "../../types"

type RoutingDialogProps = {
  formOptions: ProductFormOptions
  node: BomTreeNode
  productId: string
  revisionId: string | null
}

type RoutingProcessType = "inhouse" | "outside"

type RoutingDraftStep = {
  defaultSupplierId: string
  isOutsideProcess: boolean
  note: string
  operationId: string
  rowId: string
  stepNo: string
}

export function RoutingDialog({
  formOptions,
  node,
  productId,
  revisionId,
}: RoutingDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [routingSteps, setRoutingSteps] = React.useState<RoutingDraftStep[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()
  const canManageRouting =
    Boolean(revisionId) &&
    (node.itemType === ProductItemType.FG ||
      node.itemType === ProductItemType.WIP)

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    setSubmitError(null)

    if (!nextOpen || !revisionId || !canManageRouting) {
      return
    }

    setIsLoading(true)
    startTransition(async () => {
      try {
        const steps = await getRouting(productId, revisionId, node.productId)

        setRoutingSteps(
          steps.map((step) => ({
            defaultSupplierId: step.defaultSupplierId ?? "none",
            isOutsideProcess: step.isOutsideProcess,
            note: step.note ?? "",
            operationId: step.operationId,
            rowId: step.id,
            stepNo: String(step.stepNo),
          }))
        )
      } catch {
        setSubmitError("Không thể tải routing. Vui lòng thử lại.")
      } finally {
        setIsLoading(false)
      }
    })
  }

  function addRoutingStep() {
    const nextStepNo =
      routingSteps.reduce(
        (maxStepNo, routingStep) =>
          Math.max(maxStepNo, Number(routingStep.stepNo) || 0),
        0
      ) + 1

    setRoutingSteps((currentSteps) => [
      ...currentSteps,
      {
        defaultSupplierId: "none",
        isOutsideProcess: false,
        note: "",
        operationId: "",
        rowId: crypto.randomUUID(),
        stepNo: String(nextStepNo),
      },
    ])
  }

  function updateRoutingStep(rowId: string, patch: Partial<RoutingDraftStep>) {
    setRoutingSteps((currentSteps) =>
      currentSteps.map((routingStep) =>
        routingStep.rowId === rowId ? { ...routingStep, ...patch } : routingStep
      )
    )
  }

  function removeRoutingStep(rowId: string) {
    setRoutingSteps((currentSteps) =>
      currentSteps.filter((routingStep) => routingStep.rowId !== rowId)
    )
  }

  function handleSave() {
    if (!revisionId) {
      return
    }

    setSubmitError(null)
    startTransition(async () => {
      try {
        await updateRouting(productId, revisionId, node.productId, {
          steps: routingSteps.map((routingStep) => ({
            defaultSupplierId: routingStep.defaultSupplierId,
            isOutsideProcess: routingStep.isOutsideProcess,
            note: routingStep.note,
            operationId: routingStep.operationId,
            stepNo: Number(routingStep.stepNo),
          })),
        })
        setOpen(false)
        router.refresh()
      } catch {
        setSubmitError("Không thể lưu routing. Kiểm tra lại dữ liệu đã nhập.")
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Routing ${node.code}`}
              disabled={!canManageRouting}
              className="text-muted-foreground hover:text-foreground"
            >
              <Route />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          {canManageRouting ? "Routing" : "Không áp dụng routing"}
        </TooltipContent>
      </Tooltip>

      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-252">
        <DialogHeader>
          <DialogTitle>Routing công đoạn</DialogTitle>
          <DialogDescription>
            Khai báo thứ tự công đoạn inhouse hoặc outsource cho {node.code}.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {node.name}
            </p>
            <p className="text-xs text-muted-foreground">{node.code}</p>
          </div>
          <Button type="button" variant="outline" onClick={addRoutingStep}>
            <Plus className="size-4" />
            Thêm công đoạn
          </Button>
        </div>

        <div className="overflow-x-auto rounded-md border border-border">
          <Table className="min-w-210">
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-24">STT</TableHead>
                <TableHead>Công đoạn</TableHead>
                <TableHead className="w-36">Loại</TableHead>
                <TableHead className="w-56">Nhà cung cấp</TableHead>
                <TableHead>Ghi chú</TableHead>
                <TableHead className="w-16 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center text-sm text-muted-foreground"
                  >
                    Đang tải routing...
                  </TableCell>
                </TableRow>
              ) : routingSteps.length > 0 ? (
                routingSteps.map((routingStep) => (
                  <TableRow key={routingStep.rowId}>
                    <TableCell>
                      <Input
                        value={routingStep.stepNo}
                        onChange={(event) =>
                          updateRoutingStep(routingStep.rowId, {
                            stepNo: event.target.value,
                          })
                        }
                        inputMode="numeric"
                        className="h-8 w-18"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={routingStep.operationId}
                        onValueChange={(operationId) =>
                          updateRoutingStep(routingStep.rowId, { operationId })
                        }
                      >
                        <SelectTrigger className="h-8 w-full">
                          <SelectValue placeholder="Chọn công đoạn" />
                        </SelectTrigger>
                        <SelectContent>
                          {formOptions.operations.map((operation) => (
                            <SelectItem key={operation.id} value={operation.id}>
                              {operation.code} - {operation.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={
                          routingStep.isOutsideProcess ? "outside" : "inhouse"
                        }
                        onValueChange={(value) => {
                          const processType = value as RoutingProcessType

                          updateRoutingStep(routingStep.rowId, {
                            defaultSupplierId:
                              processType === "inhouse"
                                ? "none"
                                : routingStep.defaultSupplierId,
                            isOutsideProcess: processType === "outside",
                          })
                        }}
                      >
                        <SelectTrigger className="h-8 w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inhouse">Inhouse</SelectItem>
                          <SelectItem value="outside">Outsource</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={routingStep.defaultSupplierId}
                        disabled={!routingStep.isOutsideProcess}
                        onValueChange={(defaultSupplierId) =>
                          updateRoutingStep(routingStep.rowId, {
                            defaultSupplierId,
                          })
                        }
                      >
                        <SelectTrigger className="h-8 w-full">
                          <SelectValue placeholder="Chọn NCC" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Không chọn</SelectItem>
                          {formOptions.suppliers.map((supplier) => (
                            <SelectItem key={supplier.id} value={supplier.id}>
                              {supplier.code} - {supplier.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={routingStep.note}
                        onChange={(event) =>
                          updateRoutingStep(routingStep.rowId, {
                            note: event.target.value,
                          })
                        }
                        placeholder="Ghi chú"
                        className="h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Xóa công đoạn"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeRoutingStep(routingStep.rowId)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center text-sm text-muted-foreground"
                  >
                    Chưa có routing. Thêm công đoạn để bắt đầu khai báo quy
                    trình.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {submitError ? (
          <p className="text-sm leading-5 text-destructive">{submitError}</p>
        ) : null}

        <div className="flex justify-end gap-3 border-t border-border pt-5">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            <X className="size-4" />
            Hủy bỏ
          </Button>
          <Button type="button" disabled={isPending} onClick={handleSave}>
            <Save className="size-4" />
            {isPending ? "Đang lưu..." : "Lưu routing"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
