"use client";

import React, { useState } from "react";
import { Header, Sidebar } from "@/components/dashboard";
import { HeaderTitleSmallScreen } from "@/components/dashboard/header-title-small-screen";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggle, SetToggle] = useState(false);
  return (
    <>
      <div className="relative flex h-auto min-h-dvh">
        <Sidebar toggle={toggle} setToggle={SetToggle} />
        {/* <FloatingMenue /> */}
        <div className="flex w-full flex-col bg-white-shade-1">
          <Header toggle={toggle} setToggle={SetToggle} />
          <div className="max-h-[calc(100vh-64px)] w-full overflow-y-auto pb-20 md:pb-0">
            <div className="mx-auto w-full max-w-[1096px] px-4 py-4 sm:px-6 sm:py-6 md:py-8">
              <HeaderTitleSmallScreen />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
