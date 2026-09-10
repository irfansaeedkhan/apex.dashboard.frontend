"use client";
import React from "react";
import { InvoiceTable } from "@/components/profile";
import { InvoiceTableMobile } from "@/components/dashboard/invoice-table-mobile";

const MyInvoice = () => {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-white px-6 py-5">
      <InvoiceTable />
      <InvoiceTableMobile />
    </div>
  );
};

export default MyInvoice;
