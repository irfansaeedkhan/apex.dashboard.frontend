import {
  AvaialableBalance,
  CompanyMetaAssetIcon,
  CurrentCycleRewardIcon,
  DepositeAddressIcon,
  LandRewardIcon,
  MetaAssetsValue,
} from "@/assets/svgs";
import Image from "next/image";
import React from "react";
import QRCode from "react-qr-code";
import { sliceAccountAddress } from "@/utils/slice-account-address";
import { FiCopy } from "react-icons/fi";
import { copyText } from "@/utils/copy-text";
import { DashboardApiResponse } from "@/lib/auth";
import toast from "react-hot-toast";
import { Button } from "../shared";
import clsx from "clsx";
import dayjs from "dayjs";

interface Props {
  dashboard_data: DashboardApiResponse;
  onOpen: () => void;
  onOpenWithdrawalModal: () => void;
}

const CardsForMobile: React.FC<Props> = ({
  dashboard_data,
  onOpenWithdrawalModal,
  onOpen,
}) => {
  return (
    <div className="flex flex-col gap-4 md:hidden">
      <div className={mainDiv}>
        <div className="flex items-center gap-3">
          <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl border border-gray-shade-1/10">
            <MetaAssetsValue />
          </div>
          <p className="text-base font-bold text-black-shade-3 lg:text-lg xl:text-xl">
            Personal Meta Assets
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="col-span-1 flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-shade-1">Owned Lands</p>
            <p className="text-base font-bold text-black-shade-3">
              {dashboard_data?.Owned_Lands} of {dashboard_data?.Minted_Lands}{" "}
              Minted lands
            </p>
          </div>
          <div className="col-span-1 flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-shade-1">Lands Value</p>

            <p className="flex items-center gap-1 text-base font-bold text-black-shade-3">
              <Image
                src="/images/USDT.png"
                alt="USDT"
                width={20}
                height={20}
                className="flex size-5 flex-shrink-0"
              />
              <span>{dashboard_data?.Lands_Value} USDT</span>
            </p>
          </div>
          <div className="col-span-1 flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-shade-1">
              Equity Percentage
            </p>
            <p className="text-base font-bold text-black-shade-3">
              {dashboard_data?.Equity_Percentage.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
      <div className={mainDiv}>
        <div className="flex items-center gap-3">
          <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl border border-gray-shade-1/10">
            <CompanyMetaAssetIcon />
          </div>
          <p className="text-base font-bold text-black-shade-3 lg:text-lg xl:text-xl">
            Company Meta Assets
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="col-span-1 flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-shade-1">
              Minted Lands
            </p>
            <p className="text-base font-bold text-black-shade-3">
              {dashboard_data?.Minted_Lands}
            </p>
          </div>
          <div className="col-span-1 flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-shade-1">Lands Value</p>

            <p className="flex items-center gap-1 text-base font-bold text-black-shade-3">
              <Image
                src="/images/USDT.png"
                alt="USDT"
                width={20}
                height={20}
                className="flex size-5 flex-shrink-0"
              />
              <span> {dashboard_data?.Company_Lands_Value} USDT</span>
            </p>
          </div>
          <div className="col-span-1 flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-shade-1">Supply Max</p>
            <p className="text-base font-bold text-black-shade-3">
              {dashboard_data?.Supply_Max} Lands
            </p>
          </div>
        </div>
      </div>
      <div className={mainDiv}>
        <div className="flex items-center gap-3">
          <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl border border-gray-shade-1/10">
            <LandRewardIcon />
          </div>
          <p className="text-base font-bold text-black-shade-3 lg:text-lg xl:text-xl">
            Land Rewards
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="col-span-1 flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-shade-1">
              ROI Last Month
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
              {/* <span className="text-blue-shade-4">+3.75%</span> */}
            </p>
          </div>
          <div className="col-span-1 flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-shade-1">
              ROI Until Now
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
              {/* <span className="text-blue-shade-4">+4.5%</span> */}
            </p>
          </div>
          <div className="col-span-1 flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-shade-1">
              Contract Start Date
            </p>
            <p className="text-base font-bold text-black-shade-3">
              {dashboard_data?.Contract_Start_Date
                ? dayjs(dashboard_data?.Contract_Start_Date).format(
                    "DD MMM YYYY",
                  )
                : "N/A"}
            </p>
          </div>

          <div className="col-span-1 flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-shade-1">
              Contract Expiry Date
            </p>
            <p className="text-base font-bold text-black-shade-3">
              {dashboard_data?.Contract_Expiry_Date
                ? dayjs(dashboard_data?.Contract_Expiry_Date).format(
                    "DD MMM YYYY",
                  )
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className={clsx(mainDiv, "h-[174px] justify-between")}>
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
        <Button
          title="Withdraw"
          className="w-full"
          disabled={dashboard_data?.Available_Balance === 0}
          onClick={onOpenWithdrawalModal}
        />
      </div>
    </div>
  );
};

export default CardsForMobile;

const mainDiv = "flex w-full flex-col gap-6 rounded-xl bg-white p-6";
