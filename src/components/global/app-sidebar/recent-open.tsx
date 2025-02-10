"use client";

import React from "react";
import { Project } from "@prisma/client";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { JsonValue } from "@prisma/client/runtime/library";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSlideStore } from "@/store/useSlideStore";

interface Props {
  recentProjects: Project[];
}

const RecentOpen = ({ recentProjects }: Props) => {
  const router = useRouter();
  const { setSlides } = useSlideStore();

  const handleClick = (projectId: string, slides: JsonValue) => {
    if (!projectId || !slides) {
      toast.error("Project not found", {
        description: "Please try again.",
        style: {
          backgroundColor: "#EF4444",
          color: "#fff",
          borderStyle: "none",
        },
      });
      return;
    }
    setSlides(JSON.parse(JSON.stringify(slides)));
    router.push(`/presentation/${projectId}`);
  };
  return recentProjects.length > 0 ? (
    <SidebarGroup>
      <SidebarGroupLabel>Recently Opened</SidebarGroupLabel>
      <SidebarMenu>
        {recentProjects.length > 0
          ? recentProjects.map((project) => (
              <SidebarMenuItem key={project.id}>
                <SidebarMenuButton
                  asChild
                  tooltip={project.title}
                  className="hover:bg-primary-80 "
                >
                  <Button
                    variant="link"
                    onClick={() => handleClick(project.id, project.slides)}
                    className="text-xs items-center justify-start"
                  >
                    <span>{project.title}</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          : ""}
      </SidebarMenu>
    </SidebarGroup>
  ) : (
    <></>
  );
};
export default RecentOpen;
