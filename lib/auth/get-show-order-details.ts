import { AppError } from "@/utils/app-error";
import { axiosAPI } from "@/utils/axios";

export const getShowOrdersDetails = async () => {
  try {
    const res = await axiosAPI.get("/showorderinfo");
    return res.data;
  } catch (error: any) {
    const errorMessage = "Failed to get order details";
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, "getShowOrdersDetails");
    } else {
      throw new AppError(
        error,
        error.response?.data?.error ?? errorMessage,
        "getShowOrdersDetails",
      );
    }
  }
};
export type GetShowOrdersDetailsResponse = {
  SinglePackCost: number;
  SinglePackDuration: number;
  StartDate: string;
};
