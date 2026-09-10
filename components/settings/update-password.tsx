import { PasswordProtectionIcon } from "@/assets/svgs";
import clsx from "clsx";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Button } from "../shared";
import { UpdatePasswordApi } from "@/lib/auth/update-password";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/auth.store";
import moment from "moment";
import {
  calculatePasswordStrength,
  PasswordStrengthMeter,
} from "../auth/register/strength-meter";

interface IFormInput {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{12,}$/;

interface Props {
  getProfileData: () => void;
}

export const UpdatePassword: React.FC<Props> = ({ getProfileData }) => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading("loading");
    const { current_password, new_password, confirm_password } = data;
    try {
      await UpdatePasswordApi(current_password, new_password, confirm_password);
      Object.keys(data).forEach((key) => {
        data[key as keyof IFormInput] = "";
      });
      getProfileData();
      toast.success("Password updated successfully");
      setErrorMessage("");
      reset();
      setIsLoading("success");
    } catch (error: any) {
      setIsLoading("error");
      setErrorMessage(error.message);
      toast.error("Failed to update password");
    }
  };
  const newPassword = watch("new_password");
  const passwordStrength = calculatePasswordStrength(newPassword);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex w-full max-w-[276px] gap-5">
        <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-full border border-gray-shade-1/10 bg-transparent">
          <PasswordProtectionIcon />
        </div>
        <div className="w-full">
          <h1 className="text-sm font-semibold tracking-[-0.28px] text-blue-shade-1">
            Account password
          </h1>
          <p className="text-xs font-medium tracking-[-0.28px] text-blue-shade-1 opacity-60">
            Last updated{" "}
            {moment(user?.PasswordResetAt).startOf("day").fromNow()}
          </p>
        </div>
      </div>
      <div className="w-full flex-grow">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={clsx(inputMain, "gap-4")}>
            <div className={inputMain}>
              <div
                className={clsx(
                  "flex items-center",
                  passwordField,
                  errors.current_password && "!border-red-500",
                )}
              >
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  {...register("current_password", {
                    required: true,
                  })}
                  className="w-full flex-grow bg-transparent focus:outline-none focus:ring-0"
                  placeholder="Current Password"
                />
                <span
                  className="flex size-5 flex-shrink-0 cursor-pointer items-center justify-center"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <FaRegEye className="size-[18px]" />
                  ) : (
                    <FaRegEyeSlash className="size-[18px]" />
                  )}
                </span>
              </div>
              {errors.current_password && (
                <p className="text-xs font-medium text-red-500">
                  {errors.current_password.message}
                </p>
              )}
            </div>
            <div className={inputMain}>
              <div
                className={clsx(
                  "flex items-center",
                  passwordField,
                  errors.new_password && "!border-red-500",
                )}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("new_password", {
                    required: "New Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must include upper, lower, number, and special character",
                    },
                  })}
                  className="w-full flex-grow bg-transparent focus:outline-none focus:ring-0"
                  placeholder="New Password"
                />
                <span
                  className="flex size-5 flex-shrink-0 cursor-pointer items-center justify-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaRegEye className="size-[18px]" />
                  ) : (
                    <FaRegEyeSlash className="size-[18px]" />
                  )}
                </span>
              </div>
              {errors.new_password && (
                <p className="text-xs font-medium text-red-500">
                  {errors.new_password.message}
                </p>
              )}
            </div>
            <div className={inputMain}>
              <div
                className={clsx(
                  "flex items-center",
                  passwordField,
                  errors.confirm_password && "!border-red-500",
                )}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirm_password", {
                    required: "Confirming password is required",
                    validate: (value: any) =>
                      value === watch("new_password") ||
                      "Passwords do not match",
                  })}
                  className="w-full flex-grow bg-transparent focus:outline-none focus:ring-0"
                  placeholder="Confirm Password"
                />
                <span
                  className="flex size-5 flex-shrink-0 cursor-pointer items-center justify-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaRegEye className="size-[18px]" />
                  ) : (
                    <FaRegEyeSlash className="size-[18px]" />
                  )}
                </span>
              </div>
              {errors.confirm_password && (
                <p className="text-xs font-medium text-red-500">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
            <PasswordStrengthMeter strength={passwordStrength} />
            {errorMessage && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errorMessage}
              </p>
            )}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-fit"
                variant="secondary"
                title="Save"
                loaderIcon={
                  isLoading === "loading" && (
                    <CgSpinner className="mx-auto size-5 animate-spin" />
                  )
                }
                disabled={
                  errors.current_password ||
                  watch("current_password") === "" ||
                  errors.new_password ||
                  watch("new_password") === "" ||
                  watch("confirm_password") === "" ||
                  errors.confirm_password ||
                  isLoading === "loading"
                    ? true
                    : false
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const inputMain = "flex flex-col gap-1";
const passwordField =
  "border-gray-shade-1/1 focus-within:border-blue-shade-1 rounded-[14px] border px-[18px] py-[14px] focus-within:outline-none focus-within:ring-0 text-blue-shade-1 text-sm";
