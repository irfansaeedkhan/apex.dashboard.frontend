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
import { getDashboard } from "@/lib/auth/get-dashboard";
import { useAuthStore } from "@/stores/auth.store";
import { CgSpinner } from "react-icons/cg";
import { TransactionChartMobile } from "@/components/dashboard/transaction-chart-mobile";
import {
  GetShowOrdersDetailsResponse,
  getShowOrdersDetails,
} from "@/lib/auth/get-show-order-details";

import { TransactionTableMobile } from "@/components/dashboard/transaction-table-mobile";
import Countdown, { CountdownRendererFn } from "react-countdown";
import { CupIcon, TimerIcon } from "@/assets/svgs";
import {
  GetRewardListResponse,
  getShowRewardListDetails,
} from "@/lib/auth/get-rewards-list";
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
  const [selectedYear, setSelectedYear] = useState<string>("2024");
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
      // const res = await getDashboard(page);
      // setDashboardData(res);
      const res = {
        Available_Balance: 0,
        Company_Lands_Value: 136000,
        Contract_Expiry_Date: "Thu, 30 May 2024 17:49:18 GMT",
        Contract_Start_Date: "Thu, 30 May 2024 17:49:18 GMT",
        Equity_Percentage: 0,
        Lands_Value: 0,
        Minted_Lands: 136,
        Number_of_Pages: 0,
        Onwhitdraw_balance: 0,
        Owned_Lands: 0,
        Page_size: 5,
        ROI_Last_Month: 0,
        ROI_Until_Now: 0,
        Supply_Max: 12000,
        Wallet_Address: "0x381E97Fb7531BF0E1795B02fa9Db203940B78D10",
        return_stats_arrays: [
          {
            percentages: [
              {
                January: 2.6,
              },
              {
                February: 2.1,
              },
              {
                March: 2.7,
              },
              {
                April: 3.4,
              },
              {
                May: 4.2,
              },
              {
                June: 1.9,
              },
              {
                July: 3.1,
              },
              {
                August: 2.3,
              },
              {
                September: 2.7,
              },
              {
                October: 3.1,
              },
              {
                November: 2.8,
              },
              {
                December: 3.2,
              },
            ],
            year: "2023",
          },
          {
            percentages: [
              {
                January: 2.1,
              },
              {
                February: 2.5,
              },
              {
                March: 2.7,
              },
              {
                April: 3.4,
              },
              {
                May: 2.2,
              },
              {
                May: 0,
              },
            ],
            year: "2024",
          },
        ],
        transactions_list: [
          {
            Amount: Math.random() * 1000,
            Status: "Pending",
            Transaction_Date: new Date().toISOString().slice(0, 10),
            Transaction: "Transaction 1-1",
            TxHash: "TxHash-1-1",
            Type: ["Deposit", "Withdrawal"][Math.floor(Math.random() * 2)],
          },

          {
            Amount: Math.random() * 1000,
            Status: "Pending",
            Transaction_Date: new Date().toISOString().slice(0, 10),
            Transaction: "Transaction 2-1",
            TxHash: "TxHash-2-1",
            Type: ["Deposit", "Withdrawal"][Math.floor(Math.random() * 2)],
          },

          // Transaction 3 objects
          {
            Amount: Math.random() * 1000,
            Status: "Approved",
            Transaction_Date: new Date().toISOString().slice(0, 10),
            Transaction: "Transaction 3-1",
            TxHash: "TxHash-3-1",
            Type: ["Deposit", "Withdrawal"][Math.floor(Math.random() * 2)],
          },
        ],
      };

      setTotalPages(res?.Number_of_Pages);
      const years = res.return_stats_arrays?.map((item) => item.year);
      if (years) {
        const uniqueYears = Array.from(new Set(years));
        const dropdownOptions = uniqueYears.map((year) => ({
          value: year,
          label: year,
        }));
        setDataYears(dropdownOptions);
        const graphData = res.return_stats_arrays?.find(
          (item) => item.year === "2024",
        );
        setGraphData(graphData?.percentages || []);
      } else {
        setDataYears([{ value: "2024", label: "2024" }]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrdersDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getShowOrdersDetails();
      // setGetOrdersDetailsData(res);
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
      const res = await getShowRewardListDetails(rewardListpage);
      // setRewardList(res);
      setRewardList({
        Number_of_Pages: 0,
        Page_size: 5,
        RevenuesHistory: [
          {
            Amount: Math.random() * 1000,
            Date: new Date().toISOString().slice(0, 10),
            Type: "Sale",
          },
          {
            Amount: Math.random() * 1000,
            Date: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000)
              .toISOString()
              .slice(0, 10),
            Type: "Sale",
          },
          {
            Amount: Math.random() * 1000,
            Date: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)
              .toISOString()
              .slice(0, 10),
            Type: "Sale",
          },
          {
            Amount: Math.random() * 1000,
            Date: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
              .toISOString()
              .slice(0, 10),
            Type: "Sale",
          },
        ],
      });
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

    setDashboardData(getMockResponse("Dashboard") as DashboardApiResponse);
    setRewardList(
      getMockResponse("RevenuesHistory") as GetRewardListResponse,
    );
    setGetOrdersDetailsData({
      SinglePackCost: 1000,
      SinglePackDuration: 36,
      StartDate: "2024-07-03",
    });
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
