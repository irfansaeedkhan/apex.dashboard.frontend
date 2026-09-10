"use client";
import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaCircleUser } from "react-icons/fa6";
import { useAuthStore } from "@/stores/auth.store";
import { AppRoutes } from "@/constants/app-routes";
import { SidebarContext } from "./sidebar-context";
import { FaTimes } from "react-icons/fa";
import { BurgerIcon } from "@/assets/svgs";

export const Header = ({ toggle, setToggle }: any) => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const router = useRouter();
  const { user } = useAuthStore();
  const pathname = usePathname();
  let path = pathname.split("/").pop();
  if (path === "") {
    path = "Dashboard";
  } else if (path?.includes("-")) {
    path = path?.split("-").join(" ");
    path = path!.charAt(0).toUpperCase() + path!.slice(1);
    // also capitalize next word first letter
    const index = path.indexOf(" ");
    path =
      path.slice(0, index + 1) +
      path.charAt(index + 1).toUpperCase() +
      path.slice(index + 2);
  } else {
    path = path!.charAt(0).toUpperCase() + path!.slice(1);
  }

  const handleClick = () => {
    setToggle((prev: any) => !prev);
  };
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen: setIsOpen }}>
      <div className="glassEffect backdrop-blur-[10px] backdrop-filter">
        <div className="flex h-16 w-full items-center justify-between px-4 py-3 lg:px-8">
          <h2 className="hidden font-bai-jamjuree text-[22px] font-semibold leading-8 md:block">
            {path}
          </h2>

          <Image
            src="/images/logo-dark.svg"
            alt="logo"
            width={1080}
            height={1055}
            className="flex w-10 flex-shrink-0 object-cover md:hidden"
            onClick={() => router.push(AppRoutes.dashboard.index)}
          />
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href={AppRoutes.profile.my_profile}
              className="flex items-center gap-2"
            >
              <h3 className="font-manrope text-sm font-semibold">
                {user?.Name ?? ""}
                {" " + (user?.Surname ?? "")}
              </h3>
              {/* <Image
                src="/images/dummy-image.png"
                width={40}
                height={40}
                alt="profile"
                className="w-10 rounded-full"
              /> */}
              <FaCircleUser className="size-10 shrink-0 text-blue-shade-1" />
            </Link>
          </div>
          <button className="block lg:hidden" onClick={handleClick}>
            <BurgerIcon />
          </button>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};
