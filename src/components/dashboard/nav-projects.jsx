"use client";

import { Folder, Forward, MoreHorizontal, FolderGit2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useState } from "react";
import { useClientFetch } from "@/hooks/useClientFetch";
import Link from "next/link";
import { ProjectDelete } from "./project-delete";

export function NavProjects() {
  const { isMobile } = useSidebar();
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProjectsSuccess = (data) => {
    setProjects(data);
  };

  const { loading: fetchLoading, error: fetchError } = useClientFetch(
    "/api/project",
    fetchProjectsSuccess,
    "GET"
  );

  // Sync loading and error states
  if (loading !== fetchLoading) setLoading(fetchLoading);
  if (error !== fetchError) setError(fetchError);

  const displayedProjects = projects ? projects.slice(0, 5) : [];

  const [showAll, setShowAll] = useState(false);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {loading && <div>Loading projects...</div>}
        {error && <div>Error loading projects: {error}</div>}
        {!loading &&
          !error &&
          (showAll ? projects || [] : displayedProjects).map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <Link href={`/dashboard/projects/${item.id}`}>
                  <FolderGit2 />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}>
                  <DropdownMenuItem>
                    <Folder className="text-muted-foreground" />
                    <span>View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="text-muted-foreground" />
                    <span>Share Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <ProjectDelete
                    projectId={item.id}
                    onDeleteSuccess={() => {
                      alert("Project deleted successfully");
                    }}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
        {projects && projects.length > 5 && !showAll && (
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-sidebar-foreground/70"
              onClick={() => setShowAll(true)}>
              <MoreHorizontal className="text-sidebar-foreground/70" />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
