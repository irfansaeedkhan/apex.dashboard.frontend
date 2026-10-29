import { AppError } from "@/utils/app-error";
import { axiosAPI } from "@/utils/axios";

export const getRewardsDetails =
  async (): Promise<RewardsDetailsResp | null> => {
    try {
      const res = await axiosAPI.get("/user/referrals/count");
      // Round 1: these used to be hardcoded and disagreed with the
      // referrals table (8 people, packs 2+1+3+2+4+1+2+3 = 18,
      // royalties 184+96+246+132+318+84+156+224 = 1440). They are now
      // the table's own totals: 18 packs x 1000 USDT = 18000 USDT
      // value, 1440 USDT weekly commission, 1440/18000 = 8.0%.
      const response_date = {
        RefferalRewardsStats: {
          Meta_Assets: 18,
          Referrals: res.data,
          Reward_Percentage: 8.0,
          Sales_Commission: 1440,
          Tot_Asset_Value: 18000,
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
