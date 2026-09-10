import React, { Suspense } from "react";
import Link from "next/link";
import { AppRoutes } from "@/constants/app-routes";
import { RegisterForm } from "@/components/auth/register/register-form";
import { CgSpinner } from "react-icons/cg";

const Register = () => {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center backdrop-blur-[4px] backdrop-filter">
          <CgSpinner className="mx-auto mt-20 size-14 animate-spin text-blue-shade-1" />
        </div>
      }
    >
      <div className="flex w-full flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="font-bai-jamjuree text-[34px] font-medium leading-[42px] text-blue-shade-1">
            Create Account
          </h2>
          <span className="text-lg font-medium leading-[25px] tracking-[-0.324px] text-blue-shade-1/60">
            Sign up to Apex
          </span>
        </div>
        <div className="mx-auto w-full max-w-[566px] px-6">
          <RegisterForm />
        </div>
        <div className="flex justify-center gap-0.5 pb-6 text-sm text-blue-shade-1">
          <span className="text-blue-shade-1/80">
            I already have an account?
          </span>
          <Link
            href={AppRoutes.auth.login}
            className="cool-link cursor-pointer font-semibold"
          >
            Login
          </Link>
        </div>
      </div>
    </Suspense>
  );
};

export default Register;
