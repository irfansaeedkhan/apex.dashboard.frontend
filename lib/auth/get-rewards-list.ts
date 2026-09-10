import { AppError } from "@/utils/app-error";
import { axiosAPI } from "@/utils/axios";

export const getShowRewardListDetails = async (
  page: number = 1,
): Promise<GetRewardListResponse> => {
  try {
    const payload = {
      Page: page,
    };

    const res = await axiosAPI.post("/RevenuesHistory", payload);
    return res.data;
  } catch (error: any) {
    const errorMessage = "Failed to get reward list details";
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, "getRewardListDetails");
    } else {
      throw new AppError(
        error,
        error.response?.data?.error ?? errorMessage,
        "getRewardListDetails",
      );
    }
  }
};

interface RevenuesHistory {
  Amount: number;
  Date: string;
  Type: string;
}

export type GetRewardListResponse = {
  Number_of_Pages: number;
  Page_size: number;
  RevenuesHistory: RevenuesHistory[];
} | null;
