import React, { HTMLAttributes } from "react";
import cn from "@/utils/cn";

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  element: "tb" | "th";
}

export const TableRow: React.FC<TableRowProps> = ({ className, ...props }) => {
  if (props.element === "th") {
    return (
      <tr
        className={cn(
          "max-w-full flex-grow border-b border-black-shade-1/[12%] text-left text-sm text-white",
          className,
        )}
        {...props}
      />
    );
  }
  return (
    <tr
      className={cn(
        "max-w-full flex-grow border-b border-black-shade-1/[12%] bg-white-shade-1 text-left text-sm text-white last:border-none",
        className,
      )}
      {...props}
    />
  );
};

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  element: "td" | "th";
}

export const TableCell: React.FC<TableCellProps> = ({
  element,
  className,
  ...props
}) => {
  if (element === "th") {
    return (
      <th
        className={cn(
          className,
          "w-[200px] flex-shrink-0 px-6 py-3 font-semibold",
        )}
        {...props}
      />
    );
  }
  return (
    <td
      className={cn("w-[200px] flex-shrink-0 px-6 py-4 font-medium", className)}
      {...props}
    />
  );
};
