import Image from "next/image";
import React, { useState, useRef } from "react";
import { NetworkOption } from "./profile-card-data";

type Props = {
  items: NetworkOption[];
  onSelect: (item: NetworkOption) => void;
};

const Dropdown: React.FC<Props> = ({ items, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState(items[0].value);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLButtonElement>(null);

  /**
 * 
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as HTMLElement)
    ) {
      setIsOpen(false);
    }
  };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    
  // const splitLabel = (label: string): string[] => {
  //   // Split the label based on a delimiter (adjust as needed)
  //   const parts = label.split(" ");
  //   return parts;
  // };
 * 
 * 
 */

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: NetworkOption) => {
    setSelectedValue((prevValue) => {
      return item.value;
    });
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-blue-shade-1/10 p-3 hover:bg-blue-shade-1/5 focus:outline-none"
        onClick={toggleDropdown}
        ref={dropdownRef}
      >
        <div className="flex items-center">
          <div className="relative mr-2 size-7">
            {items.find((option) => option.value === selectedValue)?.icon1 && (
              <Image
                src={
                  items.find((option) => option.value === selectedValue)
                    ?.icon1 || "/images/placeholder.png"
                }
                alt="usdt"
                width={28}
                height={28}
                className="size-7 flex-shrink-0"
              />
            )}
            {items.find((option) => option.value === selectedValue)?.icon1 && (
              <Image
                src={
                  items.find((option) => option.value === selectedValue)
                    ?.icon2 || "/images/placeholder.png"
                }
                alt="usdt"
                width={14}
                height={14}
                className="absolute -right-1 bottom-0 w-[0.86rem] flex-shrink-0"
              />
            )}
          </div>
          {items.find((option) => option.value === selectedValue)?.label && (
            <span className="flex flex-wrap text-sm">
              <span className="font-medium text-blue-shade-1">
                {items.find((option) => option.value === selectedValue)
                  ?.label || ""}
              </span>
              <span className="ml-1 rounded-md bg-gray-shade-1/10 px-2 py-0.5 text-xs text-gray-shade-1">
                {items.find((option) => option.value === selectedValue)
                  ?.network || ""}
              </span>
            </span>
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
        >
          <g opacity="0.5">
            <path
              d="M14.042 5.83333L8.50033 11.375L2.95866 5.83333"
              stroke="#00020A"
              strokeWidth="1.58333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </button>
      <ul
        className={`absolute left-0 top-full z-[100] w-full cursor-pointer overflow-hidden rounded-md bg-white shadow-md ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {items.map((item: NetworkOption) => (
          <li
            key={item.value}
            className="relative z-50 px-3 py-2 text-left hover:bg-gray-100"
            onClick={() => handleSelect(item)}
          >
            <span className="flex items-center">
              <div className="relative mr-2 size-7">
                <Image
                  src={item.icon1}
                  alt="usdt"
                  width={28}
                  height={28}
                  className="size-7 flex-shrink-0"
                />
                <Image
                  src={item.icon2}
                  alt="usdt"
                  width={14}
                  height={14}
                  className="absolute -right-1 bottom-0 w-[0.86rem] flex-shrink-0"
                />
              </div>
              <span className="flex flex-wrap text-sm">
                <span className="font-medium text-blue-shade-1">
                  {item?.label}
                </span>
                <span className="ml-1 rounded-md bg-gray-shade-1/10 px-2 py-0.5 text-xs text-gray-shade-1">
                  {item?.network}
                </span>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
