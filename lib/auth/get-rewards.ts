import { AppError } from "@/utils/app-error";
import { axiosAPI } from "@/utils/axios";

export const getRewardsDetails =
  async (): Promise<RewardsDetailsResp | null> => {
    try {
      const res = await axiosAPI.get("/user/referrals/count");
      const response_date = {
        RefferalRewardsStats: {
          Meta_Assets: 17,
          Referrals: res.data,
          Reward_Percentage: 4.8,
          Sales_Commission: 1260,
          Tot_Asset_Value: 18400,
        },
      };
      return response_date;
    } catch (error: any) {
      const errorMessage = "Failed to get reward details";
      if (error.response?.status === 500) {
        throw new AppError(error, errorMessage, "getRewardsDetails");
      } else {
        throw new AppError(
          error,
          error.response?.data?.error ?? errorMessage,
          "getRewardsDetails",
        );
      }
    }
  };

export type RewardsDetailsResp = {
  RefferalRewardsStats: RefferalRewardsStats;
};

export type RefferalRewardsStats = {
  Meta_Assets: number;
  Referrals: number;
  Reward_Percentage: number;
  Sales_Commission: number;
  Tot_Asset_Value: number;
};
