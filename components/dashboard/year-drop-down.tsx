"use client";
import clsx from "clsx";
import React, { useRef, useState } from "react";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { useOnClickOutside } from "usehooks-ts";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue?: string;
  onSelect: (label: string) => void;
  error?: string;
  placeholder: string;
}

export const YearDropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue = "",
  onSelect,
  error,
  placeholder,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: DropdownOption) => {
    onSelect(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  const selectedLabel = selectedOption ? selectedOption.label : "";

  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setIsOpen(false));

  return (
    <div className="relative w-full max-w-[120px] flex-grow" ref={ref}>
      <div
        className={clsx(
          "text-blue-shade-1 w-full max-w-[120px] cursor-pointer rounded-md border px-2 py-1 text-sm focus:outline-none",
          isOpen ? "border-blue-shade-1" : "border-gray-shade-1/10",
          error ? "border-red-500" : "",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span
            className={clsx(
              "word-break",
              selectedLabel === "" && "text-gray-shade-1/20",
            )}
          >
            {selectedLabel === "" ? placeholder : selectedLabel}
          </span>
          {isOpen ? (
            <SlArrowUp className="size-3 fill-gray-400" />
          ) : (
            <SlArrowDown className="size-3 fill-gray-400" />
          )}
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
      {isOpen && (
        <ul className="text-blue-shade-1 absolute z-50 mt-2 flex max-h-[200px] w-full flex-col items-center justify-center overflow-y-auto rounded-md  border bg-white shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              className={clsx(
                "word-break w-full cursor-pointer px-2  py-1 text-sm hover:bg-[#F3F3F3]",
                option.value === selectedValue ? "bg-[#F3F3F3]/80" : "",
              )}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
