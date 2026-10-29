import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import ModalContainer from "../shared/modal-container";
import { GetRewardListResponse } from "@/lib/auth/get-rewards-list";
import { RewardListTableMobile } from "./reward-list-table-mobile";
import { RewardListTable } from "./reward-list-table";

interface Props {
  open: boolean;
  onClose: () => void;
  reward_list_data: GetRewardListResponse;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  page: number;
}

export const RewardListlModal: React.FC<Props> = ({
  open,
  onClose,
  reward_list_data,
  handleNextPage,
  handlePrevPage,
  page,
}) => {
  return (
    <ModalContainer
      modalId="withdrawal-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-2xl sm:max-w-[800px] max-w-[343px]"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={true}
    >
      <div className="flex w-full flex-col gap-8">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-blue-shade-1 font-bai-jamjuree text-xl font-semibold">
              Rewards List
            </h3>
            <span className="flex h-[22px] w-[30px] items-center justify-center rounded-2xl border border-green-shade-1 bg-green-shade-2 px-2 text-xs font-medium leading-[18px] text-green-shade-3">
              {reward_list_data?.RevenuesHistory &&
                reward_list_data?.RevenuesHistory?.length}
            </span>
          </div>

          <span onClick={onClose}>
            <IoClose className="size-4 cursor-pointer stroke-2" />
          </span>
        </div>
        {reward_list_data?.RevenuesHistory && (
          <>
            <div className="hidden lg:block">
              <RewardListTable
                rewardListData={reward_list_data}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                page={page}
              />
            </div>
            <div className="block lg:hidden">
              <RewardListTableMobile
                rewardListData={reward_list_data}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                page={page}
              />
            </div>
          </>
        )}
      </div>
    </ModalContainer>
  );
};
