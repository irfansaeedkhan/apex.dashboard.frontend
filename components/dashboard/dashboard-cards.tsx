"use client";
import React, { useState } from "react";
import { DashboardApiResponse } from "@/lib/auth";
import { DepositeAddressModal } from "./deposite-address-modal";
import { WithdrawalModal } from "./withdrawal-modal";
import NewCardsDesignForLaptop from "./new-cards-design-for-laptop";
import AvailableBalanceActionButtons from "./available-balance-action-buttons";
import { RewardListlModal } from "./rewardlist-modal";
import { GetRewardListResponse } from "@/lib/auth/get-rewards-list";
import { BuyMetaAssetModal } from "./buy-metaasset-modal";
import { GetShowOrdersDetailsResponse } from "@/lib/auth/get-show-order-details";

interface Props {
  dashboard_data: DashboardApiResponse;
  reward_list_data: GetRewardListResponse;
  getOrdersDetailsData: GetShowOrdersDetailsResponse;
  getMainCall: () => void;
  handleRewardLlistNextPage: () => void;
  handleRewardlistPrevPage: () => void;
  rewardListpage: number;
}

export const DashboardCards: React.FC<Props> = ({
  dashboard_data,
  getMainCall,
  reward_list_data,
  getOrdersDetailsData,
  handleRewardLlistNextPage,
  handleRewardlistPrevPage,
  rewardListpage,
}) => {
  const [open, setOpen] = useState(false);
  const [openBuyMetaAssetModal, setOpenBuyMetaAssetModal] = useState(false);
  const [openWithdrawalModal, setOpenWithdrawalModal] = useState(false);
  const [onOpenRewardListModal, setOnOpenRewardListModal] = useState(false);

  return (
    <>
      <AvailableBalanceActionButtons
        dashboard_data={dashboard_data}
        onOpenWithdrawalModal={() => setOpenWithdrawalModal(true)}
        onOpenRewardListModal={() => setOnOpenRewardListModal(true)}
        onOpen={() => setOpen(true)}
      />

      <NewCardsDesignForLaptop
        dashboard_data={dashboard_data}
        onOpenWithdrawalModal={() => setOpenBuyMetaAssetModal(true)}
        onOpen={() => setOpen(true)}
      />
      {/* <CardsForMobile
        dashboard_data={dashboard_data}
        onOpenWithdrawalModal={() => setOpenWithdrawalModal(true)}
        onOpen={() => setOpen(true)}
      /> */}
      <DepositeAddressModal
        open={open}
        onClose={() => setOpen(false)}
        wallet_address={dashboard_data?.Wallet_Address}
      />
      <WithdrawalModal
        open={openWithdrawalModal}
        available_balance={dashboard_data?.Available_Balance}
        onClose={() => setOpenWithdrawalModal(false)}
        getMainCall={getMainCall}
      />
      <BuyMetaAssetModal
        open={openBuyMetaAssetModal}
        getOrdersDetailsData={getOrdersDetailsData}
        onClose={() => setOpenBuyMetaAssetModal(false)}
      />
      <RewardListlModal
        open={onOpenRewardListModal}
        reward_list_data={reward_list_data}
        onClose={() => setOnOpenRewardListModal(false)}
        handlePrevPage={handleRewardlistPrevPage}
        handleNextPage={handleRewardLlistNextPage}
        page={rewardListpage}
      />
    </>
  );
};
