import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import countryList from "react-select-country-list";
import clsx from "clsx";
import { CustomDropdown } from "@/components/shared";
import "react-phone-number-input/style.css";

export const Step2: React.FC<any> = ({ formMethods }) => {
  const countries = useMemo(() => countryList().getData(), []);
  const { setValue, watch } = useFormContext();

  const {
    register,
    formState: { errors },
  } = formMethods;

  const country_code = watch("country_code");
  const phoneNumber = watch("phone_number");

  return (
    <div className="flex flex-col gap-4">
      <div className={inputMain}>
        <CustomDropdown
          placeholder="Select Country"
          enableFilter={true}
          options={countries}
          selectedValue={country_code}
          {...register("country_code", {
            required: "Country is required",
            maxLength: {
              value: 50,
              message: "Country cannot exceed 50 characters",
            },
          })}
          onSelect={(country_code: string) => {
            setValue("country_code", country_code);
          }}
          // error={errors?.country_code?.message}
        />
        {errors.country_code && (
          <p className="mt-1 text-xs text-red-500">
            {errors.country_code.message}
          </p>
        )}
      </div>

      <div className={inputMain}>
        <PhoneInput
          placeholder="Enter phone number"
          value={phoneNumber}
          id="phone_number"
          {...register("phone_number", {
            required: "Phone number is required",
            maxLength: {
              value: 50,
              message: "Phone number cannot exceed 50 characters",
            },
            // pattern: {
            //   value: /^\+?[1-9]\d{1,14}$/,
            //   message: "Invalid phone number",
            // },
          })}
          onChange={(value) => {
            setValue("phone_number", value);
          }}
          className={clsx(
            inputField,
            "focus:[&>input]:border-0 focus:[&>input]:outline-none focus:[&>input]:ring-0",
          )}
        />
        {errors.phone_number && (
          <p className="mt-1 text-xs text-red-500">
            {errors.phone_number.message}
          </p>
        )}
      </div>
    </div>
  );
};
const inputMain = "flex flex-col";
const inputLabel = "text-xs font-medium text-blue-shade-1";
const inputField =
  "border-blue-shade-1/1 focus-within:border-blue-shade-1 rounded-[14px] border px-[18px] py-[14px] focus-within:outline-none focus-within:ring-0 text-blue-shade-1 text-sm";
