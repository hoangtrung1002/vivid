import React from "react";
import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/global/app-sidebar/page";
import { getRecentProjects } from "@/actions/projects";
import UpperInfoBar from "@/components/global/upper-info-bar/page";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const recentProjects = await getRecentProjects();
  const checkUser = await onAuthenticateUser();
  if (!checkUser.user) redirect("/sign-in");

  return (
    <SidebarProvider>
      <AppSidebar
        user={checkUser.user}
        recentProjects={recentProjects.data || []}
      />
      <SidebarInset>
        <UpperInfoBar user={checkUser.user} />
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default Layout;
