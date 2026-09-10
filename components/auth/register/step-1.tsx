"use client";

import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { AppRoutes } from "@/constants/app-routes";

export const Step1: React.FC<any> = ({ formMethods }) => {
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <div className={clsx(inputMain, "gap-4")}>
      <div className={inputMain}>
        <input
          autoFocus
          autoComplete="off"
          className={clsx(inputField)}
          placeholder="Email"
          type="email"
          id="email"
          required
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid email address",
            },
            maxLength: {
              value: 50,
              message: "Email cannot exceed 50 characters",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className={inputMain}>
        <input
          autoComplete="off"
          className={clsx(inputField)}
          placeholder="Name"
          type="text"
          required
          id="name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters long",
            },
            maxLength: {
              value: 50,
              message: "Name cannot exceed 50 characters",
            },
          })}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className={inputMain}>
        <input
          autoComplete="off"
          className={clsx(inputField)}
          placeholder="Surname"
          type="text"
          id="surname"
          {...register("surname", {
            required: "Surname is required",
            minLength: {
              value: 2,
              message: "Surname must be at least 2 characters long",
            },
            maxLength: {
              value: 50,
              message: "Surname cannot exceed 50 characters",
            },
          })}
          required
        />
        {errors.surname && (
          <p className="mt-1 text-xs text-red-500">{errors.surname.message}</p>
        )}
      </div>
      <div className={inputMain}>
        <input
          autoComplete="off"
          className={clsx(inputField)}
          placeholder="Referral Code"
          type="text"
          required
          id="referral_code"
          {...register("referral_code", {
            required: "Referral code is required",
            maxLength: {
              value: 50,
              message: "Referral code cannot exceed 50 characters",
            },
          })}
        />
        {errors.referral_code && (
          <p className="mt-1 text-xs text-red-500">
            {errors.referral_code.message}
          </p>
        )}
      </div>
      <div className={inputMain}>
        <label className={`${inputLabel} text-blue-shade-1/80`}>
          By proceeding, you agree to Apex&apos;s{" "}
          <Link
            href={AppRoutes.privacy_policy}
            className="cool-link cursor-pointer font-semibold"
          >
            Terms of Use & Privacy Policy.
          </Link>
        </label>
      </div>
    </div>
  );
};

const inputMain = "flex flex-col";
const inputLabel = "text-xs font-medium text-blue-shade-1 pb-1";
const inputField =
  "border-gray-shade-1/1 focus:border-blue-shade-1 rounded-[14px] border px-[18px] py-[14px] focus:outline-none focus:ring-0 text-blue-shade-1 text-sm";
