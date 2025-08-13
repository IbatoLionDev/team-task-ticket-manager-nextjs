import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { MoreHorizontal } from "lucide-react";

export function ShowMoreProjects({
  projectsCount,
  showAll,
  setShowAll,
  displayCount = 5,
}) {
  if (projectsCount <= displayCount || showAll) return null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className="text-sidebar-foreground/70"
        onClick={() => setShowAll(true)}>
        <MoreHorizontal className="text-sidebar-foreground/70" />
        <span>More</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
