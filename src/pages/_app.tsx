"use client;";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import SideBar from "./global_components/sidebar";
import TopBar from "./global_components/topbar";

export default function App({ Component, pageProps }: AppProps) {
  "use client;";
  useEffect(() => {
    import("preline");
  }, []);

  return (
    <div className="h-screen w-screen">
      <Component {...pageProps} />
    </div>
  );
}
