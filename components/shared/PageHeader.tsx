import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: ReactNode;
  metadata?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumb,
  metadata,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-col gap-5">
        {breadcrumb ? (
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
            {breadcrumb}
          </div>
        ) : null}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
              {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
            </div>

            {metadata ? (
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground/90">
                {metadata}
              </div>
            ) : null}
          </div>

          {actions ? (
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-2">
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
