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
    <div className={cn("px-8 py-6 space-y-1", className)}>
      <p className="text-[13px] font-medium text-zinc-500">
        {title}
      </p>
      <h3 className="text-3xl font-bold tracking-tight text-zinc-950">
        {typeof value === "number" ? value.toLocaleString() : value}
      </h3>
    </div>
  );
}
