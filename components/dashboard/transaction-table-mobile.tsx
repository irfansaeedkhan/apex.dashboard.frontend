import React, { useState } from "react";
import { DashboardApiResponse } from "@/lib/auth";
import { YearDropdown } from "./year-drop-down";
import Image from "next/image";
import dayjs from "dayjs";
import { sliceAccountAddress } from "@/utils/slice-account-address";
import { Button } from "../shared";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";

const optionsData = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "withdraw",
    label: "Withdraw",
  },
  {
    value: "deposit",
    label: "Deposit",
  },
];

interface Props {
  dashboardData: DashboardApiResponse;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
}

export const TransactionTableMobile: React.FC<Props> = ({
  dashboardData,
  handleNextPage,
  handlePrevPage,
  page,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("all");

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const filteredTransactions =
    dashboardData.transactions_list &&
    dashboardData?.transactions_list.filter((transaction) => {
      if (selectedValue === "all") return true;
      return transaction.Type.toLowerCase() === selectedValue;
    });

  return (
    <div className="flex w-full flex-col rounded-xl bg-white">
      <div className="flex h-16 items-center justify-between gap-5 rounded-t-xl border-b border-black-shade-1/[0.12] bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium leading-7 text-blue-shade-1">
            Transactions
          </span>
          <span className="flex h-[22px] w-[30px] items-center justify-center rounded-2xl border border-green-shade-1 bg-green-shade-2 px-2 text-xs font-medium leading-[18px] text-green-shade-3">
            {filteredTransactions && filteredTransactions.length}
            {!filteredTransactions?.length && "N/A"}
          </span>
        </div>
        <YearDropdown
          selectedValue={selectedValue}
          options={optionsData}
          placeholder="All"
          onSelect={(year) => handleValueChange(year)}
        />
      </div>
      {filteredTransactions && filteredTransactions.length > 0 ? (
        filteredTransactions.map((item, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 border-b border-black-shade-1/[0.12] bg-white p-6 last:rounded-b-xl last:border-none"
          >
            <div className={mainDiv}>
              <h6 className={h6}>Type</h6>
              <p className={p}> {item?.Type ?? "N/A"}</p>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>Date</h6>
              <p className={p}>
                {item?.Transaction_Date
                  ? dayjs(item?.Transaction_Date).format("DD MMM YYYY")
                  : "N/A"}
              </p>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>Amount</h6>
              <p className={`${p} justify-end`}>
                <Image
                  src={"/images/USDT.png"}
                  alt="usdt"
                  width={18}
                  height={18}
                  className="h-[18px] w-auto shrink-0"
                />
                <span className="whitespace-nowrap">
                  {item?.Amount ?? "N/A"} USDT
                </span>
              </p>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>{item?.Type === "Deposit" ? "From" : "To"}</h6>
              <p className={p}>{item?.Transaction ?? "N/A"}</p>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>Hash</h6>
              <p className={p}>
                {item?.TxHash ? sliceAccountAddress(item?.TxHash) : "N/A"}
              </p>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>Status</h6>
              {item?.Status === "Approved" && (
                <Button title="Approved" variant="approved" />
              )}
              {item?.Status === "Pending" && (
                <Button title="Pending" variant="pending" />
              )}
              {item?.Status &&
                item.Status !== "Approved" &&
                item.Status !== "Pending" && (
                  <Button title={item.Status} variant="pending" />
                )}
              {!item?.Status && "N/A"}
            </div>
          </div>
        ))
      ) : (
        <div className="w-full p-20 text-center font-bai-jamjuree font-medium">
          No record found
        </div>
      )}

      {dashboardData?.Number_of_Pages > 0 && (
        <div className="mx-auto flex w-full max-w-[90%] items-center justify-center gap-4 py-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-white px-4 py-2 text-sm text-blue-shade-1 disabled:opacity-50"
          >
            <HiMiniArrowLeft /> Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={
              !dashboardData?.Number_of_Pages ||
              page >= dashboardData.Number_of_Pages
            }
            className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-white px-4 py-2 text-sm text-blue-shade-1 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next <HiMiniArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

const mainDiv = "flex w-full items-center justify-between gap-5";
const h6 = "text-sm font-medium text-blue-shade-1 opacity-60 leading-[18px]";
const p =
  "text-sm font-medium text-blue-shade-1 leading-5 flex items-center gap-1 shrink-0";
