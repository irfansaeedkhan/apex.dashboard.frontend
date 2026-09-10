"use client";
import clsx from "clsx";
import React, { useRef, useState, useEffect } from "react";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { useOnClickOutside } from "usehooks-ts";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue?: string;
  onSelect: (label: string) => void;
  error?: string;
  placeholder: string;
  enableFilter?: boolean;
}

export const CustomDropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue = "",
  onSelect,
  error,
  placeholder,
  enableFilter = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (enableFilter) {
      setFilteredOptions(
        options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm, options, enableFilter]);

  const handleOptionClick = (option: DropdownOption) => {
    onSelect(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  const selectedLabel = selectedOption ? selectedOption.label : "";

  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setIsOpen(false));

  return (
    <div className="relative" ref={ref}>
      <div
        className={clsx(
          "text-blue-shade-1 w-full cursor-pointer rounded-[14px] border px-4 py-4 text-sm focus:outline-none",
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
        <div className="custom-scrollbar absolute z-[500] mt-2 max-h-[200px] w-full overflow-y-auto rounded-2xl border border-gray-shade-3 bg-white text-black shadow-lg">
          {enableFilter && (
            <input
              type="text"
              className="w-full border-b border-gray-shade-3 px-4 py-2 outline-none"
              placeholder="Type to filter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={clsx(
                  "word-break cursor-pointer rounded-xl px-4 py-2 hover:bg-gray-shade-1/40",
                  option.value === selectedValue ? "bg-gray-shade-1/60" : "",
                )}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

const YourComponent = () => {
  const [formState, setFormState] = useState({
    step_2nd: {
      country: "",
    },
  });

  const countries = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    // add more countries as needed
  ];

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  return (
    <div className="inputMain">
      <label className="inputLabel">Country</label>
      <CustomDropdown
        placeholder="Select Country"
        options={countries}
        selectedValue={formState.step_2nd.country}
        onSelect={(country: string) => {
          setFormState((prev) => ({
            ...prev,
            step_2nd: {
              ...prev.step_2nd,
              country: country,
            },
          }));
        }}
        enableFilter={true} // Enable filter for country selection
      />

      <label className="inputLabel">Gender</label>
      <CustomDropdown
        placeholder="Select Gender"
        options={genders}
        selectedValue={formState.step_2nd.country}
        onSelect={(gender: string) => {
          setFormState((prev) => ({
            ...prev,
            step_2nd: {
              ...prev.step_2nd,
              gender: gender,
            },
          }));
        }}
        enableFilter={false} // Disable filter for gender selection
      />
    </div>
  );
};

export default YourComponent;
