import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import clsx from "clsx";
import { useAuthStore } from "@/stores/auth.store";
import { AppRoutes } from "@/constants/app-routes";
import { Button } from "../../shared";
import { CgSpinner } from "react-icons/cg";
import { VerifyAccountPopup } from "./verify-account-popup";

interface IFormInput {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [verifyAccount, setVerifyAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore(useShallow((state) => state.actions));

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setErrorMessage("");
    setIsLoading("loading");
    if (data.email === "" || data.password === "") {
      setErrorMessage("Email and Password are required");
      setIsLoading("loaded");
      return;
    }

    try {
      await login(data.email, data.password);
      toast.success("Logged in successfully");
      router.push(AppRoutes.dashboard.index);
    } catch (error: any) {
      setIsLoading("loaded");
      // toast.error(error.message);
      setErrorMessage(error.message);
      if (error.message === "complete email verification first") {
        setVerifyAccount(true);
        setErrorMessage(" ");
      }
      console.log(error);
    }
  };

  return (
    <div className="w-full">
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
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-xs font-medium text-red-500">
                {errors.email.type === "required"
                  ? "Email is required"
                  : "Invalid email address"}
              </p>
            )}
          </div>
          <div className={inputMain}>
            <div
              className={clsx(
                "flex items-center",
                passwordField,
                errors.password && "!border-red-500",
              )}
            >
              <input
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                className="w-full flex-grow bg-transparent focus:outline-none focus:ring-0"
                placeholder="Password"
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
          </div>
          <div className="flex w-full justify-end">
            <Link
              href={AppRoutes.passwords.forgot_password}
              className="cool-link-green text-sm text-blue-shade-1"
            >
              Forgot Password
            </Link>
          </div>
          <span className="text-xs text-red-shade-2">{errorMessage}</span>
          <Button
            type="submit"
            title="Login"
            loaderIcon={
              isLoading === "loading" && (
                <CgSpinner className="mx-auto size-5 animate-spin" />
              )
            }
            disabled={
              errors.email ||
              errors.password ||
              watch("email") === "" ||
              watch("password") === "" ||
              isLoading === "loading"
                ? true
                : false
            }
          />
        </div>
      </form>
      <VerifyAccountPopup
        email={watch("email")}
        open={verifyAccount}
        onClose={() => setVerifyAccount(false)}
      />
    </div>
  );
};

const inputMain = "flex flex-col";
const inputField =
  "border-gray-shade-1/1 focus:border-blue-shade-1 rounded-[14px] border px-[18px] py-[14px] focus:outline-none focus:ring-0 text-blue-shade-1 text-sm";
const passwordField =
  "border-gray-shade-1/1 focus-within:border-blue-shade-1 rounded-[14px] border px-[18px] py-[14px] focus-within:outline-none focus-within:ring-0 text-blue-shade-1 text-sm";
