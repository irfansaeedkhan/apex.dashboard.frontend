import { AppError } from "@/utils/app-error";
import { axiosAPI } from "@/utils/axios";
import { AxiosRequestConfig } from "axios";

export const getAffiliates = async (offset: number = 0) => {
  try {
    const limit = 5;
    const payload = {
      limit,
      offset,
    };

    // Create a merged configuration object
    const config: AxiosRequestConfig<any> = {
      params: payload,
    };

    const res = await axiosAPI.get("/user/referrals", config);
    return res.data;
  } catch (error: any) {
    const errorMessage = "Failed to get affiliate details";
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, "affiliate");
    } else {
      throw new AppError(
        error,
        error.response?.data?.error ?? errorMessage,
        "affiliate",
      );
    }
  }
};

export interface AffiliatesListType {
  offset: number;
  limit: number;
  total: number;
  users: AffiliatesType[];
}

export type AffiliatesType = {
  name: string;
  surName: string;
  email: string;
  MetaAsset_Purchased?: number;
  Royalty?: number;
  // ImageProfileUrl: string;
};
