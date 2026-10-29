import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import Image from "next/image";
import { DashboardApiResponse } from "@/lib/auth";
import { sliceAccountAddress } from "@/utils/slice-account-address";
import { Button, TableCell, TableRow } from "../shared";
import { GetRewardListResponse } from "@/lib/auth/get-rewards-list";

interface Props {
  rewardListData: GetRewardListResponse;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
}
export const RewardListTable: React.FC<Props> = ({
  rewardListData,
  handleNextPage,
  handlePrevPage,
  page,
}) => {
  return (
    <div className="flex w-full flex-col rounded-2xl border border-gray-shade-4 bg-white shadow-3">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto rounded-lg">
          <thead>
            <TableRow
              element="th"
              className="text-blue-shade-1 !h-11 w-full bg-white-shade-1 px-6 py-3 text-xs font-medium opacity-60"
            >
              <TableCell element={"th"}>Date</TableCell>
              <TableCell element={"th"}>Amount</TableCell>
              <TableCell element={"th"}>Type</TableCell>
            </TableRow>
          </thead>
          {rewardListData?.RevenuesHistory &&
            rewardListData?.RevenuesHistory?.length > 0 && (
              <tbody>
                {rewardListData?.RevenuesHistory.map((item, i) => {
                  return (
                    <TableRow
                      element="tb"
                      key={i}
                      className="text-blue-shade-1 h-[72px] w-full overflow-x-auto bg-white px-6 py-4 text-sm last:rounded-b-2xl"
                    >
                      {/* Round 1: rows used to render Type, Date,
                          Amount under Date, Amount, Type headers.
                          Row order now matches the headers. */}
                      <TableCell
                        element={"td"}
                        className="opacity-60 first:rounded-bl-2xl"
                      >
                        {item?.Date
                          ? dayjs(item?.Date).format("DD MMM YYYY")
                          : "N/A"}
                      </TableCell>
                      <TableCell
                        element={"td"}
                        className="h-[72px]"
                      >
                        <span className="inline-flex h-full items-center gap-1">
                          <Image
                            src={"/images/USDT.png"}
                            alt="usdt"
                            width={18}
                            height={18}
                            className="h-[18px] w-auto shrink-0"
                          />
                          <span className="opacity-60">
                            {typeof item?.Amount === "number"
                              ? item.Amount.toFixed(2)
                              : (item?.Amount ?? "N/A")}{" "}
                            USDT
                          </span>
                        </span>
                      </TableCell>
                      <TableCell
                        element={"td"}
                        className="opacity-60 last:rounded-br-2xl"
                      >
                        {item?.Type ?? "N/A"}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <tr>
                  <td colSpan={6}>
                    <div className="mx-auto flex w-full max-w-[15rem] items-center justify-center gap-4 py-4">
                      <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className="text-blue-shade-1 flex w-full items-center justify-center gap-2 rounded-lg  border-[1px] border-[#1414141F] bg-white px-4 py-2 text-sm disabled:opacity-50"
                      >
                        <HiMiniArrowLeft /> Previous
                      </button>
                      <button
                        onClick={handleNextPage}
                        disabled={
                          !rewardListData?.Number_of_Pages ||
                          page >= rewardListData.Number_of_Pages
                        }
                        className="text-blue-shade-1 flex w-full items-center justify-center gap-2 rounded-lg  border-[1px] border-[#1414141F] bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Next <HiMiniArrowRight />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
        </table>
        {rewardListData?.RevenuesHistory?.length === 0 && (
          <div className="w-full p-20 text-center font-bai-jamjuree font-medium">
            There is No record for now
          </div>
        )}
      </div>
    </div>
  );
};
