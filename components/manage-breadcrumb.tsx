"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { IconHome, IconChevronRight } from "@tabler/icons-react";

const ROUTE_LABELS: Record<string, string> = {
  manage: "Quản trị",
  courses: "Thư viện khóa học",
  classes: "Lớp học",
  users: "Người dùng",
  settings: "Cài đặt",
};

export function ManageBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink 
            href="/manage" 
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconHome size={14} stroke={2} />
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {pathSegments.length > 0 && (
          <BreadcrumbSeparator className="text-muted-foreground/50">
            <IconChevronRight size={12} />
          </BreadcrumbSeparator>
        )}

        {pathSegments.map((segment, index) => {
          if (segment === "manage" && index === 0) return null;
          const isLast = index === pathSegments.length - 1;
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const label = ROUTE_LABELS[segment] || segment;

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-xs font-bold text-foreground">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink 
                    href={href} 
                    className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator className="text-muted-foreground/50">
                  <IconChevronRight size={12} />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
