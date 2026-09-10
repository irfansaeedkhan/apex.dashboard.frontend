"use client";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export const HeaderTitleSmallScreen = () => {
  const pathname = usePathname();
  let path = pathname.split("/").pop();
  if (path === "") {
    path = "Dashboard";
  } else if (path?.includes("-")) {
    path = path?.split("-").join(" ");
    path = path!.charAt(0).toUpperCase() + path!.slice(1);
    // also capitalize next word first letter
    const index = path.indexOf(" ");
    path =
      path.slice(0, index + 1) +
      path.charAt(index + 1).toUpperCase() +
      path.slice(index + 2);
  } else {
    path = path!.charAt(0).toUpperCase() + path!.slice(1);
  }

  return (
    <h2
      className={clsx(
        "mb-5 block font-bai-jamjuree text-2xl font-semibold leading-8 sm:mb-6 md:mb-8 md:hidden",
        (pathname === "/my-profile" ||
          pathname === "/my-invoice" ||
          pathname === "/terms") &&
          "hidden",
      )}
    >
      {path}
    </h2>
  );
};
