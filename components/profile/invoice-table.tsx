"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { InvoicesListResponse, getInvoicesList } from "@/lib/auth/get-invoices";
import { TableCell, TableRow } from "../shared";
import { YearDropdown } from "../dashboard/year-drop-down";
import dayjs from "dayjs";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import { DownloadIcon } from "@/assets/svgs";
import Image from "next/image";
import generateInvoicePDF from "./generate-invoice-pdf";

export const InvoiceTable = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [invoicesData, setInvoicesData] = useState<InvoicesListResponse>();

  const getInvoicesDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getInvoicesList(page);
      setInvoicesData(res);
      setTotalPages(res?.Number_of_Pages);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [page]);

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

  const dataYears = [
    { value: "all", label: "all" },
    { value: "2023", label: "2023" },
    { value: "jan_2024", label: "Jan 2024" },
    { value: "feb_2024", label: "Feb 2024" },
    { value: "mar_2024", label: "Mar 2024" },
    { value: "apr_2024", label: "Apr 2024" },
  ];

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    getInvoicesDetails();
  }, [getInvoicesDetails]);

  const filteredTransactions =
    invoicesData?.Invoices &&
    invoicesData?.Invoices.filter((transaction) => {
      if (selectedYear === "all") return true;
      return transaction.Date.toLowerCase() === selectedYear;
    });
  // pdf
  interface RowData {
    Duration: number;
    Qty: number;
    SinglePackCost: number;
    Date: string;
    Amount: number;
  }

  const handleDownloadPDF = (row: RowData) => {
    const rowData = [
      { field: "Duration", value: row.Duration },
      { field: "Qty", value: row.Qty },
      { field: "Single Pack Cost", value: row.SinglePackCost },
      { field: "Date", value: row.Date },
      { field: "Total Amount", value: row.Amount },
    ];

    generateInvoicePDF(rowData);
  };

  return (
    <div className="hidden w-full flex-col md:flex">
      <div className="flex items-center justify-between gap-5 pb-5">
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium leading-7 text-blue-shade-1">
            Invoices
          </span>
          <span className="flex h-[22px] w-[30px] items-center justify-center rounded-2xl border border-green-shade-1 bg-green-shade-2 px-2 text-xs font-medium leading-[18px] text-green-shade-3">
            {filteredTransactions && filteredTransactions?.length}
            {!filteredTransactions?.length && "N/A"}
          </span>
        </div>
        <YearDropdown
          selectedValue={selectedYear}
          options={dataYears}
          placeholder="Year"
          onSelect={(year) => handleYearChange(year)}
        />
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto rounded-lg text-blue-shade-1">
          <thead>
            <TableRow
              element="th"
              className="h-11 w-full bg-white-shade-1 px-6 py-3 text-xs font-medium text-blue-shade-1 opacity-60"
            >
              <TableCell element={"th"} className="!py-0">
                Duration
              </TableCell>
              <TableCell element={"th"} className="!py-0">
                Qty
              </TableCell>
              <TableCell element={"th"} className="!py-0">
                SinglePackCost
              </TableCell>
              <TableCell element={"th"} className="!py-0">
                Date
              </TableCell>
              <TableCell element={"th"} className="!py-0">
                TotalAmount
              </TableCell>
              <TableCell element={"th"} className="!py-0">
                Download Invoice
              </TableCell>
            </TableRow>
          </thead>
          <tbody>
            {filteredTransactions && filteredTransactions?.length > 0 ? (
              filteredTransactions?.map((invoice) => (
                <TableRow
                  element="tb"
                  key={invoice?.Date}
                  className="overflow-x-aut h-[72px] w-full !bg-white px-6 py-4 text-sm text-blue-shade-1 opacity-60 last:rounded-b-2xl"
                >
                  {/* Round 1: Duration was a bare number. The contract
                      runs 2024-05-30 to 2027-05-30, 36 months, so the
                      unit is months. */}
                  <TableCell element={"td"}>
                    {invoice?.Duration} months
                  </TableCell>
                  <TableCell element={"td"}>{invoice?.Qty}</TableCell>
                  <TableCell element={"td"}>
                    <span className="inline-flex items-center gap-1">
                      <Image
                        src={"/images/USDT.png"}
                        alt="usdt"
                        width={18}
                        height={18}
                        className="h-[18px] w-auto shrink-0"
                      />
                      <span>{invoice?.SinglePackCost ?? "N/A"} USDT</span>
                    </span>
                  </TableCell>
                  <TableCell element={"td"}>
                    {invoice?.Date
                      ? dayjs(invoice?.Date).format("DD MMM YYYY")
                      : "N/A"}
                  </TableCell>
                  <TableCell element={"td"}>
                    <span className="inline-flex items-center gap-1">
                      <Image
                        src={"/images/USDT.png"}
                        alt="usdt"
                        width={18}
                        height={18}
                        className="h-[18px] w-auto shrink-0"
                      />
                      <span>{invoice?.Amount ?? "N/A"} USDT</span>
                    </span>
                  </TableCell>
                  <TableCell element={"td"} className="text-center">
                    <button
                      onClick={() =>
                        handleDownloadPDF({
                          Duration: invoice.Duration,
                          Qty: invoice.Qty,
                          SinglePackCost: invoice.SinglePackCost,
                          Date: invoice.Date,
                          Amount: invoice.Amount,
                        })
                      }
                    >
                      <DownloadIcon />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                element="tb"
                className="overflow-x-aut h-[72px] w-full !bg-white px-6 py-4 text-sm text-blue-shade-1 opacity-60 last:rounded-b-2xl"
              >
                <td colSpan={6}>
                  <h3 className="text-center text-2xl text-gray-shade-1">
                    No Invoices Found
                  </h3>
                </td>
              </TableRow>
            )}
            <tr>
              <td colSpan={6}>
                <div className="mx-auto flex w-full max-w-[15rem] items-center justify-center gap-4 py-4">
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
                      !invoicesData?.Number_of_Pages ||
                      page >= invoicesData.Number_of_Pages
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px] border-[#1414141F] bg-white px-4 py-2 text-sm text-blue-shade-1 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next <HiMiniArrowRight />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {loading && (
        <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center backdrop-blur-[4px] backdrop-filter">
          <CgSpinner className="mx-auto mt-20 size-14 animate-spin text-blue-shade-1" />
        </div>
      )}
    </div>
  );
};
