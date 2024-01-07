import SideBar from "./sidebar";
import TopBar from "./topbar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  show_search?: boolean;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="sm:ml-48 h-screen flex flex-col bg-primary-500 overflow-hidden">
      <SideBar/>
      <div className="flex-none">
        <TopBar name="Taylor Swift" show_search={props.show_search === null ? false : props.show_search!}/>
      </div>
      <div className="flex-auto overflow-y-auto">{props.children}</div>
    </div>
  );
};

export default Layout;