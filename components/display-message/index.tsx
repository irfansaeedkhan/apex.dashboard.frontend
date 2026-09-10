import { AppRoutes } from "@/constants/app-routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../shared";

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const DisplayMessage: React.FC<Props> = ({ title, description, children }) => {
  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center">
      <div className="flex h-auto min-h-screen w-full items-center justify-center">
        <div className="mx-4 flex w-full max-w-[566px] flex-col items-center gap-8 rounded-3xl border border-black-shade-1/[12%] p-8 sm:mx-0">
          <Image
            src="/images/logo-dark.svg"
            alt="email sent"
            width={64}
            height={64}
            className="h-16 w-auto object-contain"
          />
          <div className="flex flex-col gap-6">
            <h2 className="text-center font-bai-jamjuree text-xl font-semibold leading-normal text-blue-shade-1 md:text-[34px]">
              {title}
            </h2>
            <p className="font-inter text-center text-sm font-medium text-gray-shade-1 md:text-base">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DisplayMessage;
