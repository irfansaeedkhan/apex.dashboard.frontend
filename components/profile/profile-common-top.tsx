"use client";
import { useAuthStore } from "@/stores/auth.store";
import React, { useCallback, useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Button } from "../shared";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { AppRoutes } from "@/constants/app-routes";
import Link from "next/link";
import { EditIcon } from "@/assets/svgs";
import { getProfileDataApiResponseType } from "./profile-card-data";
import { getProfile } from "@/lib/auth/get-profile";

export const ProfileCommonTop = () => {
  const [profileData, setProfileData] =
    useState<getProfileDataApiResponseType>();
  const { user } = useAuthStore();
  const pathname = usePathname();

  const getProfileData = useCallback(async () => {
    try {
      const res = await getProfile();
      setProfileData(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  return (
    <div className="mt-2 flex flex-col gap-9 bg-white p-4 !pt-16 sm:p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FaCircleUser className="size-16" />
          <div>
            <h3 className="font-inter text-2xl font-semibold">
              {profileData?.Name ?? ""}
              {" " + (profileData?.Surname ?? "")}
            </h3>
            {/* <p className="text-sm font-medium text-blue-shade-1 opacity-60">
            Tech Master in Block line 🤫
          </p> */}
          </div>
        </div>
        <Link
          className="block md:hidden"
          href="/profile-settings?tab=personal_info"
        >
          <button className="w-fit rounded-lg border border-gray-400/40 p-2">
            <EditIcon />
          </button>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <Link href={AppRoutes.profile.my_profile}>
            <Button
              className={clsx(
                "w-fit !rounded-full border-gray-400/40 px-4 font-bai-jamjuree text-blue-shade-1 opacity-90 md:py-2 md:text-sm [&>span]:text-xs",
                pathname === AppRoutes.profile.my_profile &&
                  "border !border-blue-shade-1",
              )}
              variant="secondary"
              title="Profile"
              borderRounded="48px"
            />
          </Link>
          <Link href={AppRoutes.profile.my_invoice}>
            <Button
              className={clsx(
                "w-fit !rounded-full border-gray-400/40 px-4 font-bai-jamjuree text-blue-shade-1 opacity-90 md:py-2 md:text-sm [&>span]:text-xs",
                pathname === AppRoutes.profile.my_invoice &&
                  "border !border-blue-shade-1",
              )}
              variant="secondary"
              title="My Invoice"
            />
          </Link>
          <Link href={AppRoutes.profile.terms}>
            <Button
              className={clsx(
                "w-fit !rounded-full border-gray-400/40 px-4 font-bai-jamjuree  text-blue-shade-1 opacity-90 md:py-2 md:text-sm [&>span]:text-xs",
                pathname === AppRoutes.profile.terms &&
                  "border !border-blue-shade-1",
              )}
              variant="secondary"
              title="Terms and conditions"
            />
          </Link>
        </div>
        {pathname === AppRoutes.profile.my_profile && (
          <Link
            href="/profile-settings?tab=personal_info"
            className="hidden md:block"
          >
            <Button
              className={clsx(
                "w-fit !rounded-full border !border-blue-shade-1 border-gray-400/40 px-4 font-bai-jamjuree  text-blue-shade-1 opacity-90 md:py-2 md:text-sm [&>span]:text-xs",
              )}
              variant="secondary"
              title="Edit Profile"
            />
          </Link>
        )}
      </div>
    </div>
  );
};
