import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";
import { WithdrawalIcon } from "@/assets/svgs";
import { withdrawCrypto } from "@/lib/auth/withdraw-crypto";
import { Button } from "../shared";
import { CustomNumberInput } from "../shared/custom-number-input";
import ModalContainer from "../shared/modal-container";
import { GetShowOrdersDetailsResponse } from "@/lib/auth/get-show-order-details";
import { CreateMetaAssetsDashboard } from "./create-meta-assets-dashboard";

interface Props {
  open: boolean;
  onClose: () => void;
  getOrdersDetailsData: GetShowOrdersDetailsResponse;
}

export const BuyMetaAssetModal: React.FC<Props> = ({
  open,
  onClose,
  getOrdersDetailsData,
}) => {
  return (
    <ModalContainer
      modalId="withdrawal-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-2xl sm:max-w-[566px] max-w-[343px]"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex w-full flex-col gap-5">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <WithdrawalIcon />
            <h3 className="text-blue-shade-1 font-bai-jamjuree text-xl font-semibold">
              Buy Meta Assets
            </h3>
          </div>
          <span onClick={onClose}>
            <IoClose className="size-4 cursor-pointer stroke-2" />
          </span>
        </div>
        {getOrdersDetailsData && (
          <CreateMetaAssetsDashboard {...getOrdersDetailsData} />
        )}
      </div>
    </ModalContainer>
  );
};
