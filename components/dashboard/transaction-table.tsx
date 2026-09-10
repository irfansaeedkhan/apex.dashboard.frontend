import React from "react";
import dayjs from "dayjs";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import Image from "next/image";
import { DashboardApiResponse } from "@/lib/auth";
import { sliceAccountAddress } from "@/utils/slice-account-address";
import { Button, TableCell, TableRow } from "../shared";

interface Props {
  dashboardData: DashboardApiResponse;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
}
export const TransactionTable: React.FC<Props> = ({
  dashboardData,
  handleNextPage,
  handlePrevPage,
  page,
}) => {
  return (
    <div className="flex w-full flex-col rounded-2xl border border-gray-shade-4 bg-white shadow-3">
      <div className="flex items-center gap-4 px-6 py-5">
        <span className="text-blue-shade-1 text-lg font-medium leading-7">
          Transactions
        </span>
        <span className="flex h-[22px] w-[30px] items-center justify-center rounded-2xl border border-green-shade-1 bg-green-shade-2 px-2 text-xs font-medium leading-[18px] text-green-shade-3">
          {dashboardData?.transactions_list &&
            dashboardData?.transactions_list?.length}
          {!dashboardData?.transactions_list?.length && "N/A"}
        </span>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto rounded-lg">
          <thead>
            <TableRow
              element="th"
              className="text-blue-shade-1 !h-11 w-full bg-white-shade-1 px-6 py-3 text-xs font-medium opacity-60"
            >
              <TableCell element={"th"}>Type</TableCell>
              <TableCell element={"th"}>Date</TableCell>
              <TableCell element={"th"}>Amount</TableCell>
              <TableCell element={"th"}>Transaction</TableCell>
              <TableCell element={"th"}>Hash</TableCell>
              <TableCell element={"th"}>Status</TableCell>
            </TableRow>
          </thead>
          {dashboardData?.transactions_list &&
            dashboardData?.transactions_list?.length > 0 && (
              <tbody>
                {dashboardData?.transactions_list.map((item, i) => {
                  return (
                    <TableRow
                      element="tb"
                      key={i}
                      className="text-blue-shade-1 h-[72px] w-full overflow-x-auto bg-white px-6 py-4 text-sm last:rounded-b-2xl"
                    >
                      <TableCell
                        element={"td"}
                        className="opacity-60 last:rounded-br-2xl"
                      >
                        {item?.Type ?? "N/A"}
                      </TableCell>
                      <TableCell
                        element={"td"}
                        className="opacity-60 first:rounded-bl-2xl"
                      >
                        {item?.Transaction_Date
                          ? dayjs(item?.Transaction_Date).format("DD MMM YYYY")
                          : "N/A"}
                      </TableCell>
                      <TableCell
                        element={"td"}
                        className="flex h-[72px] items-center gap-1"
                      >
                        <Image
                          src={"/images/USDT.png"}
                          alt="usdt"
                          width={100}
                          height={18}
                          className="size-[18px]"
                        />
                        <span className="opacity-60">
                          {item?.Amount ?? "N/A"} USDT
                        </span>
                      </TableCell>
                      <TableCell
                        element={"td"}
                        className="opacity-60 last:rounded-br-2xl"
                      >
                        <span>
                          {item?.Type === "Deposit" ? "From:" : "To:"}
                        </span>
                        <br />
                        <span>{item?.Transaction ?? "N/A"}</span>
                      </TableCell>
                      <TableCell element={"td"} className="opacity-60">
                        {item?.TxHash
                          ? sliceAccountAddress(item?.TxHash)
                          : "N/A"}
                      </TableCell>
                      <TableCell
                        element={"td"}
                        className="opacity-60 last:rounded-br-2xl"
                      >
                        {item?.Status === "Approved" && (
                          <Button title="Approved" variant="approved" />
                        )}
                        {item?.Status === "Pending" && (
                          <Button title="Pending" variant="pending" />
                        )}

                        {!item?.Status && "N/A"}
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
                        disabled={page === dashboardData?.Number_of_Pages}
                        className="text-blue-shade-1 flex w-full items-center justify-center gap-2 rounded-lg  border-[1px] border-[#1414141F] bg-white px-4 py-2 text-sm disabled:opacity-50"
                      >
                        Next <HiMiniArrowRight />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
        </table>
        {dashboardData?.transactions_list?.length === 0 && (
          <div className="w-full p-20 text-center font-bai-jamjuree font-medium">
            There is No record for now
          </div>
        )}
      </div>
    </div>
  );
};
