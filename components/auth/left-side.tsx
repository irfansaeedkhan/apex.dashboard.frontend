"use client";
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/constants/app-routes";

interface Props {
  page_name: "login" | "register";
}

const LeftSide: React.FC<Props> = ({ page_name }) => {
  const router = useRouter();
  return (
    <div className="relative h-full w-full bg-[#0f0f0f] px-10">
      <div
        className={clsx(
          "h-full bg-contain bg-center bg-no-repeat",
          page_name === "login" && "bg-[url(/images/login.png)]",
          page_name === "register" && "bg-[url(/images/register.png)]",
        )}
      >
        <div className="absolute left-0 top-0 flex h-20 items-center pl-12">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={176}
            height={176}
            className="flex size-11 flex-shrink-0 cursor-pointer object-cover"
            onClick={() => router.push(AppRoutes.dashboard.index)}
          />
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
