"use client";

import React, { useState } from "react";
import { Header, Sidebar } from "@/components/dashboard";
import { HeaderTitleSmallScreen } from "@/components/dashboard/header-title-small-screen";
import { FloatingMenue } from "@/components/dashboard/floating-menue";
import { ProfileCommonTop } from "@/components/profile";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggle, SetToggle] = useState(false);
  return (
    <div className="relative flex h-auto min-h-dvh">
      <Sidebar toggle={toggle} setToggle={SetToggle} />
      {/* <FloatingMenue /> */}
      <div className="flex w-full flex-col bg-white-shade-1">
        <Header toggle={toggle} setToggle={SetToggle} />
        <div className="max-h-[calc(100vh-64px)] w-full overflow-y-auto pb-20 md:pb-0">
          <ProfileCommonTop />
          <div className="mx-auto w-full max-w-[1081px] p-4 sm:p-6 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
