"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/constants/app-routes";

export const LogoLink = () => {
  const router = useRouter();
  return (
    <Image
      src="/images/logo-dark.svg"
      alt="logo"
      width={100}
      height={44}
      className="flex size-11 flex-shrink-0 cursor-pointer object-cover"
      onClick={() => router.push(AppRoutes.dashboard.index)}
    />
  );
};
