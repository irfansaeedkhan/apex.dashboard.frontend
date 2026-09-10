import React, { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import { GetRewardListResponse } from "@/lib/auth/get-rewards-list";

interface Props {
  rewardListData: GetRewardListResponse;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
}

export const RewardListTableMobile: React.FC<Props> = ({
  rewardListData,
  handleNextPage,
  handlePrevPage,
  page,
}) => {
  return (
    <div className="flex h-[80dvh] w-full flex-col overflow-y-auto rounded-xl bg-white">
      {rewardListData && rewardListData?.RevenuesHistory.length > 0 ? (
        rewardListData?.RevenuesHistory.map((item, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 border-b border-black-shade-1/[0.12] bg-white p-6 last:rounded-b-xl last:border-none"
          >
            <div className={mainDiv}>
              <h6 className={h6}>Date</h6>
              <p className={p}>
                {item?.Date ? dayjs(item?.Date).format("DD MMM YYYY") : "N/A"}
              </p>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>Amount</h6>
              <p className={`${p} justify-end text-right`}>
                <Image
                  src={"/images/USDT.png"}
                  alt="usdt"
                  width={18}
                  height={18}
                  className="h-[18px] w-auto shrink-0"
                />
                <span className="whitespace-nowrap">
                  {typeof item?.Amount === "number"
                    ? item.Amount.toFixed(2)
                    : (item?.Amount ?? "N/A")}{" "}
                  USDT
                </span>
              </p>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>Type</h6>
              <p className={p}> {item?.Type ?? "N/A"}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full p-20 text-center font-bai-jamjuree font-medium">
          No record found
        </div>
      )}

      {rewardListData && rewardListData?.Number_of_Pages > 0 && (
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
              !rewardListData?.Number_of_Pages ||
              page >= rewardListData.Number_of_Pages
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
