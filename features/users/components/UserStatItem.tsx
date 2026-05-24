import { cn } from "@/lib/utils";

interface UserStatItemProps {
  title: string;
  value: string | number;
  className?: string;
}

export function UserStatItem({
  title,
  value,
  className,
}: UserStatItemProps) {
  return (
    <div className={cn("space-y-1 px-6 py-5", className)}>
      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      <h3 className="text-2xl font-bold tracking-tight text-foreground">
        {typeof value === "number" ? value.toLocaleString("vi-VN") : value}
      </h3>
    </div>
  );
}
