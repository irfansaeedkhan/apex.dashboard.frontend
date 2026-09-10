import React from "react";
import cn from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "tertiary"
    | "underline"
    | "pending"
    | "approved";

  IconStart?: React.ReactNode;
  IconEnd?: React.ReactNode;
  borderRounded?: string;
  backgroundColor?: string;
  loaderIcon?: React.ReactNode;
}
interface CustomCSSProperties extends React.CSSProperties {
  "--border-rounded": string;
  "--background-color": string;
}
export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  className,
  IconStart,
  IconEnd,
  loaderIcon,
  borderRounded = "14px",
  backgroundColor = "#BCE300",
  ...props
}) => {
  const customStyles: CustomCSSProperties = {
    "--border-rounded": borderRounded,
    "--background-color": backgroundColor,
  };

  return (
    <button
      className={cn(
        "relative flex min-w-max cursor-pointer items-center justify-center gap-2 rounded-[14px] px-3 py-2.5 text-sm font-medium transition duration-200 ease-in-out md:px-4 md:py-3 md:text-base md:font-semibold",
        variant === "primary" && "bg-blue-shade-1",
        variant === "secondary" &&
          "hover:bg-blue-shade-1 border border-[#00020A] bg-white shadow-[0px_1px_2px_0px_rgba(16_24_40_0.05)] hover:text-white",
        variant === "tertiary" && "bg-blue-shade-1 text-white",
        variant === "underline" &&
          "underline hover:text-[#00020A] [&>span]:font-semibold",
        variant === "pending" &&
          "rounded-full border border-red-shade-1 bg-red-shade-3 !px-3 !py-1 !text-xs text-[#FF6565]",
        variant === "approved" &&
          "border-blue-shade-1 bg-blue-shade-2 rounded-full border !px-3 !py-1 !text-xs text-[#839F00]",
        className && className,
        props.disabled && "cursor-not-allowed opacity-50",
      )}
      {...props}
      style={variant === "primary" ? customStyles : undefined}
      disabled={props.disabled}
    >
      {IconStart && IconStart}
      <span
        className={cn(
          "text-sm font-medium",
          variant === "primary" && "text-white",
          variant === "tertiary" && "text-xs",
        )}
      >
        {loaderIcon ? loaderIcon : title}
      </span>
      {IconEnd && IconEnd}
    </button>
  );
};
