import React from "react";
import Link from "next/link";
import { AppRoutes } from "@/constants/app-routes";
import { Button } from "../shared";

interface Props {
  title: string;
  description: string;
}

const EmailSent: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="flex w-full max-w-[566px] flex-col gap-12 px-6">
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-blue-shade-1 font-bai-jamjuree text-[34px] font-medium leading-[42px]">
          {title}
        </h2>
        <span className="text-blue-shade-1/60 text-center text-base font-medium leading-[25px] tracking-[-0.324px]">
          {description}
        </span>
      </div>

      <Link href={AppRoutes.auth.login} className="w-full">
        <Button type="submit" title="Go to login" className="w-full" />
      </Link>
    </div>
  );
};

export default EmailSent;
