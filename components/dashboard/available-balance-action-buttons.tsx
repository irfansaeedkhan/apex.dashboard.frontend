import React from "react";
import Image from "next/image";
import {
  AvaialableBalance,
  CompanyMetaAssetIcon,
  DepositeAddressIcon,
  LandRewardIcon,
  MetaAssetsValue,
} from "@/assets/svgs";
import QRCode from "react-qr-code";
import { FiCopy } from "react-icons/fi";
import { sliceAccountAddress } from "@/utils/slice-account-address";
import { copyText } from "@/utils/copy-text";
import { DashboardApiResponse } from "@/lib/auth";
import toast from "react-hot-toast";
import { Button } from "../shared";
import dayjs from "dayjs";

interface Props {
  dashboard_data: DashboardApiResponse;
  onOpen: () => void;
  onOpenWithdrawalModal: () => void;
  onOpenRewardListModal: () => void;
}

const AvailableBalanceActionButtons: React.FC<Props> = ({
  dashboard_data,
  onOpenWithdrawalModal,
  onOpenRewardListModal,
  onOpen,
}) => {
  return (
    <div className="w-full rounded-[14px] bg-white p-8">
      <div className="flex flex-col justify-between gap-6 lg:flex-row">
        <div className="flex gap-3">
          <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl border border-gray-shade-1/10">
            <AvaialableBalance />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-shade-1">
              Available Balance
            </p>
            <p className="flex items-center gap-1 text-xl font-bold text-black-shade-3">
              <Image
                src="/images/USDT.png"
                alt="USDT"
                width={20}
                height={20}
                className="flex size-5 flex-shrink-0"
              />
              <span>
                {Math.abs(dashboard_data?.Available_Balance).toFixed(2)} USDT
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 lg:flex-row">
          <Button
            title="Withdraw"
            className="w-full lg:!px-10 lg:!py-3"
            onClick={onOpenWithdrawalModal}
          />
          <Button
            title="Reward List"
            variant="secondary"
            className="w-full lg:!px-10 lg:!py-3"
            onClick={onOpenRewardListModal}
          />
          <Button
            title="Deposit Address"
            variant="underline"
            className="w-full lg:!px-10 lg:!py-3"
            onClick={onOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default AvailableBalanceActionButtons;
