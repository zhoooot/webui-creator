import SideBar from "./sidebar";
import TopBar from "./topbar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="sm:ml-48 h-screen flex flex-col bg-primary-500 overflow-hidden">
      <SideBar/>
      <div className="flex-none">
        <TopBar name="Taylor Swift"></TopBar>
      </div>
      <div className="flex-auto overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;