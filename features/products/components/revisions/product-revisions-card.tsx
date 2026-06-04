import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Product, ProductRevision } from "../../types"
import {
  CreateProductRevisionDialog,
  EditProductRevisionDialog,
} from "./product-revision-dialog"

type ProductRevisionsCardProps = {
  product: Product
  revisions: ProductRevision[]
}

export function ProductRevisionsCard({
  product,
  revisions,
}: ProductRevisionsCardProps) {
  return (
    <Card size="sm" className="w-full max-w-3xl gap-0 bg-white">
      <CardHeader className="border-b border-border/70 bg-white pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="border-l-4 border-primary pl-3">
            <CardTitle>Revision sản phẩm</CardTitle>
            <CardDescription className="mt-1 max-w-xl text-xs leading-5">
              Theo dõi các revision đã tạo cho sản phẩm. Khi tạo revision mới,
              có thể copy BOM - Routing từ một revision nguồn.
            </CardDescription>
          </div>
          <CreateProductRevisionDialog
            productId={product.id}
            revisions={revisions}
          />
        </div>
      </CardHeader>

      <CardContent className="bg-white pt-4">
        {revisions.length > 0 ? (
          <div className="overflow-hidden rounded-md border border-border bg-white">
            {revisions.map((revision) => {
              const isCurrentRevision =
                revision.id === product.currentRevision?.id

              return (
                <div
                  key={revision.id}
                  className="flex min-h-13 flex-col gap-2 border-b border-border/70 bg-white px-3 py-2.5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex min-w-0 items-center gap-2">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {revision.revisionNo}
                      </p>
                      <span
                        className={cn(
                          "inline-flex rounded px-2 py-0.5 text-[10px] leading-4 font-semibold uppercase",
                          isCurrentRevision
                            ? "bg-primary-fixed text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {isCurrentRevision ? "Hiện tại" : "Lưu trữ"}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs leading-5 text-muted-foreground">
                      {revision.note || "Chưa có ghi chú revision."}
                    </p>
                  </div>

                  <EditProductRevisionDialog
                    productId={product.id}
                    revision={revision}
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Chưa có revision cho sản phẩm này.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
