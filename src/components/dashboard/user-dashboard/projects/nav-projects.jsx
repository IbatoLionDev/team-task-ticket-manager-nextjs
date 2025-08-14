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
import { ProjectDelete } from "./project-delete";
import { ShowMoreProjects } from "./show-more-projects";
import { SkeletonList } from "@/components/ui/skeleton-list";
import Link from "next/link";

export function NavProjects() {
  const { isMobile } = useSidebar();
  const {
    data: projects,
    error,
    loading,
    refetch,
  } = useClientFetch("/api/project?id&title", "GET");

  const displayedProjects = projects ? projects.slice(0, 5) : [];

  const [showAll, setShowAll] = useState(false);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {error && <div>Error loading projects: {error}</div>}
        {loading && <SkeletonList count={5} icon={true} />}
        {!loading &&
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
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/projects/${item.id}`}>
                      <Folder className="text-muted-foreground" />
                      <span>View Project</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="text-muted-foreground" />
                    <span>Share Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <ProjectDelete
                    projectId={item.id}
                    onDeleteSuccess={() => {
                      refetch();
                    }}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
        <ShowMoreProjects
          projectsCount={projects ? projects.length : 0}
          showAll={showAll}
          setShowAll={setShowAll}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
}
