"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  DashboardCards,
  TransactionTable,
  TransactionChart,
} from "@/components/dashboard";
import {
  DropdownOption,
  YearDropdown,
} from "@/components/dashboard/year-drop-down";
import { DashboardApiResponse } from "@/lib/auth";
import { useAuthStore } from "@/stores/auth.store";
import { CgSpinner } from "react-icons/cg";
import { TransactionChartMobile } from "@/components/dashboard/transaction-chart-mobile";
import { GetShowOrdersDetailsResponse } from "@/lib/auth/get-show-order-details";

import { TransactionTableMobile } from "@/components/dashboard/transaction-table-mobile";
import Countdown, { CountdownRendererFn } from "react-countdown";
import { CupIcon, TimerIcon } from "@/assets/svgs";
import { GetRewardListResponse } from "@/lib/auth/get-rewards-list";
import { getMockResponse } from "@/lib/mock-api";

const Dashboard = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [getOrdersDetailsData, setGetOrdersDetailsData] =
    useState<GetShowOrdersDetailsResponse>();
  const [dataYears, setDataYears] = useState<DropdownOption[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rewardListpage, setRewardListPage] = useState(1);
  const [rewardListTotalPages, setRewardListTotalPages] = useState(0);
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [dashboardData, setDashboardData] =
    useState<DashboardApiResponse | null>(null);
  const [rewardList, setRewardList] = useState<GetRewardListResponse>(null);
  const [graphData, setGraphData] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getDashboardDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = getMockResponse("Dashboard", "post", {
        data: { Page: page },
      }) as DashboardApiResponse;

      setDashboardData(res);
      setTotalPages(res?.Number_of_Pages || 1);
      const years = res.return_stats_arrays?.map((item) => item.year);
      if (years?.length) {
        const uniqueYears = Array.from(new Set(years));
        const dropdownOptions = uniqueYears.map((year) => ({
          value: year,
          label: year,
        }));
        setDataYears(dropdownOptions);
        setSelectedYear((current) =>
          uniqueYears.includes(current) ? current : uniqueYears[0],
        );
      } else {
        setDataYears([{ value: "2026", label: "2026" }]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (!dashboardData?.return_stats_arrays) return;
    const graph = dashboardData.return_stats_arrays.find(
      (item) => item.year === selectedYear,
    );
    setGraphData(graph?.percentages || []);
  }, [dashboardData, selectedYear]);

  const getOrdersDetails = useCallback(async () => {
    setLoading(true);
    try {
      setGetOrdersDetailsData({
        SinglePackCost: 1000,
        SinglePackDuration: 36,
        StartDate: "2024-07-03",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getRewardsListDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = getMockResponse("RevenuesHistory", "post", {
        data: { Page: rewardListpage },
      }) as GetRewardListResponse;
      setRewardList(res);
      setRewardListTotalPages(res?.Number_of_Pages || 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [rewardListpage]);

  useEffect(() => {
    getOrdersDetails();
    getDashboardDetails();
    getRewardsListDetails();
  }, [getDashboardDetails, getOrdersDetails, getRewardsListDetails]);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    const graphData = dashboardData?.return_stats_arrays?.find(
      (item) => item.year === year,
    );
    setGraphData(graphData?.percentages || []);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleRewardLlistNextPage = () => {
    if (rewardListpage < rewardListTotalPages) {
      setRewardListPage((prevPage) => prevPage + 1);
    }
  };

  const handleRewardlistPrevPage = () => {
    if (rewardListpage > 1) {
      setRewardListPage((prevPage) => prevPage - 1);
    }
  };

  // Countdown Renderer
  const getNext25thDate = () => {
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    // If today is past the 25th, set the target to the 25th of next month
    if (currentDate.getDate() > 25) {
      month += 1;
    }

    // Adjust the year if month exceeds December
    if (month > 11) {
      month = 0;
      year += 1;
    }

    // Set the target date to the 25th of the calculated month and year
    return new Date(year, month, 25, 0, 0, 0);
  };
  const CountdownRenderer: CountdownRendererFn = ({
    days,
    hours,
    minutes,
    seconds,
  }) => {
    return (
      <div className="flex w-full max-w-full items-center gap-1 overflow-hidden rounded-full border border-gray-400/40 bg-white-shade-1 text-xs lg:min-w-[345px] lg:max-w-max">
        <div className="flex flex-1 items-center gap-2 p-3">
          <TimerIcon /> <h6 className=" text-[#969699]">Next Rewards within</h6>
        </div>
        <div className="flex w-[13rem] flex-1 items-center justify-center gap-2 rounded-full bg-white p-3 sm:w-[13rem]">
          <CupIcon />
          <div className="flex items-center justify-center gap-1">
            <span className="font-bold text-black-shade-2">{days}D</span> :
            <span className="font-bold text-black-shade-2">{hours}H</span> :
            <span className="font-bold text-black-shade-2">{minutes}M</span> :
            <span className="font-bold text-black-shade-2">{seconds}S</span>
          </div>
        </div>
      </div>
    );
  };

  const targetDate = getNext25thDate();

  console.log("dashboardData--", dashboardData);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start justify-between gap-2 sm:gap-4 lg:flex-row lg:items-center lg:gap-8">
        <div className="flex-shrink-0 text-2xl">
          <p className="text-blue-shade-1">
            Hello and{" "}
            <span className="font-bold text-blue-shade-1">
              Welcome {user?.Name} Jhon 👋
            </span>
          </p>
        </div>
        {isMounted ? (
          <Countdown date={targetDate} renderer={CountdownRenderer} />
        ) : (
          <div className="flex w-full max-w-full items-center gap-1 overflow-hidden rounded-full border border-gray-400/40 bg-white-shade-1 text-xs lg:min-w-[345px] lg:max-w-max">
            <div className="flex flex-1 items-center gap-2 p-3">
              <TimerIcon />
              <h6 className="text-[#969699]">Next Rewards within</h6>
            </div>
            <div className="flex w-[13rem] flex-1 items-center justify-center gap-2 rounded-full bg-white p-3 sm:w-[13rem]">
              <CupIcon />
              <div className="flex items-center justify-center gap-1 font-bold text-black-shade-2">
                <span>--D</span> : <span>--H</span> : <span>--M</span> : <span>--S</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {dashboardData && rewardList && getOrdersDetailsData && (
        <DashboardCards
          dashboard_data={dashboardData}
          reward_list_data={rewardList}
          getMainCall={getDashboardDetails}
          handleRewardLlistNextPage={handleRewardLlistNextPage}
          handleRewardlistPrevPage={handleRewardlistPrevPage}
          rewardListpage={rewardListpage}
          getOrdersDetailsData={getOrdersDetailsData}
        />
      )}

      {
        graphData?.length ? (
          <div className="rounded-2xl bg-white pt-4 sm:px-6 sm:py-6">
            <div className="flex w-full items-center justify-between gap-4 px-4 pb-4 sm:px-0 sm:pb-8">
              <div className="hidden flex-col gap-1 sm:flex">
                <p className="text-xs font-medium text-gray-shade-1">
                  Overview of Balance
                </p>
                <p className="text-xl font-bold text-black-shade-3">
                  Monthly Revenue
                </p>
              </div>
              <h3 className="block text-lg font-bold text-black-shade-3 sm:hidden">
                Performance Overview
              </h3>
              <YearDropdown
                selectedValue={selectedYear}
                options={dataYears}
                placeholder="Year"
                onSelect={(year) => handleYearChange(year)}
              />
            </div>
            <div className="hidden w-full md:block">
              <TransactionChart graphData={graphData} />
            </div>
            <div className="block w-full md:hidden">
              <TransactionChartMobile graphData={graphData} />
            </div>
          </div>
        ) : null
        // <div className="rounded-2xl bg-white p-4 sm:p-6 md:p-8">
        //   <div className="flex w-full items-center justify-between gap-5">
        //     <div className="flex flex-col gap-1">
        //       <p className="text-xl font-bold text-black-shade-3">
        //         Data unavailable
        //       </p>
        //       <p className="text-xs font-medium text-gray-shade-1">
        //         Try again to get graph data
        //       </p>
        //     </div>
        //   </div>
        // </div>
      }
      {dashboardData?.transactions_list && (
        <>
          <div className="hidden lg:block">
            <TransactionTable
              dashboardData={dashboardData}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              page={page}
            />
          </div>
          <div className="block lg:hidden">
            <TransactionTableMobile
              dashboardData={dashboardData}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              page={page}
            />
          </div>
        </>
      )}
      <div>
        {loading && (
          <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center backdrop-blur-[4px] backdrop-filter">
            <CgSpinner className="mx-auto mt-20 size-14 animate-spin text-blue-shade-1" />
          </div>
        )}
        {dashboardData &&
          !dashboardData?.transactions_list &&
          !dashboardData?.return_stats_arrays && (
            <div className="w-full rounded-b-2xl bg-white px-6">
              <h1 className="py-10 text-center text-sm font-medium text-blue-shade-1">
                No data found
              </h1>
            </div>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
