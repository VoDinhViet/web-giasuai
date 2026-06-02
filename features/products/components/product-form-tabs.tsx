import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProductFormTabs() {
  return (
    <Tabs value="information" className="w-full">
      <TabsList
        variant="line"
        className="grid h-11 w-full grid-cols-2 border-b border-border/80 p-0"
      >
        <TabsTrigger
          value="information"
          className="text-xs font-semibold tracking-[0.08em] uppercase after:bg-primary data-active:text-primary"
        >
          Thông tin sản phẩm
        </TabsTrigger>
        <TabsTrigger
          value="bom-routing"
          disabled
          className="text-xs font-semibold tracking-[0.08em] uppercase"
        >
          BOM - Routing
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
