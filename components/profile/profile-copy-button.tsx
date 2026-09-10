"use client";
import React from "react";
import toast from "react-hot-toast";
import { copyText } from "@/utils/copy-text";

interface Props {
  value: string;
}

export const ProfileCopyButton: React.FC<Props> = ({ value }) => {
  return (
    <div
      className="cursor-pointer rounded-full border border-black-shade-1/[0.12] bg-black-shade-5 px-3 py-1 text-[11px] font-medium text-white"
      onClick={() => {
        copyText(value);
        toast.success("Copied to clipboard");
      }}
    >
      Copy
    </div>
  );
};
