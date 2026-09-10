"use client";
import React from "react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login/login-form";
import { AppRoutes } from "@/constants/app-routes";

const Login = () => {
  return (
    <div className="flex w-full flex-col gap-12">
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="font-bai-jamjuree text-[34px] font-medium leading-[42px] text-blue-shade-1">
          Welcome back
        </h2>
        <span className="text-lg font-medium leading-[25px] tracking-[-0.324px] text-blue-shade-1/60">
          Log in with your credentials{" "}
        </span>
      </div>
      <div className="mx-auto w-full max-w-[566px] px-6">
        <LoginForm />
      </div>
      <div className="flex justify-center gap-0.5 text-sm text-blue-shade-1">
        <span className="text-blue-shade-1/80">New to Apex?</span>
        <Link
          href={AppRoutes.auth.register}
          className="cool-link cursor-pointer font-semibold"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
