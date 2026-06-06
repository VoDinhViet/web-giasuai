import { withForm } from "@/components/form/app-form"
import { Button } from "@/components/ui/button"
import { createClassDefaultValues } from "./create-class-form-values"

type CreateClassActionsProps = {
  onCancel: () => void
}

const createClassActionsDefaultProps: CreateClassActionsProps = {
  onCancel: () => {},
}

export const CreateClassActions = withForm({
  defaultValues: createClassDefaultValues,
  props: createClassActionsDefaultProps,
  render: function RenderCreateClassActions({ form, onCancel }) {
    return (
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <div className="flex flex-col-reverse gap-3 rounded border border-border/80 bg-card p-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={onCancel}
            >
              Hủy bỏ
            </Button>
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? "Đang tạo..." : "Tạo lớp học"}
            </Button>
          </div>
        )}
      </form.Subscribe>
    )
  },
})
