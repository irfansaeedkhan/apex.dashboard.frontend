import { AppError } from "@/utils/app-error";
import { axiosAPI } from "@/utils/axios";

export const getInvoicesList = async (page: number = 1) => {
  try {
    const payload = {
      Page: page,
    };
    const res = await axiosAPI.post("/Invoices", payload);
    return res.data;
  } catch (error: any) {
    const errorMessage = "Failed to get Invoices details";
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, "Invoices");
    } else {
      throw new AppError(
        error,
        error.response?.data?.error ?? errorMessage,
        "Invoices",
      );
    }
  }
};

export interface InvoicesListResponse {
  Invoices: InvoicesType[];
  Number_of_Pages: number;
}

export type InvoicesType = {
  Amount: number;
  Date: string;
  Duration: number;
  Qty: number;
  SinglePackCost: number;
  TotalAmount: number;
};
