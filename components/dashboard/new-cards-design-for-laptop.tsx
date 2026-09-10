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
}

const NewCardsDesignForLaptop: React.FC<Props> = ({
  dashboard_data,
  onOpenWithdrawalModal,
  onOpen,
}) => {
  return (
    <div className="w-full rounded-[14px] bg-white px-6 py-8">
      <div className="">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl border border-gray-shade-1/10">
                <MetaAssetsValue />
              </div>
              <p className="text-base font-bold text-black-shade-3 lg:text-lg xl:text-xl">
                Meta Assets Details
              </p>
            </div>
            <Button
              title="Buy Meta Assets"
              className="hidden w-full max-w-max lg:block"
              onClick={onOpenWithdrawalModal}
            />
          </div>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-gray-shade-1">
                Owned Lands
              </p>
              <p className="text-base font-bold text-black-shade-3">
                {dashboard_data?.Owned_Lands}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-gray-shade-1">
                Minted lands
              </p>
              <p className="text-base font-bold text-black-shade-3">
                {dashboard_data?.Minted_Lands}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-gray-shade-1">
                Equity Percentage
              </p>
              <p className="text-base font-bold text-black-shade-3">
                {dashboard_data?.Equity_Percentage.toFixed(2)}%
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-gray-shade-1">
                Position opened on
              </p>
              <p className="text-base font-bold text-black-shade-3">
                {dashboard_data?.Contract_Start_Date
                  ? dayjs(dashboard_data?.Contract_Start_Date).format(
                      "DD MMM YYYY",
                    )
                  : "N/A"}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-gray-shade-1">
                Position will close on
              </p>
              <p className="text-base font-bold text-black-shade-3">
                {dashboard_data?.Contract_Expiry_Date
                  ? dayjs(dashboard_data?.Contract_Expiry_Date).format(
                      "DD MMM YYYY",
                    )
                  : "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-gray-shade-1">
                USDT Earned Until Now
              </p>
              <p className="flex items-center gap-1 text-base font-bold text-black-shade-3">
                <Image
                  src="/images/USDT.png"
                  alt="USDT"
                  width={20}
                  height={20}
                  className="flex size-5 flex-shrink-0"
                />
                <span>{dashboard_data?.ROI_Until_Now} USDT</span>
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-gray-shade-1">
                USDT Earned Last Month
              </p>

              <p className="flex items-center gap-1 text-base font-bold text-black-shade-3">
                <Image
                  src="/images/USDT.png"
                  alt="USDT"
                  width={20}
                  height={20}
                  className="flex size-5 flex-shrink-0"
                />
                <span>{dashboard_data?.ROI_Last_Month} USDT</span>
              </p>
            </div>
          </div>
          <Button
            title="Buy Meta Assets"
            className="mt-2 block w-full lg:hidden"
            onClick={onOpenWithdrawalModal}
          />
        </div>
      </div>
    </div>
  );
};

export default NewCardsDesignForLaptop;
