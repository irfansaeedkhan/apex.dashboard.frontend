"use client";
import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppRoutes } from "@/constants/app-routes";
import { Button } from "@/components/shared";
import EmailSent from "@/components/passwords/email-sent";
import { getResetPasswordLink } from "@/lib/auth/get-reset-password-link";
import { CgSpinner } from "react-icons/cg";

interface IFormInput {
  email: string;
}

const ForgotPassword = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [isLoading, setIsLoading] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email } = data;
    setIsLoading("loading");
    try {
      await getResetPasswordLink(email);
      setEmailSent(true);
      setIsLoading("success");
    } catch (error) {
      setIsLoading("loaded");
      console.log(error);
    }
  };

  return emailSent ? (
    <EmailSent
      title="Check your email"
      description={`An email has been sent to ${watch("email")} with instructions to reset your password.`}
    />
  ) : (
    <div className="flex w-full max-w-[566px] flex-col gap-4 px-6">
      <div className="mt-8 flex flex-col items-center justify-center gap-3">
        <h2 className="text-blue-shade-1 font-bai-jamjuree text-[34px] font-medium leading-[42px]">
          Forgot Password
        </h2>
        <span className="text-blue-shade-1/60 text-center text-base font-medium leading-[25px] tracking-[-0.324px]">
          Enter your email below, you will receive an email with instructions on
          how to reset your password in a few minutes. You can also set a new
          password if you&apos;ve never set one before.
        </span>
      </div>
      <div className="mx-auto w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={clsx(inputMain, "gap-4")}>
            <div className={inputMain}>
              <input
                autoComplete="off"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                })}
                className={clsx(inputField, errors.email && "!border-red-500")}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-xs font-medium text-red-500">
                  {errors.email.type === "required"
                    ? "Email is required"
                    : "Invalid email address"}
                </p>
              )}
            </div>
            <Button
              type="submit"
              title="Send Instructions"
              disabled={
                isLoading === "loading" || errors.email || watch("email") === ""
                  ? true
                  : false
              }
              loaderIcon={
                isLoading === "loading" && (
                  <CgSpinner className="mx-auto size-5 animate-spin" />
                )
              }
            />
          </div>
        </form>
      </div>
      <div className="text-blue-shade-1 flex justify-center gap-0.5 text-sm">
        <span className="text-blue-shade-1/80">Back to</span>
        <Link
          href={AppRoutes.auth.login}
          className="cool-link cursor-pointer font-semibold"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;

const inputMain = "flex flex-col gap-0.5";
const inputField =
  "border-gray-shade-1/1 focus:border-blue-shade-1 rounded-[14px] border px-[18px] py-[14px] focus:outline-none focus:ring-0 text-blue-shade-1 text-sm";
