import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import { CgSpinner } from "react-icons/cg";
import { InvoicesListResponse, getInvoicesList } from "@/lib/auth/get-invoices";
import { DownloadIcon } from "@/assets/svgs";
import { YearDropdown } from "./year-drop-down";
import generateInvoicePDF from "../profile/generate-invoice-pdf";

const dataYears = [
  { value: "all", label: "all" },
  { value: "2023", label: "2023" },
  { value: "jan_2024", label: "Jan 2024" },
  { value: "feb_2024", label: "Feb 2024" },
  { value: "mar_2024", label: "Mar 2024" },
  { value: "apr_2024", label: "Apr 2024" },
];

export const InvoiceTableMobile: React.FC = () => {
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
    <div className="flex w-full flex-col rounded-xl bg-white md:hidden">
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
          selectedValue={selectedYear}
          options={dataYears}
          placeholder="Year"
          onSelect={(year) => handleYearChange(year)}
        />
      </div>
      {filteredTransactions && filteredTransactions.length > 0 ? (
        filteredTransactions.map((invoice, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 border-b border-black-shade-1/[0.12] bg-white p-6 last:rounded-b-xl last:border-none"
          >
            <div className={mainDiv}>
              <h6 className={h6}>Duration</h6>
              <p className={p}> {invoice?.Duration ?? "N/A"} months</p>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>Qty </h6>
              <p className={p}> {invoice?.Qty ?? "N/A"}</p>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>SinglePackCost </h6>
              <p className={p}>
                <Image
                  src={"/images/USDT.png"}
                  alt="usdt"
                  width={100}
                  height={18}
                  className="size-[18px]"
                />
                {invoice?.SinglePackCost ?? "N/A"} USDT
              </p>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>Date</h6>
              <p className={p}>
                {invoice?.Date
                  ? dayjs(invoice?.Date).format("DD MMM YYYY")
                  : "N/A"}
              </p>
            </div>
            <div className={mainDiv}>
              <h6 className={h6}>TotalAmount </h6>
              <p className={p}>
                <Image
                  src={"/images/USDT.png"}
                  alt="usdt"
                  width={100}
                  height={18}
                  className="size-[18px]"
                />
                {invoice?.TotalAmount ?? "N/A"} USDT
              </p>
            </div>

            <div className={mainDiv}>
              <h6 className={h6}>Download Invoice</h6>
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
            </div>
          </div>
        ))
      ) : (
        <div className="w-full p-20 text-center font-bai-jamjuree font-medium">
          No record found
        </div>
      )}

      {invoicesData && invoicesData?.Number_of_Pages > 0 && (
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
            disabled={page === invoicesData?.Number_of_Pages}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-white px-4 py-2 text-sm text-blue-shade-1 disabled:opacity-50"
          >
            Next <HiMiniArrowRight />
          </button>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center backdrop-blur-[4px] backdrop-filter">
          <CgSpinner className="mx-auto mt-20 size-14 animate-spin text-blue-shade-1" />
        </div>
      )}
    </div>
  );
};

const mainDiv = "flex w-full items-center justify-between gap-5";
const h6 = "text-sm font-medium text-blue-shade-1 opacity-60 leading-[18px]";
const p =
  "text-sm font-medium text-blue-shade-1 leading-5 flex items-center gap-1";
