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

function getDashboardBreadcrumbs(pathname) {
  const segments = pathname
    .replace(/(^\/+)|(\/+$)/g, "")
    .split("/")
    .filter(Boolean);
  const dashboardIndex = segments.indexOf("dashboard");
  const crumbs =
    dashboardIndex >= 0 ? segments.slice(dashboardIndex) : segments;

  function isDynamicSegment(segment) {
    // Check if segment is a number (id)
    return /^\d+$/.test(segment);
  }

  return crumbs.map((segment, idx) => {
    const href = "/" + segments.slice(0, dashboardIndex + idx + 1).join("/");
    const isLast = idx === crumbs.length - 1;
    const label = isDynamicSegment(segment)
      ? "Id"
      : segment.charAt(0).toUpperCase() + segment.slice(1);
    return {
      key: href,
      label,
      href,
      isLast,
    };
  });
}

export function DashboardBreadcrumbs() {
  const pathname = usePathname();
  const crumbs = getDashboardBreadcrumbs(pathname);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map(({ key, label, href, isLast }) => (
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
}
