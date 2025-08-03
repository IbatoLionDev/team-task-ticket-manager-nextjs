import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import PropTypes from "prop-types";
import { DashboardBreadcrumbs } from "@/components/ui/dashboard-breadcrumbs";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { AdminAppSidebar } from "@/components/admin-dashboard/admin-app-sidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AdminAppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <DashboardBreadcrumbs />
          </div>
          <div className="flex items-center gap-2 px-4">
            <ModeToggle />
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
