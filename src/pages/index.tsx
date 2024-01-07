"use client;";

import { Inter } from "next/font/google";
import Homepage from "./homepage";
import { useEffect } from "react";
import router  from "next/router";
import { decode } from "@/helper/decode_jwt";

const inter = Inter({ subsets: ["latin"] });

const IndexPage = () => {

  useEffect(() => {
    if (typeof window === "undefined") return;
    const jwt = localStorage.getItem("jwt");
    if (!jwt ) {
      router.replace("/auth");
    }
    else {
      const decoded = decode(jwt);
      // if (decoded.exp < Date.now() / 1000) {
      //   router.replace("/auth");
      // }
      //const endpoint = API_URL + 
      // renew: gui header ['authorization'], value: 'Bearer ' + jwt 
    }
  }, []);

  return (
        <Homepage />
  );
}

export default IndexPage;
