import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import PropTypes from "prop-types";
import { DashboardBreadcrumbs } from "@/components/ui/dashboard-breadcrumbs";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <DashboardBreadcrumbs />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
