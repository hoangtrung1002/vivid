"use client";

import React from "react";
import { Project, User } from "@prisma/client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavMain from "@/components/global/app-sidebar/nav-main";
import { data } from "@/lib/constants";
import RecentOpen from "@/components/global/app-sidebar/recent-open";
import NavFooter from "@/components/global/app-sidebar/nav-footer";

interface Props extends React.ComponentProps<typeof Sidebar> {
  recentProjects: Project[];
  user: User;
}

const AppSidebar = ({ recentProjects, user, ...props }: Props) => {
  return (
    <Sidebar
      collapsible="icon"
      className="max-w-[212px] bg-background-90"
      {...props}
    >
      <SidebarHeader className="pt-6 px-2 pb-0">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <Avatar className="h-14 w-14 rounded-full">
              <AvatarImage src="/vivid.png" alt="vivid logo" />
              <AvatarFallback className="rounded-lg">VI</AvatarFallback>
            </Avatar>
          </div>
          <span className="truncate text-primary text-3xl font-semibold">
            {" "}
            Vivid
          </span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="px-2 mt-10 gap-y-6">
        <NavMain items={data.navMain} />
        <RecentOpen recentProjects={recentProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter prismaUser={user} />
      </SidebarFooter>
    </Sidebar>
  );
};
export default AppSidebar;
