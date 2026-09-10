"use client";
import React from "react";
import { usePathname } from "next/navigation";
import LeftSide from "./left-side";

export const LayoutComponent = () => {
  const pathname = usePathname();
  return (
    <div className="hidden h-auto min-h-screen w-1/2 lg:block">
      <LeftSide page_name={pathname.includes("login") ? "login" : "register"} />
    </div>
  );
};
