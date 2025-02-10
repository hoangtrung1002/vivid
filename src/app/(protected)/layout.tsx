/*
 * This forces the component to always render dynamically (i.e., on each request).
 * Ensures authentication is always checked on the server instead of being cached.
 * */
export const dynamic = "force-dynamic";

import { onAuthenticateUser } from "@/actions/user";
import React from "react";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const auth = await onAuthenticateUser();
  if (!auth.user) redirect("/sign-in");

  return <div className="w-full min-h-screen">{children}</div>;
};
export default Layout;
