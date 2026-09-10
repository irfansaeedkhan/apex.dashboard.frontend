"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  AffiliatesListType,
  getAffiliates,
} from "@/lib/auth/get-affiliates-list";
import { ReferralTable } from "@/components/dashboard/affiliates/referral-table";
import { ReferralTableMobile } from "@/components/dashboard/affiliates/referral-table-mobile";
import { RewardsDetailsResp, getRewardsDetails } from "@/lib/auth/get-rewards";
import { RewardsCard } from "@/components/rewards";

const Affiliates = () => {
  const [affiliatesList, setAffiliatesList] = useState<AffiliatesListType>({
    offset: 0,
    limit: 5,
    total: 0,
    users: [],
  });
  const [refferalRewards, setRefferalRewards] =
    useState<RewardsDetailsResp | null>(null);
  const [isLoading, setIsLoading] = useState("idle");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const getReward = useCallback(async () => {
    try {
      const res = await getRewardsDetails();
      if (!res) return;
      setRefferalRewards(res);
      // setRefferalRewards({
      //   RefferalRewardsStats: {
      //     Meta_Assets: 0,
      //     Referrals: 0,
      //     Reward_Percentage: 0,
      //     Sales_Commission: 0,
      //     Tot_Asset_Value: 0,
      //   },
      // });
    } catch (error: any) {
      console.log("error", error);
    }
  }, []);

  const getAffiliatesDetails = useCallback(async () => {
    setIsLoading("pending");
    try {
      const offset = (page - 1) * pageSize;
      const res = await getAffiliates(offset);
      setAffiliatesList((current) => ({
        ...current,
        users: res.data,
        total: res.total,
      }));

      setIsLoading("resolved");
    } catch (error) {
      setIsLoading("rejected");
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    getReward();
  }, [getReward]);

  useEffect(() => {
    getAffiliatesDetails();
  }, [getAffiliatesDetails]);

  const handleNextPage = () => {
    if (page < Math.ceil(affiliatesList.total / affiliatesList.limit)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 lg:grid-cols-1">
        <RewardsCard refferalRewards={refferalRewards} />
      </div>
      <div className="hidden lg:block">
        <ReferralTable
          affiliatesList={affiliatesList as AffiliatesListType}
          isLoading={isLoading}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          page={page}
        />
      </div>
      <div className="block lg:hidden">
        <ReferralTableMobile
          affiliatesList={affiliatesList as AffiliatesListType}
          isLoading={isLoading}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          page={page}
        />
      </div>
    </div>
  );
};

export default Affiliates;
