"use client;";

import { Inter } from "next/font/google";
import Homepage from "./homepage";
import { useEffect } from "react";
import router  from "next/router";
import { decode } from "@/helper/decode_jwt";
import { AUTH_URL, JWT_LOCAL_STORAGE_KEY } from "@/config";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

const IndexPage = () => {

  useEffect(() => {

    if (typeof window === "undefined") return;
    const jwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    if (!jwt ) {
      router.replace("/auth");
    }
    else {
      const decoded = decode(jwt);
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
        router.replace("/auth");
      }
      else {
        const role = decoded.role;
        if (role != "user") {
          router.replace("/auth");
        }
      }
    }
  }, []);

  return (
        <Homepage />
  );
}

export default IndexPage;
