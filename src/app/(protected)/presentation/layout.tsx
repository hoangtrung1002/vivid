import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full w-full overflow-x-hidden">{children}</div>;
};
export default Layout;
