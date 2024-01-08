import { decode } from "@/helper/decode_jwt";
import SideBar from "./sidebar";
import TopBar from "./topbar";
import React, { ReactNode, useEffect } from "react";
import axios from "axios";
import {
  CREATOR_URL,
  INFO_LOCAL_STORAGE_KEY,
  JWT_LOCAL_STORAGE_KEY,
} from "@/config";
import { ICreatorData } from "@/interface/ICreatorData";

interface LayoutProps {
  children: ReactNode;
  show_search?: boolean;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const [name, setName] = React.useState<string>("");

  useEffect(() => {
    const fetchInfo = async (jwt: string) => {
      const decoded = decode(jwt);
      const url = CREATOR_URL + "/creator/" + decoded.sub;
      console.log(url);
      const response = await axios.get(CREATOR_URL + "/creator/" + decoded.sub);
      const info: ICreatorData = {
        id: response.data.id,
        name: response.data.fullname,
        phone: response.data.phone,
        institute: response.data.institution,
      };
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }
      if (typeof window !== "undefined") {
        localStorage.removeItem(INFO_LOCAL_STORAGE_KEY);
        localStorage.setItem(INFO_LOCAL_STORAGE_KEY, JSON.stringify(info));
      }
      setName(info.name);
    };
    if (typeof window === "undefined") return;
    const jwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    if (!jwt) {
      window.location.href = "/auth";
    } else {
      try {
        fetchInfo(jwt);
      } catch (e: any) {
        alert(e.message);
      }
    }
  }, []);

  return (
    <div className="sm:ml-48 h-screen flex flex-col bg-primary-500 overflow-hidden">
      <SideBar />
      <div className="flex-none">
        <TopBar
          name={name}
          show_search={props.show_search === null ? false : props.show_search!}
        />
      </div>
      <div className="flex-auto overflow-y-auto">{props.children}</div>
    </div>
  );
};

export default Layout;
