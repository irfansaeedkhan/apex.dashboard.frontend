"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { Logout } from "@/assets/svgs";
import { SidebarData } from "./sidebar-data";
import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import toast from "react-hot-toast";
import { AppRoutes } from "@/constants/app-routes";
import { SidebarContext } from "./sidebar-context";
import cn from "@/utils/cn";
import { FaCircleUser } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

export const Sidebar = ({ toggle, setToggle }: any) => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();
  const { logout } = useAuthStore((state) => state.actions);

  const logoutHandler = async () => {
    try {
      logout();
      toast.success("Logged out successfully");
      router.push(AppRoutes.auth.login);
    } catch (error) {
      router.push(AppRoutes.auth.login);
    }
  };

  const handleClose = () => {
    setToggle(false);
  };

  return (
    <div className="overflow-x-hidden lg:overflow-visible">
      {/* desktop */}
      <div className="relative hidden min-h-dvh w-full flex-shrink-0 flex-col justify-between bg-blue-shade-1 pl-8 pr-12 lg:flex lg:w-[300px]">
        <div className="flex flex-col items-center lg:items-start">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={44}
            height={44}
            className="mt-5 h-11 w-auto shrink-0 cursor-pointer object-contain"
            onClick={() => router.push(AppRoutes.dashboard.index)}
          />
          <div className="mt-20 w-full">
            {SidebarData.map((item) => (
              <Link
                href={item.link}
                key={item.link}
                className={clsx(
                  "group flex items-center justify-center gap-4 rounded-2xl px-[22px] py-[14px] lg:justify-start lg:px-6 lg:py-4",
                  pathname === item.link ? "bg-white" : "bg-transparent",
                )}
              >
                <item.icon
                  className={clsx(
                    "size-5 flex-shrink-0",
                    pathname === item.link
                      ? "fill-black-shade-2"
                      : "fill-gray-shade-5",
                  )}
                />
                <p
                  className={clsx(
                    "flex-shrink-0 text-sm font-medium lg:block",
                    pathname === item.link
                      ? "text-black"
                      : "lg:group-hover:cool-link-green text-gray-shade-1",
                  )}
                >
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center lg:justify-start">
          <div className="mb-16">
            <label className="px-6 text-xs font-medium uppercase text-gray-shade-1/80">
              Action
            </label>
            <div
              onClick={logoutHandler}
              className="mt-4 flex cursor-pointer items-center gap-2 px-6 text-sm font-medium text-gray-shade-1"
            >
              <Logout
                className={clsx("size-5 flex-shrink-0 stroke-gray-shade-1")}
              />
              <span className="flex-shrink-0 text-sm font-medium lg:block">
                Log out
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* mobile */}
      <SidebarContext.Provider value={{ isOpen, setIsOpen: setIsOpen }}>
        <div className={`overflow-x-hidden lg:overflow-visible`}>
          <div
            className={cn(
              `absolute top-0 z-[2000] flex h-dvh w-full flex-shrink-0 flex-col justify-between bg-blue-shade-1 pl-8 pr-12 transition-all duration-300 ease-linear lg:hidden lg:w-[300px]`,
              !toggle ? "left-[-110%]" : "left-[0%]",
            )}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-6 top-6"
            >
              <FaTimes className="size-6 text-gray-shade-1" />
            </button>
            <div className="flex h-full flex-col justify-between">
              <div className="flex flex-col">
                <div className="flex items-center justify-center gap-4 pt-20">
                  <Link
                    href={AppRoutes.profile.my_profile}
                    className="flex flex-col items-center"
                  >
                    {/* <Image
                      src="/images/dummy-image.png"
                      width={80}
                      height={80}
                      alt="profile"
                      className="w-20 rounded-full"
                    /> */}
                    <FaCircleUser className="size-20 shrink-0 text-white" />
                    <h3 className="pt-4 font-inter text-xl font-semibold text-white">
                      {user?.Name ?? ""}
                      {" " + (user?.Surname ?? "")}
                    </h3>
                    <span
                      className={clsx(
                        "flex-shrink-0 pt-1 text-sm font-medium",
                        pathname === AppRoutes.profile.my_profile
                          ? "border-b text-white"
                          : "text-gray-shade-1",
                      )}
                    >
                      View Profile
                    </span>
                  </Link>
                </div>

                <hr className="mb-14 mt-9 h-px border-0 bg-white" />
                <div className="flex flex-col items-center lg:items-start">
                  <div className="mx-auto flex w-full flex-col items-start justify-center gap-2">
                    {SidebarData.map((item) => (
                      <Link
                        href={item.link}
                        key={item.link}
                        className={clsx(
                          "group flex w-full items-start justify-start gap-4 rounded-full px-6 py-4",
                          pathname === item.link
                            ? "bg-white"
                            : "bg-transparent",
                        )}
                        onClick={() => {
                          setToggle(false);
                        }}
                      >
                        <item.icon
                          className={clsx(
                            "size-5 flex-shrink-0",
                            pathname === item.link
                              ? "fill-black-shade-2"
                              : "fill-gray-shade-5",
                          )}
                        />
                        <p
                          className={clsx(
                            "flex-shrink-0 text-sm font-medium lg:block",
                            pathname === item.link
                              ? "text-black"
                              : "lg:group-hover:cool-link-green text-gray-shade-1",
                          )}
                        >
                          {item.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start">
                <div className="mb-10">
                  <label className="px-6 text-xs font-medium uppercase text-gray-shade-1/80">
                    Action
                  </label>
                  <div
                    onClick={logoutHandler}
                    className="mt-4 flex cursor-pointer items-center gap-2 px-6 text-sm font-medium text-gray-shade-1"
                  >
                    <Logout
                      className={clsx(
                        "size-5 flex-shrink-0 stroke-gray-shade-1",
                      )}
                    />
                    <span className="flex-shrink-0 text-sm font-medium lg:block">
                      Log out
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
};
