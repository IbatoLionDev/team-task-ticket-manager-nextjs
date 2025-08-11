"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import Link from "next/link";

const getBreadcrumbs = (pathname) => {
  const segments = pathname
    .replace(/(^\/+)|(\/+$)/g, "")
    .split("/")
    .filter(Boolean);
  const baseIndex = segments.findIndex(
    (segment) => segment === "dashboard" || segment === "admin"
  );
  const relevantSegments =
    baseIndex >= 0 ? segments.slice(baseIndex) : segments;

  return relevantSegments.map((segment, index) => {
    const href = `/${segments
      .slice(0, (baseIndex >= 0 ? baseIndex : 0) + index + 1)
      .join("/")}`;
    const isLast = index === relevantSegments.length - 1;
    const label = /^\d+$/.test(segment)
      ? "Id"
      : segment.charAt(0).toUpperCase() + segment.slice(1);
    return { key: href, label, href, isLast };
  });
};

export const DashboardBreadcrumbs = () => {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  if (breadcrumbs.length <= 1) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map(({ key, label, href, isLast }) => (
          <React.Fragment key={key}>
            <BreadcrumbItem className={isLast ? undefined : "hidden md:block"}>
              {isLast ? (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={href}>{label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
